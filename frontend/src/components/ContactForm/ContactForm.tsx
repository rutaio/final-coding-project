import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';

interface ContactFormProps {
  onSubmit: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  // I capture inputs from contact form:
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // I'm sending the data:
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //console.log(name, email, message);
    try {
      await axios.post(`${API_URL}/messages`, {
        name,
        email,
        message,
      });
      // if request is successful, I call a function from ContactPage:
      onSubmit();
    } catch (error: any) {
      console.error('Failed to send message:', error);
    } finally {
      setName('');
      setEmail('');
      setMessage('');
      console.log('Thank you for your message!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <textarea
        placeholder="Your Message"
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>

      <button type="submit">Send</button>
    </form>
  );
};
