import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Auth from "./components/Auth";
import Manage from "./components/Manage";
import Subscribe from "./components/Subscribe";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import "./mediaqueries.css";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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
function App() {
  const [user, setUser] = useState("");
  const [currentlyactive, setcurrentlyactive] = useState(false);
  const [un, setun] = useState("");
  const n = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [det, setDet] = useState();
  const [next, setNext] = useState(false);
  useEffect(() => {
    if (user != "" && user) {
      setun(user.uid);
    }
    if (user && !currentlyactive) {
      n("/subscribe", { replace: true });
    }
    if (user && currentlyactive) n("/manage");
    const db = getDatabase(app);
    const updatedata = (data) => setDet(data);
    const getdet = ref(db, "subscriptions/" + un);
    onValue(getdet, (snapshot) => {
      const data = snapshot.val();
      if (data) setSubscribed(true);
      if (data && data.active == true) setcurrentlyactive(true);
      else if (data && data.active == false) setcurrentlyactive(false);
      setDet(data);
    });
  });
  const cancelSubscription = (userId) => {
    const db = getDatabase(app);
    set(ref(db, "subscriptions/" + userId), {
      active: false,
    });
    setSubscribed(false);
    document.getElementsByClassName("status")[0].classList.add("cancelled");
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth user={user} setUser={setUser} />} />
        <Route
          path="/subscribe"
          element={
            <Subscribe
              setNext={setNext}
              next={next}
              setUser={setUser}
              user={user}
            />
          }
        />
        <Route
          path="/manage"
          element={
            <Manage
              setNext={setNext}
              next={next}
              user={user}
              det={det}
              cancelSubscription={cancelSubscription}
              currentlyactive={currentlyactive}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
