import { useEffect, useState } from 'react';
import { useJournalStore } from '../stores/journalStore';
import EntryCard from '../components/journal/EntryCard';
import { motion } from 'framer-motion';

const PastEntries = () => {
  const { entries, fetchEntries, isLoading } = useJournalStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);
  
  const filteredEntries = searchTerm
    ? entries.filter(
        (entry) =>
          entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : entries;
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0"
        >
          Your Journal Entries
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </motion.div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse h-64 rounded-xl bg-gray-200"
            ></div>
          ))}
        </div>
      ) : filteredEntries.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEntries.map((entry, index) => (
            <EntryCard key={entry.id} entry={entry} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? 'No entries match your search'
              : 'You have not created any journal entries yet'}
          </p>
          {!searchTerm && (
            <a href="/journal" className="btn-primary">
              Create Your First Entry
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default PastEntries;