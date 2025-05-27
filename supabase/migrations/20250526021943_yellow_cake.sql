/*
  # Initial Schema Setup for Reflexion

  1. New Tables
    - `users` - Extended user profile data
      - `id` (uuid, matches auth.users)
      - `name` (text)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `journal_entries` - User journal entries
      - `id` (uuid)
      - `user_id` (uuid, references users)
      - `question` (text)
      - `answer` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `entry_analyses` - AI analysis results
      - `id` (uuid)
      - `entry_id` (uuid, references journal_entries)
      - `expert_summaries` (jsonb)
      - `fallacy_feedback` (text)
      - `improvement_suggestion` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read and update their own data
      - Create new entries
      - View their own analyses
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create journal entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create entry analyses table
CREATE TABLE IF NOT EXISTS entry_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid REFERENCES journal_entries(id) NOT NULL,
  expert_summaries jsonb NOT NULL DEFAULT '[]',
  fallacy_feedback text,
  improvement_suggestion text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_analyses ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Journal entries policies
CREATE POLICY "Users can read own entries"
  ON journal_entries
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create entries"
  ON journal_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own entries"
  ON journal_entries
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Entry analyses policies
CREATE POLICY "Users can read own analyses"
  ON entry_analyses
  FOR SELECT
  TO authenticated
  USING (
    entry_id IN (
      SELECT id FROM journal_entries 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create analyses for own entries"
  ON entry_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    entry_id IN (
      SELECT id FROM journal_entries 
      WHERE user_id = auth.uid()
    )
  );