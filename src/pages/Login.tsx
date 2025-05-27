import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center mb-8">
              <div className="h-10 w-10 bg-primary text-white rounded flex items-center justify-center">
                <span className="font-semibold text-lg">R</span>
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
        className="hidden lg:block lg:flex-1 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-900 flex items-center justify-center">
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