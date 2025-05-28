import './tabs.css';

interface TabsProps {
  isActive: boolean;
  children: string;
  onClick?: () => void;
}

export const Tabs = ({ children, onClick, isActive }: TabsProps) => {
  return (
    <button
      className={`tab-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
