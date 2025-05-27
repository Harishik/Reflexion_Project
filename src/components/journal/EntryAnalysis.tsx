import { JournalEntry } from '../../types';
import { motion } from 'framer-motion';

interface EntryAnalysisProps {
  entry: JournalEntry;
}

const EntryAnalysis = ({ entry }: EntryAnalysisProps) => {
  if (!entry.expertSummaries || entry.expertSummaries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <p className="text-gray-500 italic text-center">
          This entry has not been analyzed yet. Click the "Analyze" button to get feedback.
        </p>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6 space-y-6"
    >
      {/* Expert Summaries */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expert Perspectives</h3>
        
        <div className="space-y-4">
          {entry.expertSummaries.map((summary) => (
            <div key={summary.id} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                {summary.perspective} Perspective:
              </h4>
              <p className="text-gray-700">{summary.summary}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fallacy Feedback */}
      {entry.fallacyFeedback && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fallacy Detection</h3>
          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <p className="text-gray-800">{entry.fallacyFeedback}</p>
          </div>
        </div>
      )}
      
      {/* Improvement Suggestions */}
      {entry.improvementSuggestion && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Improvement Suggestions
          </h3>
          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <p className="text-gray-800">{entry.improvementSuggestion}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EntryAnalysis;