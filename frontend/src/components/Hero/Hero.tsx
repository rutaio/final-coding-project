import './hero.css';

interface HeroProps {
  children: React.ReactNode;
  className?: string; // for some pages where I want to customise Hero section
}

export const Hero: React.FC<HeroProps> = ({ children, className }) => {
  return <div className={`hero ${className || ''}`}>{children}</div>;
};
