import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Logo from '../components/Logo';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await apiClient.post('/auth/register', { name, email, password });
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      loginAction(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration failed:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          className="absolute top-0 right-0 h-96 w-96 bg-gradient-to-bl from-purple-500 to-transparent rounded-full blur-3xl"
          animate={{ x: [100, -100, 100], y: [50, -50, 50], scale: [1, 1.2, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-96 w-96 bg-gradient-to-tr from-cyan-500 to-transparent rounded-full blur-3xl"
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [1, 1.1, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Logo className="justify-center" variant="dark" useGradient={true} />
        </motion.div>
        
        <Tilt
          className="mt-8 w-full max-w-md"
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#ffffff"
          scale={1.02}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
                <p className="mt-2 text-gray-300">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Sign In
                  </Link>
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}

                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    className="peer w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 -top-2.5 bg-gray-900/50 px-1 text-sm text-gray-300 transition-all 
                               peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    className="peer w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 -top-2.5 bg-gray-900/50 px-1 text-sm text-gray-300 transition-all 
                               peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400"
                  >
                    Email address
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    className="peer w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label 
                    htmlFor="password" 
                    className="absolute left-4 -top-2.5 bg-gray-900/50 px-1 text-sm text-gray-300 transition-all 
                               peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                               peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400"
                  >
                    Password
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full inline-flex items-center justify-center px-4 py-3 text-white font-semibold bg-indigo-600 rounded-lg overflow-hidden"
                  >
                    <span className="absolute h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600"></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-20 group-hover:opacity-0 transition-opacity"></span>
                    <span className="absolute top-0 left-0 w-1/4 h-full bg-white opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700"></span>
                    <span className="relative z-10">Create Account</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </div>
  );
};

export default RegisterPage;