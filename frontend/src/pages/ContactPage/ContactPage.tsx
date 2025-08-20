import { ContactContainer } from '../../components/Contact/ContactContainer';
import { Container } from '../../components/Container/Container';

export const ContactPage = () => {
  return (
    <Container>
      <h1>Contact about Collaborations?</h1>
      <p>
        Curious about collaborations? Contact our Museum to start a
        conversation.
      </p>
      <ContactContainer />
    </Container>
  );
};
