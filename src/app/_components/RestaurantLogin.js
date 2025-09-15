"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 3)
      newErrors.password = "Password must be at least 3 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;
    setLoading(true); // Set loading to true when submission starts
    try {
      // const res = await fetch("http://localhost:3000/api/restaurant", {
      const response = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, login: true }),
      });

      const result = await response.json();

      if (result.success) {
        const { result: user } = result;
        delete user.password;
        localStorage.setItem("restaurantUser", JSON.stringify(user));
        router.push("/restaurant/dashboard");
      } else {
        setErrors({ api: result.message || "Login failed. Please try again." });
      }
    } catch (error) {
      setErrors({ api: "An error occurred. Please try again." });
    } finally {
      setLoading(false); // Set loading to false when submission completes
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        color: "white",
        backgroundColor: "rgba(13, 13, 18, 0.54)",
        borderRadius: "16px",
        boxShadow: "0 0 10px 10px #ffffff57",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{
          background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          backgroundSize: "200% auto",
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
      >
        Welcome back
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{
          color: "#18FFFF",
          fontWeight: "bold",
        }}
      >
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "", api: "" }));
            }}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#18FFFF",
                },
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiFormHelperText-root": {
                color: errors.email ? "#f44336" : "rgba(255, 255, 255, 0.7)",
              },
            }}
          />

          <TextField
            fullWidth
            size="small"
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "", api: "" }));
            }}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#18FFFF",
                },
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiFormHelperText-root": {
                color: errors.password ? "#f44336" : "rgba(255, 255, 255, 0.7)",
              },
            }}
          />
          {/* 
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={loading} // Disable button when loading
            sx={{
              mt: 3,
              mb: 2,
              py: 0.5,
              width: "50%",
              borderRadius: 8,
              backgroundColor: loading ? "rgba(24, 255, 255, 0.7)" : "#18FFFF", // Change color when loading
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: loading
                  ? "rgba(24, 255, 255, 0.7)"
                  : "#00e5e5",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(24, 255, 255, 0.5)",
                color: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#18FFFF" }} /> // Show spinner when loading
            ) : (
              "Login"
            )}
          </Button> */}
        </Box>
        <Button
          type="submit"
          variant="outlined"
          size="small"
          disabled={loading} // Disable button when loading
          sx={{
            gridColumn: "1 / -1",
            my: 3,
            px: 2,
            py: 1,
            width: "75%",
            border: "2px solid #18FFFF",
            color: "#18FFFF",
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 0 10px 7px #ffffff57",
            "&:hover": {
              backgroundColor: loading ? "rgba(24, 255, 255, 0.7)" : "#00e5e5",
              border: "2px solid #000000ff",
              boxShadow: "0 0 9px 6px #ffffffb9",
              color: "#000",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(24, 255, 255, 0.5)",
              color: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#18FFFF" }} /> // Show spinner when loading
          ) : (
            "Login"
          )}
        </Button>
        {errors.api && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.api}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default RestaurantLogin;
