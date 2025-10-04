// src/components/IconContainer.tsx

interface IconContainerProps {
  children: React.ReactNode;
  className?: string;
}

const IconContainer = ({ children, className = '' }: IconContainerProps) => {
  return (
    <div className={`inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 ${className}`}>
      {children}
    </div>
  );
};

export default IconContainer;