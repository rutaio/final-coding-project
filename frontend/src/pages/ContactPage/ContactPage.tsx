import { ContactContainer } from '../../components/Contact/ContactContainer';
import './contact-page.css';

export const ContactPage = () => {
  return (
    <main className="page-container">
      <h1>Contact about Collaborations?</h1>
      <p className="page-description">
        Curious about collaborations? Contact our Museum to start a
        conversation.
      </p>
      <ContactContainer />
    </main>
  );
};
