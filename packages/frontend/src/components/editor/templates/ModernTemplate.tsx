import type{ ResumeState } from '../../../types/resume'; 

interface TemplateProps {
  data: ResumeState;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="p-8 text-sm text-gray-800 bg-white min-h-full">
      <div className="text-center border-b-2 pb-4 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.contact.name || 'Your Name'}</h1>
        <p className="text-gray-600 mt-2 text-xs">
          {data.contact.email}
          {data.contact.phone && ` | ${data.contact.phone}`}
          {data.contact.linkedin && ` | ${data.contact.linkedin}`}
          {data.contact.website && ` | ${data.contact.website}`}
        </p>
      </div>
      {data.summary && (
        <div className="mt-6">
          <h2 className="text-base font-bold text-indigo-600 tracking-widest uppercase border-b-2 border-indigo-200 pb-1">
            Professional Summary
          </h2>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{data.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-bold text-indigo-600 tracking-widest uppercase border-b-2 border-indigo-200 pb-1">
            Work Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mt-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold text-gray-900">{exp.jobTitle || 'Job Title'}</h3>
                <p className="text-gray-600 text-xs">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-gray-700 text-sm font-medium">{exp.company || 'Company Name'}{exp.location && `, ${exp.location}`}</p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {data.education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-bold text-indigo-600 tracking-widest uppercase border-b-2 border-indigo-200 pb-1">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mt-4">
               <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold text-gray-900">{edu.degree || 'Degree or Certificate'}</h3>
                <p className="text-gray-600 text-xs">{edu.graduationDate}</p>
              </div>
              <p className="text-gray-700 text-sm font-medium">{edu.institution || 'Institution Name'}{edu.location && `, ${edu.location}`}</p>
            </div>
          ))}
        </div>
      )}
      {data.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-bold text-indigo-600 tracking-widest uppercase border-b-2 border-indigo-200 pb-1">
            Skills
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;