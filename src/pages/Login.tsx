import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center">
              <div className="h-10 w-10 bg-primary text-white rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="ml-2 text-2xl font-bold text-gray-900">Reflexion</span>
            </Link>
          </div>
          
          <LoginForm />
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-hero"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">
              Develop critical thinking through reflective journaling
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Reflexion helps you deepen your reasoning skills with daily thought-provoking questions and expert analysis of your thinking.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Expert Feedback</h3>
                <p className="opacity-80">
                  Get personalized insights from multiple perspectives
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Fallacy Detection</h3>
                <p className="opacity-80">
                  Identify and overcome logical errors in your thinking
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;