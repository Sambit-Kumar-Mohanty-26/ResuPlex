import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Logo from '../components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      loginAction(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-900 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 opacity-40"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #4f46e5, transparent 40%), radial-gradient(circle at 75% 75%, #22d3ee, transparent 40%)',
            backgroundSize: '200% 200%',
          }}
        />
        
        <motion.div
          className="relative z-10 text-white text-center p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
            <motion.div variants={itemVariants}>
              <Logo
                className="justify-center"
                variant="dark" 
                useGradient={true}
              />
            </motion.div>
          </Tilt>
          
          <motion.h1 variants={itemVariants} className="mt-8 text-4xl font-extrabold">
            Welcome Back to Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 animate-pulse">
              Career Future
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-300">
            Let's pick up where you left off and continue crafting your perfect resume.
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign in to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                ResuPlex
              </span>
            </h2>
            <p className="mt-2 text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
                Sign up for free
              </Link>
            </p>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>}
            
            <motion.div variants={itemVariants} className="relative">
              <input
                id="email"
                type="email"
                required
                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label 
                htmlFor="email" 
                className="absolute left-4 -top-2.5 bg-gray-50 px-1 text-sm text-gray-600 transition-all 
                           peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                           peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Email address
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <input
                id="password"
                type="password"
                required
                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-transparent"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label 
                htmlFor="password" 
                className="absolute left-4 -top-2.5 bg-gray-50 px-1 text-sm text-gray-600 transition-all 
                           peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                           peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Password
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="group relative w-full inline-flex items-center justify-center px-4 py-3 text-white font-semibold bg-indigo-600 rounded-lg overflow-hidden"
              >
                <span className="absolute h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-20 group-hover:opacity-0 transition-opacity"></span>
                <span className="absolute top-0 left-0 w-1/4 h-full bg-white opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700"></span>
                <span className="relative z-10">Sign In</span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;