import { useParams } from 'react-router-dom';
import EntryEditor from '../components/journal/EntryEditor';
import EntryAnalysis from '../components/journal/EntryAnalysis';
import { useJournalStore } from '../stores/journalStore';
import { useEffect } from 'react';

const JournalEntry = () => {
  const { id } = useParams<{ id?: string }>();
  const { currentEntry, fetchEntry } = useJournalStore();
  
  useEffect(() => {
    if (id) {
      fetchEntry(id);
    }
  }, [id, fetchEntry]);
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {id ? 'Edit Journal Entry' : 'New Journal Entry'}
      </h1>
      
      <EntryEditor entryId={id} />
      
      {id && currentEntry && <EntryAnalysis entry={currentEntry} />}
    </div>
  );
};

export default JournalEntry;