import './button.css';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  buttonType?: 'primary' | 'secondary' | 'small';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  buttonType = 'primary',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`button button-${buttonType}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
