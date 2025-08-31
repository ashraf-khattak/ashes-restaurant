"use client";

import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { Box, Button } from "@mui/material";

const Restaurant = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Box className="container">
        <RestaurantHeader />
        <Box
          sx={{
            my: "20px",
          }}
        >
          {isLogin ? <RestaurantLogin /> : <RestaurantSignUp />}
            </Box>
          <Button className="button-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Do not have Account? SignUp"
              : "Already have Account? SignIn"}
          </Button>
        <RestaurantFooter />
      </Box>
    </>
  );
};

export default Restaurant;
