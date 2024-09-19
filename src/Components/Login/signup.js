import React, { useEffect, useState } from "react";
import axios from "axios";
import { Validate } from "./validate";
import { useNavigate } from "react-router-dom";

import "./login.css";

export const Signup = (props) => {
  const navigate = useNavigate();
  // values
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [num, setNum] = useState();
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const numHandler = (e) => {
    e.preventDefault();
    setNum(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHander = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(Validate({ email, name, password }));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        axios({
          method: "post",
          url: "/signup",
          data: {
            email: email,
            name: name,
            num: num,
            password: password,
          },
        });
        navigate("/");
        props.setIsSignin();
      }
      setSubmitting(false);
    }
  }, [errors]);

  return (
    <>
      <div className="signholder">
        <form className="signupbox" onSubmit={submitHander}>
          <div className="signinTitle">Feed-O-Meter</div>
          <input
            className="signInput"
            type="email"
            placeholder={"email"}
            value={email}
            onChange={emailHandler}
          ></input>
          <input
            className="signInput"
            type="name"
            placeholder={"name"}
            value={name}
            onChange={nameHandler}
          ></input>
          <input
            className="signInput"
            placeholder={"participant number (1~24)"}
            value={num}
            onChange={numHandler}
          ></input>
          <input
            className="signInput"
            type="password"
            placeholder={"password"}
            value={password}
            onChange={passwordHandler}
            autoComplete="on"
          ></input>
          <button className="loginBtn" type="submit">
            Sign up
          </button>
        </form>
        <div className="createAccountbox">
          Already have an account?
          <button onClick={() => props.setIsSignin()}>Sign in</button>
        </div>
      </div>
    </>
  );
};
