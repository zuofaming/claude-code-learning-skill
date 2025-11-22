import { Message, FlashbackCard } from "./types";

// Mock past memories for demonstration
const MOCK_MEMORIES: FlashbackCard[] = [
  {
    id: "1",
    content: "今天老板夸我方案做得好",
    timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    tags: ["#Work", "#Praise"],
  },
  {
    id: "2",
    content: "和朋友喝咖啡聊了一下午，感觉很放松",
    timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
    tags: ["#Social", "#Relaxation"],
  },
  {
    id: "3",
    content: "完成了一个困难的项目，团队一起庆祝",
    timestamp: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
    tags: ["#Work", "#Achievement", "#Team"],
  },
  {
    id: "4",
    content: "看到窗外的晚霞，心情突然变得很平静",
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    tags: ["#Nature", "#Peace"],
  },
];

// Simple keyword matching for tags
const TAG_KEYWORDS = {
  "#Work": ["工作", "老板", "项目", "会议", "同事", "团队"],
  "#Praise": ["夸", "表扬", "赞", "认可"],
  "#Social": ["朋友", "聊天", "聚会", "一起"],
  "#Relaxation": ["放松", "休息", "舒服"],
  "#Achievement": ["完成", "成功", "做好", "达成"],
  "#Team": ["团队", "大家", "一起"],
  "#Nature": ["天气", "晚霞", "阳光", "花", "树"],
  "#Peace": ["平静", "安静", "宁静", "平和"],
  "#Family": ["家人", "父母", "孩子"],
  "#Health": ["运动", "健身", "跑步"],
};

// Extract tags from content
function extractTags(content: string): string[] {
  const tags: string[] = [];
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((keyword) => content.includes(keyword))) {
      tags.push(tag);
    }
  }
  return tags;
}

// Analyze sentiment (simplified)
function analyzeSentiment(
  content: string
): "positive" | "neutral" | "negative" {
  const positiveWords = ["开心", "快乐", "高兴", "幸福", "好", "棒", "赞", "喜欢", "爱", "放松", "平静"];
  const negativeWords = ["难过", "伤心", "累", "烦", "困难", "压力"];

  const hasPositive = positiveWords.some((word) => content.includes(word));
  const hasNegative = negativeWords.some((word) => content.includes(word));

  if (hasPositive && !hasNegative) return "positive";
  if (hasNegative && !hasPositive) return "negative";
  return "neutral";
}

// Generate encouraging responses - organized by context
const ENCOURAGING_RESPONSES = {
  work: [
    "在工作中获得认可，真是一份值得庆祝的成就。",
    "你的努力被看见了，这很重要。",
    "工作中的小成就，都是成长的足迹。",
    "记下这份职场中的温暖时刻。",
  ],
  social: [
    "和在乎的人在一起的时光，总是特别珍贵。",
    "这样真诚的连接，是生活中的小确幸。",
    "人与人之间的温暖，值得被珍藏。",
    "感谢你愿意分享这份快乐。",
  ],
  nature: [
    "大自然总有治愈人心的力量。",
    "在繁忙中能留意到这份美好，很难得。",
    "这样的宁静时刻，请好好收藏。",
    "自然的美，让心灵得到片刻安宁。",
  ],
  achievement: [
    "每一个完成的目标，都值得为自己鼓掌。",
    "你做到了，这份成就属于你。",
    "记录下这个里程碑时刻。",
    "为自己感到骄傲吧，你值得。",
  ],
  default: [
    "真棒，这一刻值得被记住。",
    "很高兴听到这个好消息。",
    "这个时刻很珍贵。",
    "记下来了，让这份美好永远留存。",
    "感受到你的喜悦了。",
    "这样的时刻值得珍藏。",
    "为你感到开心。",
    "把这份温暖收藏起来了。",
    "生活中的小确幸，正是这样的瞬间。",
    "谢谢你愿意和我分享这份快乐。",
    "让我把这个美好的时刻好好收藏。",
    "这样的时刻，是生活赠予的礼物。",
  ],
};

// Get contextual response based on tags
function getContextualResponse(tags: string[]): string {
  let responses = ENCOURAGING_RESPONSES.default;

  if (tags.includes("#Work")) {
    responses = ENCOURAGING_RESPONSES.work;
  } else if (tags.includes("#Social")) {
    responses = ENCOURAGING_RESPONSES.social;
  } else if (tags.includes("#Nature") || tags.includes("#Peace")) {
    responses = ENCOURAGING_RESPONSES.nature;
  } else if (tags.includes("#Achievement")) {
    responses = ENCOURAGING_RESPONSES.achievement;
  }

  return responses[Math.floor(Math.random() * responses.length)];
}

// Find related memories based on tag overlap
function findRelatedMemory(
  userTags: string[],
  allUserMessages: Message[]
): FlashbackCard | null {
  // Combine mock memories with user's past positive messages
  const userMemories: FlashbackCard[] = allUserMessages
    .filter((msg) => msg.role === "user" && msg.sentiment === "positive")
    .map((msg) => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.timestamp,
      tags: msg.tags,
    }));

  const allMemories = [...MOCK_MEMORIES, ...userMemories];

  // Find memories with overlapping tags
  const relatedMemories = allMemories.filter((memory) => {
    if (!memory.tags) return false;
    return memory.tags.some((tag) => userTags.includes(tag));
  });

  // Return a random related memory, 40% chance
  if (relatedMemories.length > 0 && Math.random() < 0.4) {
    return relatedMemories[Math.floor(Math.random() * relatedMemories.length)];
  }

  return null;
}

// Format date for display
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays < 30) return `${diffDays}天前`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}个月前`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years}年前`;
}

export interface AIResponse {
  message: string;
  flashback?: FlashbackCard;
  tags: string[];
  sentiment: "positive" | "neutral" | "negative";
}

export function processUserMessage(
  content: string,
  allUserMessages: Message[]
): AIResponse {
  const tags = extractTags(content);
  const sentiment = analyzeSentiment(content);

  // Get a contextual encouraging response based on tags
  const baseResponse = getContextualResponse(tags);

  // Try to find a related memory
  const flashback = findRelatedMemory(tags, allUserMessages);

  let message = baseResponse;
  if (flashback) {
    const timeAgo = formatDate(flashback.timestamp);
    message = `${baseResponse}\n\n这让我想起${timeAgo}你也很开心...`;
  }

  return {
    message,
    flashback: flashback ?? undefined,
    tags,
    sentiment,
  };
}
