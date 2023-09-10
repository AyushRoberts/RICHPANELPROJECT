import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Plans from "../assets/plans";
import Payment from "./Payment";
import Planscomponent from "./Planscomponent";
const stripePromise = loadStripe(
  "pk_test_51NdCoiSFgNssnXOVfIyu4a9VHlqYO51psf09YdkqrkN9wycGd5QcRgNO0xAwsX7a877wNKNHGoT6IdHMKzdwYWqL009JiShjNV"
);

// Initialize Realtime Database and get a reference to the service
const Subscribe = ({ next, setNext }) => {
  const [user] = useAuthState(auth);
  const [cc, setcc] = useState();
  const [active, setActive] = useState("Mobile");
  const [activeplan, setActivePlan] = useState(1);
  const [year, setYear] = useState(false);
  const getcs = async (cost) => {
    const response = await fetch("http://16.171.35.127:3000/getClientSec", {
      headers: { Cost: cost },
    });
    const { client_secret } = await response.json();
    setcc(client_secret);
  };
  useEffect(() => {
    if (!year) getcs(Plans.find((p) => p.id === activeplan).monthprice);
    else getcs(Plans.find((p) => p.id === activeplan).yearprice);
  }, [active]);
  const addSubscription = async (userId, name, price, billcycle) => {
    const userref = doc(db, "users", user.uid);
    await updateDoc(userref, {
      subscriptionactive: true,
      plan: name,
      price: price,
      billcycle: billcycle,
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
      }),
    });
  };

  return (
    <>
      <Elements stripe={stripePromise}>
        {next ? (
          <Payment
            setYear={setYear}
            user={user}
            addSubscription={addSubscription}
            setNext={setNext}
            year={year}
            client_secret={cc}
            activeplan={activeplan}
          />
        ) : (
          <Planscomponent
            year={year}
            setYear={setYear}
            active={active}
            setActivePlan={setActivePlan}
            setActive={setActive}
            setNext={setNext}
          />
        )}
      </Elements>
    </>
  );
};

export default Subscribe;
