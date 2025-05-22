import '../ContactPage/contact.css';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactsInfo } from '../../components/ContactForm/ContactsInfo';

export const ContactsPage = () => {

  const handleContactForm = () => {
    console.log('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section className="contact">
      <h1>Contact about Collaborations?</h1>
      <div className="contact-form-container">
        <h2>Start a Conversation</h2>
        <ContactForm onSubmit={handleContactForm} />
      </div>
      <div className="contact-info-container">
        <ContactsInfo />
      </div>
    </section>
  );
};
