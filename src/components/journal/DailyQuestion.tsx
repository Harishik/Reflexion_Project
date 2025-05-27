import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournalStore } from '../../stores/journalStore';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const DailyQuestion = () => {
  const { dailyQuestion, fetchDailyQuestion, isLoading, error } = useJournalStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDailyQuestion();
  }, [fetchDailyQuestion]);
  
  const handleStartJournal = () => {
    navigate('/journal');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse h-32 w-full max-w-2xl rounded-xl bg-gray-200"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-error-600">Error loading today's question. Please try again later.</p>
      </div>
    );
  }
  
  if (!dailyQuestion) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-8 mb-8"
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
          Today's Question
        </span>
        <span className="ml-3 text-gray-500 text-sm">
          {format(new Date(), 'MMMM d, yyyy')}
        </span>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {dailyQuestion.text}
      </h2>
      
      <p className="text-gray-600 mb-6">
        Category: {dailyQuestion.category}
      </p>
      
      <button
        onClick={handleStartJournal}
        className="btn-primary"
      >
        Begin Reflection
      </button>
    </motion.div>
  );
};

export default DailyQuestion;