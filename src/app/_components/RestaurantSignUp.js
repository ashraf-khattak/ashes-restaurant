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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Restaurant,
  LocationCity,
  Home,
  Phone,
} from "@mui/icons-material";

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    city: "",
    address: "",
    contact: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    // Clear specific field error and API error when user starts typing
    if (errors[field] || errors.api) {
      setErrors({ ...errors, [field]: "", api: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 3)
      newErrors.password = "Password must be at least 3 characters.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.name) newErrors.name = "Restaurant name is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.address) newErrors.address = "Address is required.";

    if (!formData.contact) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10,15}$/.test(formData.contact))
      newErrors.contact = "Contact must be 10–15 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    // const response = await fetch("http://localhost:3000/api/restaurant", {
    const response = await fetch("/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      const { result: user } = result;
      delete user.password;
      localStorage.setItem("restaurantUser", JSON.stringify(user));
      router.push("/restaurant/dashboard");
    } else {
      setErrors({ api: result.message || "Registration failed." });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Define form fields configuration
  const formFields = [
    {
      id: "name",
      label: "Restaurant Name",
      type: "text",
      icon: <Restaurant sx={{ color: "white" }} />,
      gridProps: {},
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      icon: <Email sx={{ color: "white" }} />,
      gridProps: {},
    },
    {
      id: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      icon: <Lock sx={{ color: "white" }} />,
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
      gridProps: {},
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: showConfirmPassword ? "text" : "password",
      icon: <Lock sx={{ color: "white" }} />,
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowConfirmPassword}
            edge="end"
            sx={{ color: "white" }}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
      gridProps: {},
    },
    {
      id: "city",
      label: "City",
      type: "text",
      icon: <LocationCity sx={{ color: "white" }} />,
      gridProps: {},
    },
    {
      id: "contact",
      label: "Contact Number",
      type: "text",
      icon: <Phone sx={{ color: "white" }} />,
      gridProps: {},
    },
    {
      id: "address",
      label: "Full Address",
      type: "text",
      icon: <Home sx={{ color: "white" }} />,
      gridProps: { xs: "1 / -1", md: "1 / -1" },
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        backgroundImage:
          "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        color: "white",
        // opacity: .5,
        backgroundColor: "#362c2ce9",
        borderRadius: "16px",
        boxShadow:
          "0 10px 30px rgba(197, 51, 180, 0.2), 0 6px 10px rgba(0, 0, 0, 0.15)",
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
        Welcome to Restaurant
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{
          color: "#18FFFF",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Sign Up
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {formFields.map((field) => (
          <TextField
            key={field.id}
            label={field.label}
            type={field.type}
            value={formData[field.id]}
            onChange={handleChange(field.id)}
            error={!!errors[field.id]}
            helperText={errors[field.id]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{field.icon}</InputAdornment>
              ),
              endAdornment: field.endAdornment || null,
            }}
            sx={{
              gridColumn: field.gridProps || {},
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
                color: errors[field.id]
                  ? "#f44336"
                  : "rgba(255, 255, 255, 0.7)",
              },
            }}
          />
        ))}

        {errors.api && (
          <Alert
            severity="error"
            sx={{
              gridColumn: "1 / -1",
              mt: 1,
              "& .MuiAlert-message": { color: "white" },
            }}
          >
            {errors.api}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            gridColumn: "1 / -1",
            mt: 2,
            py: 1.5,
            backgroundColor: "#18FFFF",
            color: "black",
            fontWeight: "bold",
            // width: "50%",
            "&:hover": {
              backgroundColor: "#00e5e5",
              // transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Create Account
        </Button>
      </Box>
    </Paper>
  );
};

export default RestaurantSignUp;
