import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournalStore } from '../../stores/journalStore';

interface EntryEditorProps {
  entryId?: string;
}

const EntryEditor = ({ entryId }: EntryEditorProps) => {
  const [answer, setAnswer] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const {
    dailyQuestion,
    currentEntry,
    fetchDailyQuestion,
    fetchEntry,
    createEntry,
    updateEntry,
    analyzeEntry,
  } = useJournalStore();
  
  useEffect(() => {
    if (entryId) {
      fetchEntry(entryId);
    } else {
      fetchDailyQuestion();
    }
  }, [entryId, fetchEntry, fetchDailyQuestion]);
  
  useEffect(() => {
    if (currentEntry) {
      setAnswer(currentEntry.answer);
    }
  }, [currentEntry]);
  
  const handleSave = async () => {
    if (!answer.trim()) return;
    
    setIsSaving(true);
    
    try {
      if (entryId) {
        await updateEntry(entryId, answer);
      } else {
        const newEntryId = await createEntry(answer);
        if (newEntryId) {
          navigate(`/journal/${newEntryId}`);
        }
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleAnalyze = async () => {
    if (!entryId || !answer.trim()) return;
    
    setIsSaving(true);
    try {
      await analyzeEntry(entryId);
    } finally {
      setIsSaving(false);
    }
  };
  
  const question = currentEntry?.question || dailyQuestion?.text;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {question ? (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{question}</h2>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Begin your reflection here..."
            className="entry-editor"
            disabled={isSaving}
          />
          
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving || !answer.trim()}
              className="btn-primary"
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </button>
            
            {entryId && (
              <button
                onClick={handleAnalyze}
                disabled={isSaving || !answer.trim()}
                className="btn-secondary"
              >
                Analyze
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default EntryEditor;