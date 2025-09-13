"use client";

// import { Box, Typography } from "@mui/material";
import RestaurantHeader from "./_components/RestaurantHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import CustomerHeader from "./_components/CustomerHeader";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const cities = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"];

export default function Home() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("City:", city, "Query:", query);
    // later connect with API
  };

  return (
    <>
      <CustomerHeader />
      <Box sx={{ minHeight: "80vh" }}>
        <Box
          sx={{
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
          {/* Heading */}
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Find the Best Food Near You 🍴
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Search by city and your favorite restaurants or dishes
          </Typography>

          {/* Search Bar Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mx: "auto",
              p: 1,
              borderRadius: { xs: 4, md: 8 },
              width: { xs: "100%", md: "40%" },

              // gradient border with animation
              border: "4px solid transparent",
              backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), 
                      linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              backgroundSize: "200% auto", // important for animation
              animation: "gradientMove 6s linear infinite",

              "@keyframes gradientMove": {
                "0%": {
                  backgroundPosition: "0% 50%",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                },
                "100%": {
                  backgroundPosition: "0% 50%",
                },
              },
            }}
          >
            {/* <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mx: "auto",
              background: "rgba(255,255,255,0.9)",
              p: 1,
              borderRadius: { xs: 4, md: 8 },
              width: { xs: "100%", md: "40%" },

              // gradient border fix 👇
              border: "4px solid transparent",
              backgroundImage: `linear-gradient(white, white), 
                      linear-gradient(90deg, #6a11cb 0%, #18FFFF 100%)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              // backgroundClip: "text",
              // textFillColor: "transparent",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              // fontWeight: "bold",
              // backgroundSize: "200% auto",
              animation: "gradient 6s linear infinite",
              "@keyframes gradient": {
                "0%": {
                  backgroundPosition: "0% 50%",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                },
                "100%": {
                  backgroundPosition: "0% 50%",
                },
              },
            }}
          > */}
            {/* <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mx: "auto",
              background: "rgba(255,255,255,0.9)",
              border:
                `2px solid linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)`,
              p: 1,
              borderRadius: { xs: 4, md: 8 },
              width: { xs: "100%", md: "40%" },
            }}
          > */}
            {/* Search Input */}
            <TextField
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food or restaurant..."
              variant="outlined"
              sx={{
                flex: 1,
                width: { xs: "100%", md: "70%" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Divider only visible on desktop */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                mx: 1,
                bgcolor: "#ddd",
              }}
            />
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                display: { xs: "block", md: "none" },
                mx: 1,
                bgcolor: "#ddd",
              }}
            />

            {/* Dropdown for City */}

            <TextField
              select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
              size="small"
              label="Select City"
              sx={{
                width: { xs: "100%", md: "30%" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" }, // remove border
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "none" },
                  borderRadius: 2,
                },
              }}
            >
              {cities.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>
      <RestaurantFooter />
    </>
  );
}
