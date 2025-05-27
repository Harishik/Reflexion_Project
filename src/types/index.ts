export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Question {
  id: string;
  text: string;
  category: string;
  date: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  questionId: string;
  question: string;
  answer: string;
  expertSummaries: ExpertSummary[];
  fallacyFeedback?: string;
  improvementSuggestion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpertSummary {
  id: string;
  perspective: string;
  summary: string;
}

export interface Fallacy {
  type: string;
  description: string;
  occurrence: string;
}

export interface ImprovementSuggestion {
  area: string;
  suggestion: string;
}