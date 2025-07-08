import { ContactForm } from '../../components/Forms/ContactForm';
import { API_URL } from '../../constants/global';
import axios from 'axios';

export const ContactPage = () => {
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
      console.log('Thanks for contacting MUSEREST!');
    } catch (error: any) {
      console.error('Failed to send a message:', error);
    }
  };

  return (
    <section>
      <h1>Contact about Collaborations?</h1>
      <div className="contact-form-container">
        <h2>Start a Conversation</h2>
        <ContactForm onSubmit={handleContactForm} />
      </div>
      <div className="contact-info-container"></div>
    </section>
  );
};
