"use client";

import { Box, Typography } from "@mui/material";
import RestaurantHeader from "./_components/RestaurantHeader";
import RestaurantFooter from "./_components/RestaurantFooter";

export default function Home() {
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <RestaurantHeader />
        <Typography>Welcome to restaurant App</Typography>
        <RestaurantFooter />
      </Box>
    </>
  );
}
