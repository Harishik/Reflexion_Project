import { create } from 'zustand';
import { JournalEntry, Question } from '../types';
import { getRandomQuestion } from '../utils/questionUtils';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

interface JournalState {
  entries: JournalEntry[];
  currentEntry: JournalEntry | null;
  dailyQuestion: Question | null;
  isLoading: boolean;
  error: string | null;
  
  fetchEntries: () => Promise<void>;
  fetchDailyQuestion: () => Promise<void>;
  fetchEntry: (id: string) => Promise<void>;
  createEntry: (answer: string) => Promise<string | null>;
  updateEntry: (id: string, answer: string) => Promise<boolean>;
  analyzeEntry: (id: string) => Promise<boolean>;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  currentEntry: null,
  dailyQuestion: null,
  isLoading: false,
  error: null,
  
  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: entries, error } = await supabase
        .from('journal_entries')
        .select(`
          *,
          entry_analyses (
            expert_summaries,
            fallacy_feedback,
            improvement_suggestion
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      set({ entries: entries || [], isLoading: false });
    } catch (error) {
      console.error('Failed to fetch entries:', error);
      set({ error: 'Failed to fetch entries', isLoading: false });
    }
  },
  
  fetchDailyQuestion: async () => {
    set({ isLoading: true, error: null });
    try {
      // For now, we'll keep using the local question generation
      // In production, this would fetch from an API or database
      const today = format(new Date(), 'yyyy-MM-dd');
      const newQuestion = getRandomQuestion();
      set({ dailyQuestion: newQuestion, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch daily question:', error);
      set({ error: 'Failed to fetch daily question', isLoading: false });
    }
  },
  
  fetchEntry: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: entry, error } = await supabase
        .from('journal_entries')
        .select(`
          *,
          entry_analyses (
            expert_summaries,
            fallacy_feedback,
            improvement_suggestion
          )
        `)
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      set({ currentEntry: entry, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch entry:', error);
      set({ error: 'Failed to fetch entry', isLoading: false });
    }
  },
  
  createEntry: async (answer: string) => {
    set({ isLoading: true, error: null });
    try {
      const { dailyQuestion } = get();
      if (!dailyQuestion) {
        set({ error: 'No daily question found', isLoading: false });
        return null;
      }
      
      const { data: entry, error } = await supabase
        .from('journal_entries')
        .insert([
          {
            question: dailyQuestion.text,
            answer,
          },
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      const { entries } = get();
      set({
        entries: [entry, ...entries],
        currentEntry: entry,
        isLoading: false,
      });
      
      return entry.id;
    } catch (error) {
      console.error('Failed to create entry:', error);
      set({ error: 'Failed to create entry', isLoading: false });
      return null;
    }
  },
  
  updateEntry: async (id: string, answer: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ answer })
        .eq('id', id);
        
      if (error) throw error;
      
      const { entries } = get();
      const updatedEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, answer } : entry
      );
      
      set({
        entries: updatedEntries,
        currentEntry: updatedEntries.find((e) => e.id === id) || null,
        isLoading: false,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update entry:', error);
      set({ error: 'Failed to update entry', isLoading: false });
      return false;
    }
  },
  
  analyzeEntry: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock analysis - in production, this would call an AI service
      const mockAnalysis = {
        expert_summaries: [
          {
            id: `exp_${Date.now()}_1`,
            perspective: 'Philosopher',
            summary: 'Your reflection shows a thoughtful consideration of ethical principles.',
          },
          {
            id: `exp_${Date.now()}_2`,
            perspective: 'Logician',
            summary: 'Your argument has a clear structure but could benefit from more examination.',
          },
        ],
        fallacy_feedback: 'Consider whether the credibility of sources is sufficient justification.',
        improvement_suggestion: 'Try exploring counterarguments to strengthen your position.',
      };
      
      const { error } = await supabase
        .from('entry_analyses')
        .insert([
          {
            entry_id: id,
            ...mockAnalysis,
          },
        ]);
        
      if (error) throw error;
      
      await get().fetchEntry(id);
      return true;
    } catch (error) {
      console.error('Failed to analyze entry:', error);
      set({ error: 'Failed to analyze entry', isLoading: false });
      return false;
    }
  },
}));