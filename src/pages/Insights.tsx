import { useEffect } from 'react';
import { useJournalStore } from '../stores/journalStore';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Insights = () => {
  const { entries, fetchEntries, isLoading } = useJournalStore();
  
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);
  
  // Get only analyzed entries
  const analyzedEntries = entries.filter(
    (entry) => entry.expertSummaries && entry.expertSummaries.length > 0
  );
  
  // Mock insights data (in a real app, this would be generated from actual analysis)
  const commonFallacies = [
    { type: 'Appeal to Authority', count: 3 },
    { type: 'False Dichotomy', count: 2 },
    { type: 'Confirmation Bias', count: 4 },
  ];
  
  const strengthAreas = [
    { area: 'Logical Consistency', score: 82 },
    { area: 'Evidence Usage', score: 75 },
    { area: 'Counter-argument Consideration', score: 68 },
  ];
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Your Thinking Insights
      </motion.h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse h-64 rounded-xl bg-gray-200"
            ></div>
          ))}
        </div>
      ) : analyzedEntries.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Reasoning Strengths</h2>
            
            <div className="space-y-4">
              {strengthAreas.map((area) => (
                <div key={area.area} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{area.area}</span>
                    <span className="font-medium">{area.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${area.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Common Fallacies</h2>
            
            <div className="space-y-4">
              {commonFallacies.map((fallacy) => (
                <div
                  key={fallacy.type}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <span className="text-gray-700">{fallacy.type}</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-warning-100 text-warning-800 rounded-full text-sm font-medium">
                    {fallacy.count}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Analysis</h2>
            
            <div className="space-y-6">
              {analyzedEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{entry.question}</h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(entry.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{entry.answer}</p>
                  
                  {entry.fallacyFeedback && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-warning-700">Fallacy:</span>
                      <p className="text-sm text-gray-700">{entry.fallacyFeedback}</p>
                    </div>
                  )}
                  
                  {entry.improvementSuggestion && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-success-700">Suggestion:</span>
                      <p className="text-sm text-gray-700">{entry.improvementSuggestion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 mb-4">
            No insights available yet. Analyze your journal entries to see insights.
          </p>
          <a href="/entries" className="btn-primary">
            View Your Entries
          </a>
        </div>
      )}
    </div>
  );
};

export default Insights;