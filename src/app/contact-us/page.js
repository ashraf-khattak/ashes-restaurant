// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   InputAdornment,
//   CircularProgress,
//   Alert,
//   Grid,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import {
//   Email,
//   Person,
//   Message,
//   Phone,
//   Facebook,
//   Twitter,
//   Instagram,
//   ExpandMore,
// } from "@mui/icons-material";
// import CustomerHeader from "../_components/CustomerHeader";
// import RestaurantFooter from "../_components/RestaurantFooter";

// export default function ContactUs() {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//     setErrors((prev) => ({ ...prev, [field]: "", api: "" }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.name) newErrors.name = "Name is required.";
//     if (!form.email) newErrors.email = "Email is required.";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       newErrors.email = "Invalid email format.";
//     if (!form.message) newErrors.message = "Message cannot be empty.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       // simulate API
//       await new Promise((res) => setTimeout(res, 2000));
//       setForm({ name: "", email: "", phone: "", message: "" });
//       setErrors({ api: "✅ Message sent successfully!" });
//     } catch (error) {
//       setErrors({ api: "❌ Failed to send. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <CustomerHeader />

//       {/* Contact Form Section */}
//       <Box
//         sx={{
//           py: 10,
//           px: 2,
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             p: 5,
//             maxWidth: 1000,
//             mx: "auto",
//             color: "white",
//             backgroundColor: "rgba(13, 13, 18, 0.7)",
//             borderRadius: "16px",
//             boxShadow: "0 0 12px 8px #18ffff5a",
//           }}
//         >
//           <Typography
//             variant="h4"
//             textAlign="center"
//             gutterBottom
//             sx={{
//               background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontWeight: "bold",
//               backgroundSize: "200% auto",
//               animation: "gradient 6s linear infinite",
//               "@keyframes gradient": {
//                 "0%": { backgroundPosition: "0% 50%" },
//                 "50%": { backgroundPosition: "100% 50%" },
//                 "100%": { backgroundPosition: "0% 50%" },
//               },
//             }}
//           >
//             Get In Touch
//           </Typography>
//           <Typography
//             textAlign="center"
//             sx={{ mb: 4, opacity: 0.8, color: "#18FFFF" }}
//           >
//             We'd love to hear from you!
//           </Typography>

//           <Grid container spacing={4}>
//             {/* Form */}
//             <Grid item xs={12} md={7}>
//               <Box component="form" onSubmit={handleSubmit}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   margin="normal"
//                   label="Full Name"
//                   value={form.name}
//                   onChange={(e) => handleChange("name", e.target.value)}
//                   error={!!errors?.name}
//                   helperText={errors?.name}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Person sx={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": { borderColor: "white" },
//                       "&:hover fieldset": { borderColor: "white" },
//                       "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
//                       color: "white",
//                     },
//                     "& .MuiInputLabel-root": { color: "white" },
//                     "& .MuiFormHelperText-root": {
//                       color: errors?.name
//                         ? "#f44336"
//                         : "rgba(255, 255, 255, 0.7)",
//                     },
//                   }}
//                 />
//                 <TextField
//                   fullWidth
//                   size="small"
//                   margin="normal"
//                   label="Email"
//                   value={form.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                   error={!!errors?.email}
//                   helperText={errors?.email}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Email sx={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": { borderColor: "white" },
//                       "&:hover fieldset": { borderColor: "white" },
//                       "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
//                       color: "white",
//                     },
//                     "& .MuiInputLabel-root": { color: "white" },
//                     "& .MuiFormHelperText-root": {
//                       color: errors?.email
//                         ? "#f44336"
//                         : "rgba(255, 255, 255, 0.7)",
//                     },
//                   }}
//                 />
//                 <TextField
//                   fullWidth
//                   size="small"
//                   margin="normal"
//                   label="Phone"
//                   value={form.phone}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Phone sx={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": { borderColor: "white" },
//                       "&:hover fieldset": { borderColor: "white" },
//                       "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
//                       color: "white",
//                     },
//                     "& .MuiInputLabel-root": { color: "white" },
//                   }}
//                 />
//                 <TextField
//                   fullWidth
//                   size="small"
//                   margin="normal"
//                   label="Message"
//                   multiline
//                   rows={4}
//                   value={form.message}
//                   onChange={(e) => handleChange("message", e.target.value)}
//                   error={!!errors?.message}
//                   helperText={errors?.message}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Message sx={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": { borderColor: "white" },
//                       "&:hover fieldset": { borderColor: "white" },
//                       "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
//                       color: "white",
//                     },
//                     "& .MuiInputLabel-root": { color: "white" },
//                     "& .MuiFormHelperText-root": {
//                       color: errors?.message
//                         ? "#f44336"
//                         : "rgba(255, 255, 255, 0.7)",
//                     },
//                   }}
//                 />

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="outlined"
//                   size="large"
//                   disabled={loading}
//                   sx={{
//                     mt: 3,
//                     py: 1.2,
//                     border: "2px solid #18FFFF",
//                     color: "#18FFFF",
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     fontSize: "16px",
//                     boxShadow: "0 0 12px 6px #18ffff54",
//                     "&:hover": {
//                       backgroundColor: "#18FFFF",
//                       color: "#000",
//                       boxShadow: "0 0 18px 8px #18ffffa2",
//                     },
//                     "&.Mui-disabled": {
//                       backgroundColor: "rgba(24, 255, 255, 0.3)",
//                       color: "rgba(0, 0, 0, 0.7)",
//                     },
//                   }}
//                 >
//                   {loading ? (
//                     <CircularProgress size={24} sx={{ color: "#18FFFF" }} />
//                   ) : (
//                     "Send Message"
//                   )}
//                 </Button>

//                 {errors?.api && (
//                   <Alert
//                     severity={errors.api.startsWith("✅") ? "success" : "error"}
//                     sx={{ mt: 2 }}
//                   >
//                     {errors.api}
//                   </Alert>
//                 )}
//               </Box>
//             </Grid>

//             {/* Contact Info */}
//             <Grid item xs={12} md={5}>
//               <Box sx={{ pl: { md: 3 }, pt: { xs: 4, md: 0 } }}>
//                 <Typography variant="h6" fontWeight="bold" gutterBottom>
//                   Contact Information
//                 </Typography>
//                 <Typography sx={{ mb: 1 }}>📍 Islamabad, Pakistan</Typography>
//                 <Typography sx={{ mb: 1 }}>📞 +92 300 1234567</Typography>
//                 <Typography sx={{ mb: 3 }}>
//                   ✉️ support@ashesfoodie.com
//                 </Typography>

//                 <Box sx={{ mt: 4 }}>
//                   <IconButton sx={{ color: "#18FFFF" }}>
//                     <Facebook />
//                   </IconButton>
//                   <IconButton sx={{ color: "#18FFFF" }}>
//                     <Twitter />
//                   </IconButton>
//                   <IconButton sx={{ color: "#18FFFF" }}>
//                     <Instagram />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>

//       {/* Google Map Section */}
//       <Box sx={{ mt: 8 }}>
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.893819139426!2d73.0551!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df957d3edc3df7%3A0x8fcb1e2f1cbbf2bb!2sIslamabad!5e0!3m2!1sen!2s!4v1694574000000!5m2!1sen!2s"
//           width="100%"
//           height="400"
//           style={{ border: 0 }}
//           loading="lazy"
//         ></iframe>
//       </Box>

//       {/* FAQ Section */}
//       <Box sx={{ py: 10, px: 2, backgroundColor: "#0f0f0f", color: "white" }}>
//         <Typography
//           variant="h4"
//           textAlign="center"
//           sx={{ mb: 4, color: "#18FFFF" }}
//         >
//           Frequently Asked Questions
//         </Typography>
//         <Box maxWidth={800} mx="auto">
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMore sx={{ color: "#18FFFF" }} />}
//             >
//               <Typography>What are your delivery hours?</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 We deliver from 10:00 AM to 11:00 PM every day.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMore sx={{ color: "#18FFFF" }} />}
//             >
//               <Typography>Do you offer cash on delivery?</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Yes! You can pay by cash or online payment methods.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMore sx={{ color: "#18FFFF" }} />}
//             >
//               <Typography>How can I track my order?</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Once your order is confirmed, you will get a tracking link by
//                 SMS.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       </Box>

//       {/* CTA Banner */}
//       <Box
//         sx={{
//           py: 6,
//           background: "linear-gradient(90deg, #18FFFF, #7C4DFF)",
//           textAlign: "center",
//           color: "white",
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Hungry? Order your favorite meal now!
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             mt: 2,
//             backgroundColor: "#000",
//             color: "#18FFFF",
//             fontWeight: "bold",
//             "&:hover": { backgroundColor: "#111" },
//           }}
//         >
//           Order Now
//         </Button>
//       </Box>

//       <RestaurantFooter />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Email,
  Person,
  Message,
  LocationOn,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "", api: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.message) newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      // simulate API
      await new Promise((res) => setTimeout(res, 2000));
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({ api: "✅ Message sent successfully!" });
    } catch (error) {
      setErrors({ api: "❌ Failed to send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomerHeader />

      <Box
        sx={{
          py: 10,
          px: 2,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            py: 5,
            px: { xs: 1.5, sm: 2, md: 5 },
            maxWidth: 1000,
            mx: "auto",
            color: "white",
            backgroundColor: "rgba(13, 13, 18, 0.7)",
            borderRadius: "16px",
            boxShadow: "0 0 12px 8px #18ffff5a",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              backgroundSize: "200% auto",
              animation: "gradient 6s linear infinite",
              "@keyframes gradient": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            textAlign="center"
            sx={{ mb: 4, opacity: 0.8, color: "#18FFFF" }}
          >
            We'd love to hear from you!
          </Typography>

          <Grid container spacing={4}>
            {/* Form */}
            <Grid item xs={12} md={7}>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  size="small"
                  margin="normal"
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={!!errors?.name}
                  helperText={errors?.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiFormHelperText-root": {
                      color: errors?.name
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  margin="normal"
                  label="Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!errors?.email}
                  helperText={errors?.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiFormHelperText-root": {
                      color: errors?.email
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  margin="normal"
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  margin="normal"
                  label="Message"
                  multiline
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  error={!!errors?.message}
                  helperText={errors?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Message sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiFormHelperText-root": {
                      color: errors?.message
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.2,
                    border: "2px solid #18FFFF",
                    color: "#18FFFF",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "16px",
                    boxShadow: "0 0 12px 6px #18ffff54",
                    "&:hover": {
                      backgroundColor: "#18FFFF",
                      color: "#000",
                      boxShadow: "0 0 18px 8px #18ffffa2",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(24, 255, 255, 0.3)",
                      color: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#18FFFF" }} />
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {errors?.api && (
                  <Alert
                    severity={errors.api.startsWith("✅") ? "success" : "error"}
                    sx={{ mt: 2 }}
                  >
                    {errors.api}
                  </Alert>
                )}
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <Box sx={{ pl: { md: 3 }, pt: { xs: 4, md: 0 } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  📍 i-10/1, Islamabad, Pakistan
                </Typography>
                <Typography sx={{ mb: 1 }}>📞 +92 300 1234567</Typography>
                <Typography sx={{ mb: 3 }}>
                  ✉️ support@ashesfoodie.com
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <IconButton sx={{ color: "#18FFFF" }}>
                    <Facebook />
                  </IconButton>
                  <IconButton sx={{ color: "#18FFFF" }}>
                    <Twitter />
                  </IconButton>
                  <IconButton sx={{ color: "#18FFFF" }}>
                    <Instagram />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* 🌍 Google Map Section */}
      <Box sx={{ my: 8 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.726606322672!2d73.01885997555696!3d33.68495183936896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df956d1f82c7f9%3A0x98c64c9a3afc2c4c!2si-10%2F1%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1694577000000!5m2!1sen!2s"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      <RestaurantFooter />
    </>
  );
}

// "use client";

// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   CardMedia,
//   IconButton,
//   Stack,
// } from "@mui/material";
// import CustomerHeader from "../_components/CustomerHeader";
// import RestaurantFooter from "../_components/RestaurantFooter";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// export default function ContactUs() {
//   return (
//     <>
//       <CustomerHeader />

//       {/* 🌟 Hero Section */}
//       <Box
//         sx={{
//           textAlign: "center",
//           backgroundImage:
//             "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           color: "white",
//           py: { xs: 12, md: 16 },
//           px: 2,
//         }}
//       >
//         <Typography variant="h3" fontWeight="bold" gutterBottom>
//           Contact Us
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{ maxWidth: 700, mx: "auto", opacity: 0.9 }}
//         >
//           We'd love to hear from you! Whether you have questions, feedback, or
//           collaboration ideas — our team is ready to help.
//         </Typography>
//       </Box>

//       {/* 📩 Form + Info */}
//       <Container sx={{ py: { xs: 8, md: 12 } }}>
//         <Grid container spacing={6}>
//           {/* Contact Form */}
//           <Grid item xs={12} md={7}>
//             <Card
//               sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
//                 overflow: "hidden",
//                 transition: "transform 0.3s",
//                 "&:hover": { transform: "translateY(-6px)" },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 3, md: 5 } }}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Send Us a Message
//                 </Typography>
//                 <Typography color="text.secondary" mb={3}>
//                   Fill in the form and our team will get back to you shortly.
//                 </Typography>

//                 <Box component="form" noValidate autoComplete="off">
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Email Address"
//                     type="email"
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     type="tel"
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Message"
//                     multiline
//                     rows={5}
//                     variant="outlined"
//                     sx={{ mb: 3 }}
//                   />

//                   <Button
//                     fullWidth
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       py: 1.5,
//                       borderRadius: 3,
//                       fontWeight: 600,
//                       fontSize: "16px",
//                       background:
//                         "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
//                       boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
//                       textTransform: "capitalize",
//                       "&:hover": {
//                         background:
//                           "linear-gradient(90deg, #dd2476 0%, #ff512f 100%)",
//                         boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
//                       },
//                     }}
//                   >
//                     Send Message 🚀
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Contact Info */}
//           <Grid item xs={12} md={5}>
//             <Card
//               sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
//                 overflow: "hidden",
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
//                 alt="Restaurant"
//               />
//               <CardContent sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Contact Information
//                 </Typography>

//                 <Stack spacing={2} mt={2}>
//                   <Stack direction="row" alignItems="center" spacing={2}>
//                     <LocationOnIcon color="primary" />
//                     <Typography>Lahore, Pakistan</Typography>
//                   </Stack>
//                   <Stack direction="row" alignItems="center" spacing={2}>
//                     <PhoneIcon color="primary" />
//                     <Typography>+92 300 1234567</Typography>
//                   </Stack>
//                   <Stack direction="row" alignItems="center" spacing={2}>
//                     <EmailIcon color="primary" />
//                     <Typography>support@foodieexpress.com</Typography>
//                   </Stack>
//                   <Stack direction="row" alignItems="center" spacing={2}>
//                     <AccessTimeIcon color="primary" />
//                     <Typography>Mon - Sun: 9:00 AM - 11:00 PM</Typography>
//                   </Stack>
//                 </Stack>

//                 {/* Social Media */}
//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   mt={4}
//                   justifyContent="flex-start"
//                 >
//                   <IconButton color="primary">
//                     <FacebookIcon />
//                   </IconButton>
//                   <IconButton sx={{ color: "#1DA1F2" }}>
//                     <TwitterIcon />
//                   </IconButton>
//                   <IconButton sx={{ color: "#E4405F" }}>
//                     <InstagramIcon />
//                   </IconButton>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* 🗺 Google Map */}
//       <Box sx={{ mt: 6 }}>
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13605.414429781648!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191c0f2ec63ff7%3A0x31a4a6c82f91ac2c!2sLahore!5e0!3m2!1sen!2s!4v1694655949095"
//           width="100%"
//           height="450"
//           style={{ border: 0 }}
//           loading="lazy"
//           allowFullScreen
//         ></iframe>
//       </Box>

//       {/* 🙌 CTA Section */}
//       <Box
//         sx={{
//           py: { xs: 8, md: 12 },
//           textAlign: "center",
//           background:
//             "linear-gradient(135deg, rgba(255,81,47,0.9), rgba(221,36,118,0.9))",
//           color: "white",
//         }}
//       >
//         <Container>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Ready to Taste the Difference? 🍴
//           </Typography>
//           <Typography
//             sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
//             color="rgba(255,255,255,0.9)"
//           >
//             Join thousands of happy customers enjoying fast and fresh food
//             delivery every day.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               bgcolor: "white",
//               color: "primary.main",
//               fontWeight: "bold",
//               px: 4,
//               py: 1.5,
//               borderRadius: 30,
//               "&:hover": { bgcolor: "grey.200" },
//             }}
//           >
//             Order Now
//           </Button>
//         </Container>
//       </Box>

//       <RestaurantFooter />
//     </>
//   );
// }
