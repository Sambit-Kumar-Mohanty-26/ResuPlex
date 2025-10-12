import useResumeStore from '../../store/resumeStore';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const contact = useResumeStore((state) => state.contact);
  const updateField = useResumeStore((state) => state.updateField);
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField('contact', {
      ...contact,
      [name]: value, 
    });
  };

  return (
    <motion.div
      className="bg-white/5 p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white">Contact Information</h2>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={contact.name || ''} 
            onChange={handleContactChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={contact.email || ''}
            onChange={handleContactChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="mt-1 block w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={contact.phone || ''}
            onChange={handleContactChange}
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300">
            LinkedIn Profile
          </label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            className="mt-1 block w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={contact.linkedin || ''}
            onChange={handleContactChange}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="website" className="block text-sm font-medium text-gray-300">
            Personal Website / Portfolio
          </label>
          <input
            type="text"
            name="website"
            id="website"
            className="mt-1 block w-full bg-white/5 border border-white/20 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={contact.website || ''}
            onChange={handleContactChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;