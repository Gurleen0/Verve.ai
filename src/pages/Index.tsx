
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JournalEditor from '@/components/JournalEditor';
import AnalysisResults, { AnalysisResult } from '@/components/AnalysisResults';
import { analyzeJournalEntry } from '@/services/journalAnalyzer';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (content: string) => {
    // Perform analysis
    const results = analyzeJournalEntry(content);
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-verve-cream to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto py-8">
        <div className="flex items-center justify-center mb-8">
          <Sparkles className="h-8 w-8 mr-3 text-verve-teal" />
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-verve-navy to-verve-teal bg-clip-text text-transparent">
            Verve Journal Whisperer
          </h1>
        </div>
        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Write your thoughts and let our AI analyze patterns, emotions, and insights from your journaling practice.
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <JournalEditor onAnalyze={handleAnalyze} className="md:col-span-2 lg:col-span-1" />
          
          {analysisResults ? (
            <AnalysisResults results={analysisResults} className="md:col-span-2 lg:col-span-1" />
          ) : (
            <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-verve-lavender/5 to-verve-teal/5 border border-verve-lavender/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-verve-lavender" />
                  Journal Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-verve-teal/10 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-verve-teal/60" />
                  </div>
                  <h3 className="text-xl font-medium">Discover Your Patterns</h3>
                  <p className="text-muted-foreground max-w-md">
                    Write a journal entry and click "Analyze Entry" to see emotional patterns, 
                    recurring themes, and meaningful insights from your writing.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        <p>All journal analysis happens locally - your data never leaves your device.</p>
      </footer>
    </div>
  );
};

export default Index;
