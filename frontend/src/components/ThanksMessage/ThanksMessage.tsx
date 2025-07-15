interface ThanksMessageProps {
  title?: string;
  message?: string;
}

export const ThanksMessage = ({
  title = 'Thanks for your message!',
  message = 'Museum will be in touch with you shortly.',
}: ThanksMessageProps) => {
  return (
    <div className="thanks-message">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
