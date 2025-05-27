import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { JournalEntry } from '../../types';
import { format } from 'date-fns';

interface CardStackProps {
  entries: JournalEntry[];
  maxCards?: number;
}

const CardStack = ({ entries, maxCards = 5 }: CardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Limit the number of cards shown
  const displayEntries = entries.slice(0, maxCards);
  
  return (
    <div ref={containerRef} className="relative h-80">
      {displayEntries.map((entry, index) => {
        // Calculate the offset for each card
        const offset = index * 20;
        const rotate = (index % 2 === 0 ? 1 : -1) * (index + 1);
        
        return (
          <motion.div
            key={entry.id}
            className="absolute left-0 right-0 mx-auto bg-white rounded-xl shadow-lg p-6 w-full sm:w-80"
            style={{
              zIndex: displayEntries.length - index,
              width: width > 640 ? 320 : width - 40, // Responsive width
            }}
            initial={{ y: 60, opacity: 0 }}
            animate={{
              y: offset,
              x: rotate * 2,
              opacity: 1,
              rotateZ: rotate,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                {format(new Date(entry.date), 'MMM d, yyyy')}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {entry.question}
            </h3>
            
            <p className="text-gray-600 line-clamp-3">{entry.answer}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardStack;