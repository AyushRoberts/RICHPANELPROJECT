import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Manage = ({ det, cancelSubscription, user, currentlyactive }) => {
  const n = useNavigate();
  useEffect(() => {
    if (user == "") n("/");
  });
  console.log(user);
  return (
    <>
      {det && (
        <div className="managecont">
          <div className="manageholder">
            <div
              onClick={() => cancelSubscription(user.uid)}
              className="cancelbut"
            >
              Cancel
            </div>
            <span className="h3">Current Plan Details &nbsp;</span>
            <span className="status">
              {currentlyactive ? "Active" : "Cancelled"}
            </span>
            <p className="currentname">{det.plan ? det.plan : "Cancelled"}</p>
            <p className="currentdevices">Phone+Tablet</p>
            <p className="currentprice">
              {det.price ? det.price : "Nil"}
              {det.billcycle === "Yearly" ? "/yr" : "/month"}
            </p>
            <Link to="/subscribe" className="changebut">
              Change Plan
            </Link>
            <p className="currentdate">
              Your subscription has started on Jul 11th, 2022 and will auto
              renew on Jul 12th, 2023
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Manage;
