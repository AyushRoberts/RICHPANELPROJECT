import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import Planscomponent from "./Planscomponent";
import { useNavigate } from "react-router-dom";
// Your web app's Firebase configuration
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import Plans from "../assets/plans";
const stripePromise = loadStripe(
  "pk_test_51NdCoiSFgNssnXOVfIyu4a9VHlqYO51psf09YdkqrkN9wycGd5QcRgNO0xAwsX7a877wNKNHGoT6IdHMKzdwYWqL009JiShjNV"
);

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGmv-V-_vxvYCePBJ3zKeHbNa3oq1PwUQ",
  authDomain: "subscription20bcs7165.firebaseapp.com",
  projectId: "subscription20bcs7165",
  storageBucket: "subscription20bcs7165.appspot.com",
  messagingSenderId: "580129118396",
  appId: "1:580129118396:web:735c45bbbbe93c741dd8b9",
  databaseURL: "https://subscription20bcs7165-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const Subscribe = ({ next, setNext, user, setUser }) => {
  const n = useNavigate();
  const [cc, setcc] = useState();
  const getcs = async (cost) => {
    const response = await fetch("http://16.171.35.127:3000/secret", {
      headers: { Cost: cost },
    });
    const { client_secret } = await response.json();
    setcc(client_secret);
  };
  const [active, setActive] = useState("Mobile");
  const [activeplan, setActivePlan] = useState(1);
  const [year, setYear] = useState(false);

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!year) getcs(Plans.find((p) => p.id === activeplan).monthprice);
    else getcs(Plans.find((p) => p.id === activeplan).yearprice);
  }, [active]);
  const addSubscription = (userId, name, price, billcycle) => {
    const db = getDatabase(app);
    set(ref(db, "subscriptions/" + userId), {
      active: true,
      plan: name,
      price: price,
      billcycle: billcycle,
    });
  };

  return (
    <>
      <Elements stripe={stripePromise}>
        {next ? (
          <Payment
            user={user}
            addSubscription={addSubscription}
            setNext={setNext}
            year={year}
            client_secret={cc}
            activeplan={activeplan}
            setSubscribed={setSubscribed}
          />
        ) : (
          <Planscomponent
            year={year}
            setYear={setYear}
            setUser={setUser}
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
