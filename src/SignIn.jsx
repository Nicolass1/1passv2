import React, { useState } from "react";
import { db, auth, provider } from "./config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } catch (error) {
      setError("Wrong Credentials");
      setEmail("");
      setPassword("");
    }
  };

  const GoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;
      const dName = user.displayName;
      const uEmail = user.email;
      localStorage.setItem("isLoggedIn", uid);

      const userProfile = {
        uid,
        email: uEmail,
        name: dName,
        passwordArray: [],
      };

      await setDoc(doc(db, "users", uid), userProfile);
      navigate("/");
    } catch (error) {
      setError("Wrong Credentials");
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
              The best place to
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Store All Your Passwords.
              </span>
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
                <form className="login_form" autoComplete="off">
                  {error && (
                    <div className="text-white text-bg-danger p-1 mb-2 rounded-5 text-center">
                      {error}
                    </div>
                  )}
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
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
                    onClick={handleSignIn}
                  >
                    Sign In...
                  </button>
                  <button
                    type="submit"
                    className="btn btn-block w-100 shadow btn4"
                    onClick={GoogleSignIn}
                  >
                    <span className="mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-google"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                      </svg>
                    </span>
                    Login With Google
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

export default SignIn;
