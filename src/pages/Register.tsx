import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { motion } from 'framer-motion';

const Register = () => {
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
          
          <RegisterForm />
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
              Begin your journey to improved reasoning
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join Reflexion to enhance your critical thinking through guided reflection and expert analysis of your thought processes.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Daily Questions</h3>
                <p className="opacity-80">
                  Thought-provoking prompts across various disciplines
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Improvement Tracking</h3>
                <p className="opacity-80">
                  Visualize your progress and growth over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;