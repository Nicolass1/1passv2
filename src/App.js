import React, { useEffect, useState } from "react";
import { db, auth } from "./config/firebase";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const App = () => {
  const [web, setWeb] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  console.log(datas);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/signin");
    }
    getData();
  }, [navigate]);

  const getData = async (e) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const docRef = doc(db, "users", isLoggedIn);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDatas(docSnap.data().passwordArray);
    } else {
      console.log("No such document!");
    }
  };

  const addPassword = async (e) => {
    e.preventDefault();

    try {
      const uid = localStorage.getItem("isLoggedIn");
      const passData = {
        web,
        user: email,
        pass: password,
      };

      const addpass = doc(db, "users", uid);

      await updateDoc(addpass, {
        passwordArray: [...datas, passData],
      });

      window.location.reload();
    } catch (error) {
      console.log("error ocurred", error);
    }
  };

  return (
    <>
      <div className="text-center p-2 mb-4 bg-body-secondary">
        <h2>
          <span className="text-danger">1 - Pass</span> v2
        </h2>
      </div>
      <div className="container ">
        <div className="d-flex justify-content-center mb-4 mt-3">
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add New Password
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="{-1}"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add New Password
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3 mt-3">
                        <label htmlFor="website" className="form-label">
                          Website:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow text-black"
                          placeholder="Enter Your Website"
                          value={web}
                          onChange={(e) => setWeb(e.target.value)}
                        />
                      </div>

                      <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">
                          Username:
                        </label>
                        <input
                          type="email"
                          className="form-control shadow text-black"
                          placeholder="Enter Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">
                          Password:
                        </label>
                        <input
                          type="text"
                          id="form3Example4"
                          className="form-control shadow text-black"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer mx-auto">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addPassword}
                    >
                      Add Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          {datas?.length == 0 ? (
            <h2 className="text-center text-capitalize">
              No Data Found Please Add New Password...
            </h2>
          ) : (
            ""
          )}
          {datas?.map((data, index) => {
            return (
              <>
                <div
                  className="col-sm-6 col-md-4 col-lg-3 mb-2 d-flex"
                  key={index}
                >
                  <div className="card cards l-bg-cherry">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-shopping-cart" />
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">{data.web}</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="">
                          <h5 className="d-flex align-items-center mb-0">
                            Username: {data.user}
                          </h5>
                          <h5 className="d-flex align-items-center mb-0">
                            Password: {data.pass}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
