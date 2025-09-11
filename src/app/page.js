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
            py: { xs: 6, md: 10 },
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
              background: "rgba(255,255,255,0.9)",
              border: "1px solid #FFF",
              p: 1,
              borderRadius: 8,
              width: { xs: "100%", md: "40%" },
            }}
          >
            {/* Search Input */}
            <TextField
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food or restaurant..."
              variant="outlined"
              sx={{
                flex: 1,
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
