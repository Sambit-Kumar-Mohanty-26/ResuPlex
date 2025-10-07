const ModernTemplate = () => {
  return (
    <div className="p-8 text-black bg-white">
      <div className="text-center border-b-2 pb-4 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-800">SAMBIT KUMAR MOHANTY</h1>
        <p className="text-gray-600 mt-2">
          sambit@example.com | (123) 456-7890 | linkedin.com/in/sambit
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-indigo-600 border-b border-indigo-200 pb-1">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="mt-2 text-gray-700 text-sm">
          A highly motivated and results-oriented Software Engineer...
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-indigo-600 border-b border-indigo-200 pb-1">
          WORK EXPERIENCE
        </h2>
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-gray-800">Software Engineer</h3>
          <p className="text-gray-600 text-sm">Tech Company Inc. | Jan 2025 - Present</p>
          <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
            <li>Developed and maintained web applications using React and Node.js.</li>
            <li>Collaborated with cross-functional teams to deliver high-quality software.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;