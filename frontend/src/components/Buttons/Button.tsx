import './button.css';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  buttonType?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

export const Button = ({
  children,
  onClick,
  buttonType = 'primary',
  type = 'button',
}: ButtonProps) => {
  return (
    <button className={`button button-${buttonType}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
