import { useState } from 'react';
import axios from 'axios';
import {apiForContact} from '../../../constants/globalContactApi';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(name, email, message);
    try {
      await axios.post(apiForContact, {
        name,
        email,
        message,
      });
    } catch (error) {
      console.error('error');
    } finally {
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <form action="contact-form" onSubmit={handleSubmit}>
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
