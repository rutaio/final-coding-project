import axios from 'axios';
import { API_URL } from '../../constants/global';
import { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ThanksMessage } from '../ThanksMessage/ThanksMessage';

export const ContactContainer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactForm = async (
    name: string,
    email: string,
    message: string
  ) => {
    try {
      await axios.post(`${API_URL}/messages`, {
        name,
        email,
        message,
      });
      setIsSubmitted(true);
      console.log('Thanks for contacting MUSEREST!');
    } catch (error: any) {
      console.error('Failed to send a message:', error);
    }
  };

  return (
    <div className="contact-form-container">
      {isSubmitted ? (
        <ThanksMessage
          title="Thanks for your message!"
          message="Museum will be in touch with you shortly."
        />
      ) : (
        <ContactForm onSubmit={handleContactForm} />
      )}
    </div>
  );
};
