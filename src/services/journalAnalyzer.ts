
import { AnalysisResult } from '@/components/AnalysisResults';

// Mock data for previous journal entries
const mockPreviousEntries = [
  {
    date: '2025-04-04',
    content: `I've been feeling overwhelmed lately with all the work piling up. My goals seem further away than ever. It's frustrating to feel stuck in this cycle of burnout and recovery. I need to find a better balance.`
  },
  {
    date: '2025-04-02',
    content: `Had a good conversation with my mentor today. She reminded me why I started this journey in the first place. My purpose isn't just about achievement, it's about growth and impact. Feeling a bit more hopeful now.`
  },
  {
    date: '2025-03-31',
    content: `Another day of pushing through. The future feels uncertain, but I'm trying to stay focused on what I can control. My goals haven't changed, just the timeline.`
  },
  {
    date: '2025-03-29',
    content: `Feeling burnt out again. The constant pressure is taking a toll. I wonder if I'm on the right path or if I need to reconsider my direction. My motivation is at an all-time low.`
  },
  {
    date: '2025-03-27',
    content: `Had a breakthrough moment today! The project I've been struggling with finally came together. This reminds me why I set these goals in the first place. The journey is tough but worth it.`
  },
  {
    date: '2025-03-25',
    content: `I'm worried about the direction things are heading. The constant stress is affecting my health. Need to remember my purpose and why I started this in the first place.`
  },
  {
    date: '2025-03-23',
    content: `Taking time to reflect on my goals today. Am I still aligned with my original purpose? Some adjustments might be needed, but the core remains the same.`
  }
];

// Mock function to analyze emotions from text
const analyzeEmotions = (text: string): { primary: string, secondary: string, intensities: { [key: string]: number } } => {
  const emotionsMap: { [key: string]: string[] } = {
    joy: ['happy', 'joy', 'delighted', 'excited', 'thrilled', 'content'],
    sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'down', 'blue'],
    anger: ['angry', 'frustrated', 'annoyed', 'irritated', 'mad', 'furious'],
    fear: ['afraid', 'scared', 'fearful', 'terrified', 'anxious', 'worried'],
    surprise: ['surprised', 'shocked', 'astonished', 'amazed', 'startled'],
    disgust: ['disgusted', 'revolted', 'repulsed', 'appalled', 'distaste'],
    hope: ['hope', 'hopeful', 'optimistic', 'expecting', 'looking forward'],
    burnout: ['burnout', 'exhausted', 'drained', 'depleted', 'overwhelmed', 'tired'],
    gratitude: ['grateful', 'thankful', 'appreciative', 'blessed', 'fortunate'],
    confusion: ['confused', 'perplexed', 'puzzled', 'baffled', 'unsure'],
  };

  // Count occurrences of emotion words
  const emotionCounts: { [key: string]: number } = {};
  const lowercaseText = text.toLowerCase();
  
  Object.entries(emotionsMap).forEach(([emotion, words]) => {
    const count = words.reduce((acc, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowercaseText.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);
    
    emotionCounts[emotion] = count;
  });

  // Analyze content for additional context
  const textLength = text.split(' ').length;
  
  // Default emotions if no strong signal
  if (Object.values(emotionCounts).every(count => count === 0)) {
    // Make a guess based on other text patterns
    if (lowercaseText.includes('goal') || lowercaseText.includes('achieve')) {
      emotionCounts.hope = 1;
    }
    if (lowercaseText.includes('stress') || lowercaseText.includes('pressure')) {
      emotionCounts.burnout = 1;
    }
    // Default to neutral if still no signal
    if (Object.values(emotionCounts).every(count => count === 0)) {
      return {
        primary: 'Neutral',
        secondary: 'Reflective',
        intensities: {
          Neutral: 70,
          Reflective: 30,
          Analytical: 20,
          Curious: 15
        }
      };
    }
  }

  // Convert to percentages and sort
  const totalEmotions = Object.values(emotionCounts).reduce((a, b) => a + b, 0) || 1;
  const emotionPercentages: { [key: string]: number } = {};
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    emotionPercentages[emotion] = Math.round((count / totalEmotions) * 100);
  });
  
  // Get top two emotions
  const sortedEmotions = Object.entries(emotionPercentages)
    .sort((a, b) => b[1] - a[1])
    .map(([emotion]) => emotion);
  
  // Create intensity distribution with some randomness for demo
  const intensities: { [key: string]: number } = {};
  const primaryEmotionIntensity = Math.max(60, Math.min(90, emotionPercentages[sortedEmotions[0]] || 70));
  
  intensities[sortedEmotions[0] || 'Neutral'] = primaryEmotionIntensity;
  intensities[sortedEmotions[1] || 'Reflective'] = Math.max(30, Math.min(60, emotionPercentages[sortedEmotions[1]] || 40));
  intensities['Neutral'] = Math.max(10, 100 - primaryEmotionIntensity - (intensities[sortedEmotions[1]] || 40));

  return {
    primary: (sortedEmotions[0] || 'Neutral').charAt(0).toUpperCase() + (sortedEmotions[0] || 'Neutral').slice(1),
    secondary: (sortedEmotions[1] || 'Reflective').charAt(0).toUpperCase() + (sortedEmotions[1] || 'Reflective').slice(1),
    intensities: Object.fromEntries(
      Object.entries(intensities)
        .map(([k, v]) => [k.charAt(0).toUpperCase() + k.slice(1), v])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
    )
  };
};

// Mock function to extract keywords from text
const extractKeywords = (text: string): string[] => {
  const importantThemes = [
    'goal', 'purpose', 'burnout', 'motivation', 'change', 'emotion',
    'future', 'success', 'failure', 'growth', 'progress', 'challenge',
    'balance', 'health', 'work', 'relationship', 'opportunity', 'obstacle',
    'dream', 'aspiration', 'struggle', 'achievement', 'reflection', 'direction'
  ];
  
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  
  // Find matches with important themes
  const matches = importantThemes.filter(theme => 
    words.some(word => word === theme || word === theme + 's')
  );
  
  // Add some additional themes based on content
  const additionalThemes: string[] = [];
  if (text.toLowerCase().includes('tired') || text.toLowerCase().includes('exhausted')) {
    additionalThemes.push('Fatigue');
  }
  if (text.toLowerCase().includes('hope') || text.toLowerCase().includes('optimistic')) {
    additionalThemes.push('Optimism');
  }
  if (text.toLowerCase().includes('stress') || text.toLowerCase().includes('pressure')) {
    additionalThemes.push('Stress');
  }
  if (text.toLowerCase().includes('future') || text.toLowerCase().includes('plan')) {
    additionalThemes.push('Planning');
  }
  
  // Combine, deduplicate and sort by relevance (mocked)
  const allThemes = [...matches.map(m => m.charAt(0).toUpperCase() + m.slice(1)), ...additionalThemes];
  const uniqueThemes = [...new Set(allThemes)];
  
  // Return 3-7 keywords
  return uniqueThemes.slice(0, Math.min(uniqueThemes.length, Math.max(3, Math.min(7, Math.floor(text.length / 100)))));
};

// Mock function to analyze trends across entries
const analyzeTrends = (currentText: string, previousEntries: typeof mockPreviousEntries): { 
  type: string;
  description: string;
  frequency?: number;
  daysAgo?: number;
}[] => {
  const trends: { 
    type: string;
    description: string;
    frequency?: number;
    daysAgo?: number;
  }[] = [];
  
  // All entries including current
  const allEntries = [
    { date: new Date().toISOString().split('T')[0], content: currentText },
    ...previousEntries
  ];
  
  // Track term frequencies
  const termFrequency: { [key: string]: number } = {};
  const importantTerms = ['burnout', 'goal', 'future', 'lost', 'purpose', 'motivation', 'change'];
  
  importantTerms.forEach(term => {
    let count = 0;
    allEntries.forEach(entry => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const matches = entry.content.match(regex);
      if (matches) count += matches.length;
    });
    termFrequency[term] = count;
  });
  
  // Find days since last mention of goals
  const goalMentionDates = allEntries
    .filter(entry => /\b(goal|goals|purpose|direction)\b/gi.test(entry.content))
    .map(entry => new Date(entry.date));
  
  if (goalMentionDates.length > 0) {
    const latestMention = new Date(Math.max(...goalMentionDates.map(d => d.getTime())));
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - latestMention.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 3) {
      trends.push({
        type: 'goal-tracking',
        description: `Last mentioned goals or purpose ${diffDays} days ago`,
        daysAgo: diffDays
      });
    }
  }
  
  // Add frequency trends
  Object.entries(termFrequency)
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([term, count]) => {
      trends.push({
        type: 'frequency',
        description: `${term.charAt(0).toUpperCase() + term.slice(1)} appears frequently in your entries`,
        frequency: count
      });
    });
  
  // Add emotional progression trend
  const emotionProgression: string[] = [];
  allEntries.slice(0, 5).forEach(entry => {
    const emotions = analyzeEmotions(entry.content);
    emotionProgression.push(emotions.primary.toLowerCase());
  });
  
  // Check for burnout patterns
  if (emotionProgression.filter(e => e.toLowerCase() === 'burnout').length >= 2) {
    trends.push({
      type: 'pattern',
      description: 'Burnout appears repeatedly in your recent entries'
    });
  }
  
  // Check for emotional shifts
  const recentEmotions = emotionProgression.slice(0, 3);
  if (
    recentEmotions.length >= 2 && 
    recentEmotions[0] !== recentEmotions[1] &&
    (recentEmotions[0] === 'joy' || recentEmotions[0] === 'hope' || recentEmotions[1] === 'joy' || recentEmotions[1] === 'hope')
  ) {
    trends.push({
      type: 'shift',
      description: 'Your emotional tone is showing positive movement recently'
    });
  }
  
  // Return 2-4 most relevant trends
  return trends.slice(0, Math.min(4, trends.length));
};

// Mock function to generate insights
const generateInsights = (text: string, emotions: ReturnType<typeof analyzeEmotions>, keywords: string[], previousEntries: typeof mockPreviousEntries): string[] => {
  const insights: string[] = [];
  
  // Based on emotional state
  if (emotions.primary.toLowerCase() === 'burnout') {
    insights.push('Your entries suggest persistent feelings of burnout. Consider prioritizing rest and rejuvenation.');
  }
  
  if (emotions.primary.toLowerCase() === 'hope' || emotions.secondary.toLowerCase() === 'hope') {
    insights.push('The hopeful tone in your writing suggests you're finding new possibilities even amid challenges.');
  }
  
  // Based on keyword patterns
  if (keywords.some(k => k.toLowerCase() === 'change' || k.toLowerCase() === 'direction')) {
    insights.push('You're contemplating change or new directions. This period of reflection can lead to meaningful growth.');
  }
  
  if (keywords.some(k => k.toLowerCase() === 'goal' || k.toLowerCase() === 'purpose')) {
    insights.push('Reconnecting with your core purpose might help provide clarity during this period.');
  }
  
  // Look for linguistic patterns
  const becomingVsBeing = (text.match(/\bbecom(e|ing)\b/gi) || []).length > (text.match(/\bbeing\b/gi) || []).length;
  if (becomingVsBeing) {
    insights.push('You write more about becoming than being. Consider reflecting on appreciating where you are today.');
  }
  
  const pastVsFuture = (text.match(/\bwas\b|\bwere\b|\bhad\b/gi) || []).length > (text.match(/\bwill\b|\bgoing to\b/gi) || []).length;
  if (pastVsFuture) {
    insights.push('Your writing focuses more on the past than the future. What small step could you take forward today?');
  }
  
  // Based on question patterns
  const questionCount = (text.match(/\?/g) || []).length;
  if (questionCount > 2) {
    insights.push('Your entry contains several questions, suggesting a period of deep reflection and seeking clarity.');
  }
  
  // Check for repetitive patterns across entries
  const allContent = previousEntries.map(e => e.content).join(' ') + ' ' + text;
  const repetitiveLanguage = /\b(\w+)\b.*\b\1\b.*\b\1\b/gi.test(allContent);
  if (repetitiveLanguage) {
    insights.push('Notice any recurring thoughts or phrases in your writing. These patterns may reveal underlying themes to explore.');
  }
  
  // Generate random insights for variety
  const randomInsights = [
    'Consider how your current challenges are shaping your growth journey.',
    'What small daily practice might help you reconnect with your purpose?',
    'Your writing reveals thoughtfulness and self-awareness.',
    'The themes in your journal suggest you're navigating a significant transition period.',
    'How might you reframe challenges as opportunities for learning?',
    'Your reflective practice is building valuable self-knowledge.',
    'Notice how your energy shifts when writing about different aspects of your life.'
  ];
  
  // Add 1-2 random insights if we don't have enough
  while (insights.length < 3) {
    const randomInsight = randomInsights[Math.floor(Math.random() * randomInsights.length)];
    if (!insights.includes(randomInsight)) {
      insights.push(randomInsight);
    }
  }
  
  // Return 3-5 insights
  return insights.slice(0, Math.min(5, insights.length));
};

// Main analysis function
export const analyzeJournalEntry = (content: string): AnalysisResult => {
  // Simulate processing delay
  console.log('Analyzing journal entry...');
  
  // Run analysis
  const emotions = analyzeEmotions(content);
  const keywords = extractKeywords(content);
  const trends = analyzeTrends(content, mockPreviousEntries);
  const insights = generateInsights(content, emotions, keywords, mockPreviousEntries);
  
  return {
    emotions,
    keywords,
    trends,
    insights
  };
};
