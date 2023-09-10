import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Manage = ({ det, cancelSubscription, currentlyactive, setNext }) => {
  const n = useNavigate();
  useEffect(() => {});
  return (
    <>
      {det && (
        <div className="managecont">
          <div className="manageholder">
            <div
              onClick={() => {
                setNext(false);
                cancelSubscription();
              }}
              className="cancelbut"
              id="cancelbut"
            >
              Cancel
            </div>
            <span className="h3">Current Plan Details &nbsp;</span>
            <span className="status">
              {currentlyactive ? "Active" : "Cancelled"}
            </span>
            <p className="currentname">{det.plan ? det.plan : "Cancelled"}</p>
            <p className="currentdevices">
              {det.plan === "Mobile" ? "Phone+Tablet" : "All Devices"}
            </p>
            <p className="currentprice">
              {det.price ? det.price : "Nil"}
              {det.billcycle === "Yearly" ? "/yr" : "/month"}
            </p>
            <Link
              onClick={() => {
                setNext(false);
              }}
              to="/subscribe"
              className="changebut"
            >
              Change Plan
            </Link>{" "}
            <Link to="/watch" className="bluebut">
              Lets Watch
            </Link>
            <p className="currentdate">
              Your subscription has started on {det.date}, 2022 and will auto
              renew in {det.billcycle === "Yearly" ? "1 Year" : "1 month"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Manage;
