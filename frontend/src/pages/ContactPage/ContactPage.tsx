import '../ContactPage/contact.css';
import { ContactForm } from './components/ContactForm';
import { ContactsInfo } from './components/ContactsInfo';

export const ContactsPage = () => {

  const handleContactForm = () => {
    console.log('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section className="contact">
      <h2>Contact about Collaborations?</h2>
      <div className="contact-form-container">
        <h3>Start a Conversation</h3>
        <ContactForm onSubmit={handleContactForm} />
      </div>
      <div className="contact-info-container">
        <ContactsInfo />
      </div>
    </section>
  );
};
