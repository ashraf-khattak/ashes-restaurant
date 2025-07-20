"use client";

import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Restaurant = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader />
        <div
          style={{
            marginTop: "40px",
          }}
        >
          <h1>Login/Signup Page</h1>
          {isLogin ? <RestaurantLogin /> : <RestaurantSignUp />}
          <button className="button-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Do not have Account? SignUp"
              : "Already have Account? SignIn"}
          </button>
        </div>
        <RestaurantFooter />
      </div>
    </>
  );
};

export default Restaurant;
