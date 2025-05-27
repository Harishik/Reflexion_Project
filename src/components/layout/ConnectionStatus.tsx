import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { testConnection } from '../../lib/supabase';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const result = await testConnection();
      if (result.success) {
        setStatus('connected');
      } else {
        setStatus('error');
        setError('Database connection failed');
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-2">
        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        <span className="text-sm text-gray-600">Checking connection...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="fixed bottom-4 right-4 bg-error-50 text-error-700 rounded-lg shadow-lg p-4 flex items-center space-x-2">
        <AlertCircle size={16} />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-success-50 text-success-700 rounded-lg shadow-lg p-4 flex items-center space-x-2">
      <CheckCircle2 size={16} />
      <span className="text-sm">Connected to database</span>
    </div>
  );
};

export default ConnectionStatus;