import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { JournalEntry } from '../../types';
import { motion } from 'framer-motion';

interface EntryCardProps {
  entry: JournalEntry;
  index: number;
}

const EntryCard = ({ entry, index }: EntryCardProps) => {
  // Calculate staggered animation delay based on index
  const delay = index * 0.1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="journal-card bg-white rounded-xl shadow-sm overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="p-6">
        <div className="mb-3 flex justify-between items-start">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            {entry.date ? format(new Date(entry.date), 'MMM d, yyyy') : 'No date'}
          </span>
          
          {entry.expertSummaries && entry.expertSummaries.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-medium">
              Analyzed
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {entry.question}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{entry.answer}</p>
        
        <Link
          to={`/journal/${entry.id}`}
          className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center"
        >
          Continue Reflection
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
    </motion.div>
  );
};

export default EntryCard;