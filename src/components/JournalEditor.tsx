
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JournalEditorProps {
  onAnalyze: (content: string) => void;
  className?: string;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ onAnalyze, className }) => {
  const [content, setContent] = useState('');
  const [isWriting, setIsWriting] = useState(true);

  const handleAnalyze = () => {
    if (content.trim()) {
      onAnalyze(content);
      setIsWriting(false);
    }
  };

  const handleContinueWriting = () => {
    setIsWriting(true);
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        {isWriting ? (
          <>
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 mr-2 text-verve-teal" />
              <h2 className="text-xl font-semibold">Journal Entry</h2>
            </div>
            <Textarea
              placeholder="Write your thoughts here..."
              className="min-h-[300px] journal-content text-lg p-4 focus:ring-verve-teal"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleAnalyze} 
                disabled={!content.trim()} 
                className="bg-verve-teal hover:bg-verve-teal/90"
              >
                <Search className="h-4 w-4 mr-2" />
                Analyze Entry
              </Button>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <Button 
              onClick={handleContinueWriting}
              variant="outline" 
              className="border-verve-teal text-verve-teal hover:bg-verve-teal/10"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Continue Writing
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JournalEditor;
