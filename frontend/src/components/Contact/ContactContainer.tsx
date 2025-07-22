import axios from 'axios';
import { API_URL } from '../../constants/global';
import { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ThanksMessage } from '../ThanksMessage/ThanksMessage';

export const ContactContainer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);

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
      setShouldResetForm(true);
      setError(null);
      console.log('Thanks for contacting MUSEREST!');
    } catch (error: any) {
      const backendMessage = error?.response?.data?.error;
      setError(
        backendMessage || 'Something went wrong. Please try again later.'
      );
      setShouldResetForm(false); // do not clear the form (because user may want to see it..)
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
        <ContactForm onSubmit={handleContactForm} error={error} shouldReset={shouldResetForm} />
      )}
    </div>
  );
};
