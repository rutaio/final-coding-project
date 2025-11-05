import { Button } from '../Buttons/Button';
import './checkout.css';

export const Checkout = () => {
  return (
    <div className="checkout-form-wrapper">
      <div className="right-container">
        <h3> Billing Details</h3>
        <form></form>
      </div>
      <div className="left-container">
        <div className="order-details">
          <h3>Your Order</h3>
        </div>
        <div className="card-details">
          <h3>Card Details</h3>
          <Button buttonType="primary">Place Order</Button>
        </div>
      </div>
    </div>
  );
};
