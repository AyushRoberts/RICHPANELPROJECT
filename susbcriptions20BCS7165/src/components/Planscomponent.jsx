import React, { useEffect, useState } from "react";
import Plans from "../assets/plans";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
const auth = getAuth(app);

const Planscomponent = ({
  active,
  setActive,
  setNext,
  setUser,
  setActivePlan,
  year,
  setYear,
}) => {
  const n = useNavigate();
  const logout = () =>
    signOut(auth)
      .then(() => {
        setUser();
        n("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  ("1");
  useEffect(() => {
    const checkactive = () => {
      document
        .querySelectorAll(".card")
        .forEach((e) => e.classList.remove("active"));
      const elem = document.getElementById(active);
      elem.classList.add("active");
    };
    checkactive();
  }, [active]);
  const nexthandle = () => {
    setNext(active);
  };
  const handleactive = (plan) => {
    setActive(plan.name);
    setActivePlan(plan.id);
  };
  const switchhandle = (id) => {
    if (!document.getElementById(id).classList.contains("activeswitcheritem"))
      setYear(!year);
    document
      .querySelectorAll(".switcheritem")
      .forEach((e) => e.classList.remove("activeswitcheritem"));
    document.getElementById(id).classList.add("activeswitcheritem");
  };
  return (
    <>
      <div className="submaincont">
        <button className="bluebut" onClick={logout}>
          Logout
        </button>
        <div className="subtop">
          <h2>Choose the right plan for you</h2>
        </div>
        <div className="submain">
          <div className="subdet">
            <div className="switcher">
              <ul className="switcherlist">
                <li
                  id="month"
                  onClick={() => switchhandle("month")}
                  className="switcheritem activeswitcheritem"
                >
                  Monthly
                </li>
                <li
                  id="year"
                  onClick={() => switchhandle("year")}
                  className="switcheritem"
                >
                  Yearly
                </li>
              </ul>
            </div>
            <div className="priceheading">
              Monthly price <hr className="line" />
            </div>

            <div className="qualityheding">
              Video quality
              <hr className="line" />
            </div>
            <div className="resheading">
              Resolution
              <hr className="line" />
            </div>
            <div className="devicehading">Devices you can use to watch</div>
          </div>
          <div className="subcards">
            {Plans.map((plan) => {
              return (
                <div key={plan.id} className="card card1" id={plan.name}>
                  <div onClick={() => handleactive(plan)} className="planname">
                    {plan.name}
                  </div>
                  <div className="planprice">
                    {year ? plan.yearprice : plan.monthprice}
                  </div>
                  <div className="planquality">{plan.quality}</div>
                  <div className="planres">{plan.res}</div>
                  <div className="plandevices">
                    {plan.devices.map((device, i) => {
                      return (
                        <div key={i} className="deviceitem">
                          {device}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="subfooter">
          <button onClick={() => nexthandle(active)} className="bluebut">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Planscomponent;
