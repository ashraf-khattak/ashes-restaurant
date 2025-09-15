"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RestaurantFooter from "./_components/RestaurantFooter";
import CustomerHeader from "./_components/CustomerHeader";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // ✅ show 6 initially

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      const res = await fetch(`/api/customer/locations`);
      const data = await res.json();
      if (data.success && data.data) {
        setCities(data.data);
      }
    } catch (err) {
      console.error("Error loading locations:", err);
    }
  };

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/customer`);
      const data = await res.json();
      if (data.success && data.result) {
        setRestaurantList(data.result);
      }
    } catch (err) {
      console.error("Error loading restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset filters
  const handleReset = () => {
    setCity("");
    setQuery("");
    setVisibleCount(6);
  };

  // ✅ Filter restaurants
  const filteredRestaurants = restaurantList.filter((r) => {
    const matchesCity = city
      ? r.city?.toLowerCase() === city.toLowerCase()
      : true;
    const matchesQuery = query
      ? r.name?.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesCity && matchesQuery;
  });

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  return (
    <>
      <CustomerHeader />
      <Box sx={{ minHeight: "80vh" }}>
        {/* Hero Section */}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundImage:
              "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backgroundBlendMode: "multiply",
            color: "white",
            py: { xs: 13, md: 15, lg: 20 },
            px: { xs: 1, sm: 2, md: 10 },
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Find the Best Food Near You 🍴
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Search by city and your favorite restaurants or dishes
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mx: "auto",
              p: 1,
              borderRadius: { xs: 4, md: 8 },
              width: { xs: "100%", md: "60%", lg: "50%" },
              border: "4px solid transparent",
              backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), 
                      linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              backgroundSize: "200% auto",
              animation: "gradientMove 6s linear infinite",
              "@keyframes gradientMove": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
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
                width: { xs: "100%", md: "60%" },
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

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
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
                width: { xs: "100%", md: "25%" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
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

            {/* Reset Button */}
            <Tooltip title="Reset Filters">
              <IconButton
                onClick={handleReset}
                color="primary"
                sx={{ ml: { xs: 0, md: 0.2 }, mt: { xs: 2, md: 0 } }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Restaurants List */}
        <Box
          sx={{
            display: "grid",
            minHeight: "75vh",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
            px: { xs: 2, md: 6 },
            py: 6,
            textAlign: "center",
          }}
        >
          {loading ? (
            <Box sx={{ gridColumn: "1 / -1", py: 6 }}>
              <CircularProgress size={40} sx={{ color: "#7C4DFF" }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Loading restaurants...
              </Typography>
            </Box>
          ) : visibleRestaurants.length > 0 ? (
            <>
              {visibleRestaurants.map((restaurant) => (
                <Card
                  key={restaurant._id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      // transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.75)",
                    },
                  }}
                >
                  {/* Restaurant Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      restaurant.image ||
                      "https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?w=1480"
                    }
                    alt={restaurant.name}
                    sx={{ objectFit: "cover" }}
                  />

                  {/* Details */}
                  <CardContent sx={{ textAlign: "left" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: "#333" }}
                      >
                        {restaurant.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        ⭐{" "}
                        <Typography variant="body2">
                          {restaurant.rating || "4.5"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {restaurant.contact && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          📞 {restaurant.contact}
                        </Typography>
                      )}
                      {restaurant.email && (
                        <Typography
                          variant="caption"
                          sx={{
                            display: "inline-block",
                            mt: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "20px",
                            backgroundColor: "#18FFFF22",
                            color: "#00796B",
                            fontWeight: 500,
                          }}
                        >
                          {restaurant.email}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      📍 {restaurant.address}, {restaurant.city}
                    </Typography>

                    {restaurant.cuisine && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "inline-block",
                          mt: 1,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "20px",
                          backgroundColor: "#18FFFF22",
                          color: "#00796B",
                          fontWeight: 500,
                        }}
                      >
                        {restaurant.cuisine}
                      </Typography>
                    )}

                    <Box sx={{ mt: 2, textAlign: "right" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          my: 1,
                          px: 2,
                          py: 0.5,
                          border: "2px solid #18FFFF",
                          color: "#18FFFF",
                          borderRadius: 2,
                          fontWeight: 600,
                          fontSize: "14px",
                          background:
                            "linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          textTransform: "capitalize",
                          "&:hover": {
                            backgroundColor: "#00e5e5",
                            border: "2px solid #000000ff",
                            boxShadow: "0 0 9px 6px #5a5757b9",
                            color: "#ffffffff",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* View More Button */}
              {visibleCount < filteredRestaurants.length && (
                <Box sx={{ gridColumn: "1 / -1", mt: 4 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={
                      () => setVisibleCount((prev) => prev + 6) // show 6 more
                    }
                    sx={{
                      my: 3,
                      px: 1,
                      py: 1,
                      width: { xs: "80%", md: "25%" },
                      color: "#18FFFF",
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "16px",
                      border: "3px solid #18FFFF",
                      // boxShadow: "0 0 10px 7px #18FFFF",
                      background:
                        "linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#00e5e5",
                        border: "3px solid #000000ff",
                        boxShadow: "0 0 9px 6px #5a5757b9",
                        color: "#ffffffff",
                      },
                    }}
                  >
                    {" "}
                    View More
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{ gridColumn: "1 / -1", textAlign: "center", mt: 4 }}
            >
              No restaurants found 🍽️
            </Typography>
          )}
        </Box>
      </Box>
      <RestaurantFooter />
    </>
  );
}
