import type { ResumeState } from '../../../types/resume';

interface TemplateProps {
  data: ResumeState;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  const { theme } = data;

  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  }[theme.fontFamily];

  const textSizeBase = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[theme.fontSize];

  const headingSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[theme.fontSize];

  return (
    <div className={`p-8 bg-white min-h-full ${fontClass} ${textSizeBase} text-gray-800`}>
      <div className="text-center border-b-2 pb-4" style={{ borderColor: theme.primaryColor }}>
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#111827' }}>
          {data.contact.name || 'Your Name'}
        </h1>
        <p className="mt-2 opacity-80" style={{ color: theme.primaryColor }}>
          {[
            data.contact.email,
            data.contact.phone,
            data.contact.linkedin,
            data.contact.website
          ].filter(Boolean).join(' | ')}
        </p>
      </div>
      {data.summary && (
        <div className="mt-6">
          <h2 className={`font-bold tracking-widest uppercase border-b-2 pb-1 ${headingSize}`}
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}>
            Professional Summary
          </h2>
          <p className="mt-2 whitespace-pre-wrap">{data.summary}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div className="mt-6">
          <h2 className={`font-bold tracking-widest uppercase border-b-2 pb-1 ${headingSize}`}
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}>
            Work Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mt-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{exp.jobTitle || 'Job Title'}</h3>
                <p className="opacity-75 font-medium">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="font-medium" style={{ color: theme.primaryColor }}>
                {exp.company || 'Company Name'}{exp.location && `, ${exp.location}`}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 opacity-90">
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
          <h2 className={`font-bold tracking-widest uppercase border-b-2 pb-1 ${headingSize}`}
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mt-4">
               <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                <p className="opacity-75 font-medium">{edu.graduationDate}</p>
              </div>
              <p className="font-medium" style={{ color: theme.primaryColor }}>
                {edu.institution || 'Institution'}{edu.location && `, ${edu.location}`}
              </p>
            </div>
          ))}
        </div>
      )}
      {data.skills.length > 0 && (
        <div className="mt-6">
          <h2 className={`font-bold tracking-widest uppercase border-b-2 pb-1 ${headingSize}`}
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}>
            Skills
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span 
                key={skill.id} 
                className="text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
              >
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