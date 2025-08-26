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
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
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

    const res = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, login: true }),
    });

    const result = await res.json();

    if (result.success) {
      const { result: user } = result;
      delete user.password;
      localStorage.setItem("restaurantUser", JSON.stringify(user));
      router.push("/restaurant/dashboard");
    } else {
      setErrors({ api: result.message || "Login failed. Please try again." });
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
        // background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
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

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
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
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
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
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errors.api && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.api}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default RestaurantLogin;

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Box, Typography } from "@mui/material";

// const RestaurantLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   const validateForm = () => {
//     const newErrors = {};

//     if (!email) newErrors.email = "Email is required.";
//     else if (!/\S+@\S+\.\S+/.test(email))
//       newErrors.email = "Invalid email format.";

//     if (!password) newErrors.password = "Password is required.";
//     else if (password.length < 3)
//       newErrors.password = "Password must be at least 3 characters.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isValid = validateForm();
//     if (!isValid) return;

//     const res = await fetch("http://localhost:3000/api/restaurant", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, login: true }),
//     });

//     const result = await res.json();

//     if (result.success) {
//       const { result: user } = result;
//       delete user.password;
//       localStorage.setItem("restaurantUser", JSON.stringify(user));
//       router.push("/restaurant/dashboard");
//     } else {
//       setErrors({ api: result.message || "Login failed. Please try again." });
//     }
//   };

//   return (
//     <Box>
//       <Typography
//         variant="h5"
//         component="h2"
//         gutterBottom
//         color="textSecondary"
//       >
//         Welcome back
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="Email"
//             className="input-field"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setErrors((prev) => ({ ...prev, email: "", api: "" }));
//             }}
//           />
//           {errors.email && <span className="error-text">{errors.email}</span>}
//         </div>

//         <div className="input-wrapper">
//           <input
//             type="password"
//             placeholder="Password"
//             className="input-field"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setErrors((prev) => ({ ...prev, password: "", api: "" }));
//             }}
//           />
//           {errors.password && (
//             <span className="error-text">{errors.password}</span>
//           )}
//         </div>

//         {errors.api && (
//           <div className="input-wrapper">
//             <span className="error-text">{errors.api}</span>
//           </div>
//         )}

//         <div className="input-wrapper">
//           <button type="submit" className="button">
//             Login
//           </button>
//         </div>
//         {/* <div className="input-wrapper">
//           <button type="submit" className="button">
//             Login
//           </button>
//         </div> */}
//       </form>

//       <style jsx>{`
//         .error-text {
//           color: red;
//           font-size: 13px;
//           margin-top: 5px;
//           display: block;
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default RestaurantLogin;
