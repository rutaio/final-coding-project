import { Button } from '../Buttons/Button';
import { useState } from 'react';

interface ContactFormProps {
  onSubmit: (name: string, email: string, message: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, message);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Share your message:</label>
        <textarea
          id="message"
          rows={4}
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button buttonType="primary" type="submit">
        Send
      </Button>
    </form>
  );
};
