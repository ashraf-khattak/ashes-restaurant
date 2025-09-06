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
            // p: 4,
            // maxWidth: 1000,
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            backgroundImage:
              "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(214, 214, 218, 0.8)",
          }}
        >
          <Box
            sx={
              {
                // my: "20px",
                // border: "1px solid red",
              }
            }
          >
            {isLogin ? <RestaurantLogin /> : <RestaurantSignUp />}
          </Box>
          <Button
            className="button-link"
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              color: "#fff",
            }}
          >
            {isLogin
              ? "Do not have Account? SignUp"
              : "Already have Account? SignIn"}
          </Button>
        </Box>

        <RestaurantFooter />
      </Box>
    </>
  );
};

export default Restaurant;
