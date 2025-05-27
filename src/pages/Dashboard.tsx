import { useEffect } from 'react';
import { useJournalStore } from '../stores/journalStore';
import DailyQuestion from '../components/journal/DailyQuestion';
import CardStack from '../components/animations/CardStack';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { entries, fetchEntries, isLoading } = useJournalStore();
  
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Your Reflection Dashboard
      </motion.h1>
      
      <DailyQuestion />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Entries</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse h-32 w-full max-w-2xl rounded-xl bg-gray-200"></div>
            </div>
          ) : entries.length > 0 ? (
            <div className="space-y-4">
              {entries.slice(0, 3).map((entry) => (
                <Link
                  key={entry.id}
                  to={`/journal/${entry.id}`}
                  className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                    {entry.question}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{entry.answer}</p>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/entries"
                  className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center"
                >
                  View all entries
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No journal entries yet</p>
              <Link to="/journal" className="btn-primary">
                Create Your First Entry
              </Link>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Journal</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse h-32 w-full max-w-2xl rounded-xl bg-gray-200"></div>
            </div>
          ) : entries.length > 0 ? (
            <CardStack entries={entries} maxCards={5} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Your journal collection will appear here as you create entries.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;