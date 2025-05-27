import { Question } from '../types';
import { format } from 'date-fns';

// Sample questions for different categories
const questions: Question[] = [
  {
    id: 'q1',
    text: 'How do you distinguish between knowledge and belief in your daily life?',
    category: 'Epistemology',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q2',
    text: 'When is it ethical to prioritize your own well-being over others?',
    category: 'Ethics',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q3',
    text: 'How would you define consciousness, and what implications does your definition have?',
    category: 'Philosophy of Mind',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q4',
    text: 'Is technological progress inherently positive for humanity?',
    category: 'Philosophy of Technology',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q5',
    text: 'How do you reconcile determinism with moral responsibility?',
    category: 'Metaphysics',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q6',
    text: 'What constitutes a just society, and how close is your society to this ideal?',
    category: 'Political Philosophy',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q7',
    text: 'How does language shape your perception of reality?',
    category: 'Philosophy of Language',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q8',
    text: 'What is the relationship between rationality and emotion in decision-making?',
    category: 'Cognitive Science',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q9',
    text: 'How do you approach conflicting evidence when forming beliefs?',
    category: 'Critical Thinking',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: 'q10',
    text: 'Is there an objective basis for aesthetic judgment?',
    category: 'Aesthetics',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
];

// Function to get a random question
export const getRandomQuestion = (): Question => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

// Function to get a question by ID
export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};

// Function to get questions by category
export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};