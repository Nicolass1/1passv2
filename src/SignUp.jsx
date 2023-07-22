import React, { useState } from "react";
import { db, auth } from "./config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pnum, setPnum] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      const uid = user.uid;

      const userProfile = {
        uid,
        email,
        name: displayName,
        contact: pnum,
        pass: password,
      };

      await setDoc(doc(db, "users", uid), userProfile);
      navigate("/datasofusersbydp");
      localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      console.log("error ocurred", error);
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden d-flex">
      <div className="container px-4 px-md-5 text-center text-lg-start full-height-container d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div
            className="col-md-6 mb-2 mb-lg-0 d-flex justify-coontent-center align-items-center"
            style={{ zIndex: 10 }}
          >
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Create A
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>New Account.</span>
            </h1>
          </div>
          <div className="col-md-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            />
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            />
            <div className="card glass-container shadow-lg">
              <div className="card-body p-4">
                <form
                  className="login_form"
                  onSubmit={handleSignup}
                  autoComplete="off"
                >
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control shadow"
                      placeholder="Enter User's Full Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control shadow"
                      placeholder="Enter Phone Number"
                      value={pnum}
                      onChange={(e) => setPnum(e.target.value)}
                    />
                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control shadow"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control shadow"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-100 shadow btn3"
                  >
                    Create New Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
