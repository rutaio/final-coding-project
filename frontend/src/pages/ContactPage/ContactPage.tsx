import '../ContactPage/contact.css';
import { ContactForm } from './components/ContactForm';
import { ContactsInfo } from './components/ContactsInfo';

export const ContactsPage = () => {
  return (
    <section className="contact">
      <h2>Contact about Collaborations?</h2>
      <div className="contact-form-container">
        <h3>Start a Conversation</h3>
        <ContactForm />
      </div>
      <div className="contact-info-container">
        <ContactsInfo />
      </div>
    </section>
  );
};
