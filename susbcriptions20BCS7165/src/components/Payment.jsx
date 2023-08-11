import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Plans from "../assets/plans";
import { useNavigate } from "react-router-dom";
const Payment = ({
  user,
  addSubscription,
  setNext,
  client_secret,
  setSubscribed,
  activeplan,
  year,
}) => {
  const n = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const selectedplan = Plans.find((p) => p.id === activeplan);
  const makePay = async () => {
    stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "AYUSH RANDOM NAME",
          },
        },
      })
      .then(function (result) {
        if (result.paymentIntent) {
          const billcycle = year ? "Yearly" : "Monthly";
          const price = year ? selectedplan.yearprice : selectedplan.monthprice;
          addSubscription(user.uid, selectedplan.name, price, billcycle);
          setSubscribed(true);
          n("/manage");
        }
      });
  };

  return (
    <>
      {/* <button onClick={() => setNext(false)}>back</button> */}
      <div className="paymentcont">
        <div className="paymentleft">
          <h2>Complete Payment</h2>
          <span className="cardtext">
            Enter your credit or debit card details below
          </span>
          <div className="cardelement">
            <CardElement id="card" />
          </div>
          <button className="bluebut paybut" onClick={makePay}>
            Confirm Payment
          </button>
          <button className="bluebut paybut" onClick={() => setNext(false)}>
            Back
          </button>
        </div>
        <div className="paymentright">
          <h3>Order Summary</h3>
          <div className="buydetails">
            <ul className="buydetailslist">
              <li className="buydetailsitem">
                <span className="detailsheading">Plan Name</span>

                <span className="detailsdesc">{selectedplan.name}</span>
                <hr className="line2" />
              </li>
              <li className="buydetailsitem">
                <span className="detailsheading">Billing Cycle</span>
                <span className="detailsdesc">
                  {year ? "Yearly" : "Monthly"}
                </span>
                <hr className="line2" />
              </li>
              <li className="buydetailsitem">
                <span className="detailsheading">Plan Price</span>
                <span className="detailsdesc">
                  {year ? selectedplan.yearprice : selectedplan.monthprice}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
