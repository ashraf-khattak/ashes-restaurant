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
        {/* <Box
          sx={{
            p: 1,
            // maxWidth: 1000,
            minHeight: "80vh",
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
        > */}
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundImage:
              "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backgroundBlendMode: "Multiply",
            color: "white",
            py: { xs: 6, md: 15 },
            px: { xs: 1, sm: 2, md: 10 },
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
            variant="outlined"
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              color: "#ce16efff",
              mt: 2,
              border: "transparent",
              backgroundColor: "rgba(214, 214, 218, 0.8)",
              alignItems: "left",
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
