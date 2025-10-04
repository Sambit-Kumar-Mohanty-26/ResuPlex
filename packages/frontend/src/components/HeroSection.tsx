import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TextScramble from './TextScramble'; 

const companyLogos = [
  { src: '/images/logos/google.svg', alt: 'Google' },
  { src: '/images/logos/microsoft.svg', alt: 'Microsoft' },
  { src: '/images/logos/amazon.svg', alt: 'Amazon' },
  { src: '/images/logos/netflix.svg', alt: 'Netflix' },
  { src: '/images/logos/hubspot.svg', alt: 'HubSpot' },
];

const HeroSection = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight 
                           min-h-[140px] sm:min-h-[160px] lg:min-h-[190px]">
              Craft Your Future.
              <br />
              <TextScramble 
                phrases={["Land Your Dream Job.", "Impress Recruiters.", "Get Hired Faster."]} 
                className="
                  text-transparent bg-clip-text 
                  bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
                  bg-[length:200%_auto] 
                  animate-gradient-pan
                "
              />
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              ResuPlex uses AI to build a perfectly tailored resume in minutes. Get noticed by recruiters and accelerate your career.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Create My Resume for Free
              </Link>
            </div>

            <motion.div
              className="mt-16 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }} 
            >
              <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                Trusted by professionals at top companies
              </p>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 items-center">
                {companyLogos.map((logo) => (
                  <img
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 opacity-50 grayscale"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 lg:p-6 transform hover:-rotate-2 transition-transform duration-500">
              <img
                src="/images/hero-image.png"
                alt="AI-powered resume creation"
                className="rounded-xl w-full h-auto"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;