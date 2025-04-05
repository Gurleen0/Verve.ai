
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, ArrowUpRight, ListChecks, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface AnalysisResult {
  emotions: {
    primary: string;
    secondary: string;
    intensities: {
      [key: string]: number;
    };
  };
  keywords: string[];
  trends: {
    type: string;
    description: string;
    frequency?: number;
    daysAgo?: number;
  }[];
  insights: string[];
}

interface AnalysisResultsProps {
  results: AnalysisResult;
  className?: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, className }) => {
  // Helper function to get color based on emotion
  const getEmotionColor = (emotion: string) => {
    const emotionMap: { [key: string]: string } = {
      joy: 'bg-green-500',
      happiness: 'bg-green-500',
      contentment: 'bg-green-400',
      hope: 'bg-blue-400',
      optimism: 'bg-blue-500',
      excitement: 'bg-amber-500',
      sadness: 'bg-blue-600',
      anxiety: 'bg-amber-600',
      fear: 'bg-red-400',
      anger: 'bg-red-500',
      frustration: 'bg-red-600',
      burnout: 'bg-orange-600',
      neutral: 'bg-gray-500',
      surprise: 'bg-purple-500',
      confusion: 'bg-purple-600',
      gratitude: 'bg-teal-500',
      love: 'bg-pink-500',
    };
    
    return emotionMap[emotion.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <Card className={cn("w-full animate-fade-in", className)}>
      <CardHeader className="bg-gradient-to-r from-verve-teal/10 to-verve-lavender/10 rounded-t-lg">
        <div className="flex items-center">
          <Brain className="h-6 w-6 mr-2 text-verve-teal" />
          <CardTitle>Journal Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-6">
        {/* Emotions Section */}
        <section>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-verve-lavender" />
            Emotional Tone
          </h3>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Primary:</span>
                <Badge className={`ml-2 ${getEmotionColor(results.emotions.primary)}`}>
                  {results.emotions.primary}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Secondary:</span>
                <Badge className={`ml-2 ${getEmotionColor(results.emotions.secondary)}`}>
                  {results.emotions.secondary}
                </Badge>
              </div>
            </div>
            
            <div className="grid gap-2">
              {Object.entries(results.emotions.intensities).map(([emotion, intensity]) => (
                <div key={emotion} className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                  <span className="text-sm">{emotion}</span>
                  <Progress value={intensity} className="h-2" />
                  <span className="text-sm text-right">{intensity}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <Separator />
        
        {/* Keywords Section */}
        <section>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <ListChecks className="h-5 w-5 mr-2 text-verve-lavender" />
            Key Themes
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="bg-verve-cream dark:bg-gray-800 text-foreground px-3 py-1">
                {keyword}
              </Badge>
            ))}
          </div>
        </section>
        
        <Separator />
        
        {/* Trends Section */}
        <section>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <ArrowUpRight className="h-5 w-5 mr-2 text-verve-lavender" />
            Patterns & Trends
          </h3>
          <ul className="space-y-2">
            {results.trends.map((trend, index) => (
              <li key={index} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-verve-teal/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-xs font-medium text-verve-teal">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm">{trend.description}</p>
                  {trend.frequency && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Mentioned {trend.frequency} times this week
                    </p>
                  )}
                  {trend.daysAgo && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Last mentioned {trend.daysAgo} days ago
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
        
        <Separator />
        
        {/* Insights Section */}
        <section>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-verve-lavender" />
            Reflective Insights
          </h3>
          <div className="p-4 bg-verve-lavender/10 rounded-lg border border-verve-lavender/20">
            <ul className="space-y-2">
              {results.insights.map((insight, index) => (
                <li key={index} className="text-sm leading-relaxed">
                  • {insight}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
