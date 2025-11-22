import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/v1/chat/completions";

// System prompt for the AI Gardener
const SYSTEM_PROMPT = `你是"ZenLog"应用中的"AI园丁"，一个温柔、富有同理心的倾听者。

你的角色：
- 帮助用户记录和珍惜生活中的小确幸（小而确定的幸福）
- 给予温暖、简洁的回应，不超过2-3句话
- 根据用户分享的内容类型，给予贴切的鼓励

回应风格：
- 工作相关：认可努力和成就
- 社交相关：珍惜人际连接
- 自然/宁静：强调内心平和
- 成就相关：庆祝里程碑

重要：
1. 回应要简洁、温暖、真诚
2. 不要提问，只需认可和鼓励
3. 使用优雅的中文表达
4. 让用户感受到被倾听和理解`;

export async function POST(request: NextRequest) {
  try {
    const { message, userMessages } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "DeepSeek API key not configured" },
        { status: 500 }
      );
    }

    // Build conversation context (last 5 messages for context)
    const recentMessages = (userMessages || []).slice(-5).map((msg: any) => ({
      role: "user",
      content: msg.content,
    }));

    // Call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...recentMessages,
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("DeepSeek API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get AI response", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "记下来了，这一刻很珍贵。";

    return NextResponse.json({
      message: aiMessage,
      model: "deepseek-chat",
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
