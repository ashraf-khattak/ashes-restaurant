// components/CustomerFooter.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/login" },
  { title: "Sign Up", path: "/signup" },
  { title: "Cart", path: "/cart" },
  { title: "Add Restaurant", path: "/restaurant" },
];

export default function RestaurantFooter() {
  return (
    <Box
      // component="footer"
      sx={{
        // mt: 5,
        // bgcolor: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)",
        // background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)",
        background:
          "linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)",
        color: "white",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Logo + Info */}
          <Grid item xs={12} md={2}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <RestaurantIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" fontWeight="bold">
                Foodies
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, width: "40%" }}>
              Your one-stop place for exploring and adding amazing restaurants.
              Fresh, fast, and delicious food experiences!
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            {navLinks.map((item) => (
              <Typography
                key={item.title}
                component={Link}
                href={item.path}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "white",
                  opacity: 0.9,
                  mb: 1,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                {item.title}
              </Typography>
            ))}
          </Grid>

          {/* Social */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Follow Us
            </Typography>
            <Box>
              <IconButton
                sx={{ color: "white", "&:hover": { color: "#1877F2" } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{ color: "white", "&:hover": { color: "#E1306C" } }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            textAlign: "center",
            mt: 5,
            pt: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Foodies. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// import React from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Link,
//   IconButton,
//   Divider,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   LinkedIn,
//   Email,
//   Phone,
//   LocationOn,
// } from "@mui/icons-material";

// const RestaurantFooter = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: "#000",
//         color: theme.palette.primary.contrastText,
//         py: 6,
//         mt: "auto",
//         position: "relative",
//         overflow: "hidden",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "4px",
//           background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
//         },
//       }}
//     >
//       {/* Background decorative elements */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -50,
//           right: -50,
//           width: 200,
//           height: 200,
//           borderRadius: "50%",
//           backgroundColor: theme.palette.primary.light,
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: -30,
//           left: -30,
//           width: 150,
//           height: 150,
//           borderRadius: "50%",
//           backgroundColor: theme.palette.secondary.main,
//           opacity: 0.1,
//           zIndex: 0,
//         }}
//       />

//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//         <Grid container spacing={4}>
//           {/* Company Info */}
//           <Grid item xs={12} md={4}>
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="h4"
//                 component="div"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   textFillColor: "transparent",
//                 }}
//               >
//                 YourCompany
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ opacity: 0.9, lineHeight: 1.6 }}
//               >
//                 Creating innovative solutions for the digital world. We help
//                 businesses grow and thrive in the modern landscape.
//               </Typography>
//             </Box>

//             {/* Contact Info */}
//             <Box sx={{ mb: 3 }}>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                 <Email sx={{ mr: 1, fontSize: 20, opacity: 0.8 }} />
//                 <Link
//                   href="mailto:info@yourcompany.com"
//                   color="inherit"
//                   sx={{
//                     textDecoration: "none",
//                     opacity: 0.9,
//                     "&:hover": { opacity: 1 },
//                   }}
//                 >
//                   info@yourcompany.com
//                 </Link>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                 <Phone sx={{ mr: 1, fontSize: 20, opacity: 0.8 }} />
//                 <Link
//                   href="tel:+1234567890"
//                   color="inherit"
//                   sx={{
//                     textDecoration: "none",
//                     opacity: 0.9,
//                     "&:hover": { opacity: 1 },
//                   }}
//                 >
//                   +1 (234) 567-890
//                 </Link>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <LocationOn sx={{ mr: 1, fontSize: 20, opacity: 0.8 }} />
//                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                   123 Business Street, City, Country
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Quick Links */}
//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
//               Quick Links
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               {["Home", "About", "Services", "Portfolio", "Contact"].map(
//                 (item) => (
//                   <Link
//                     key={item}
//                     href="#"
//                     color="inherit"
//                     sx={{
//                       textDecoration: "none",
//                       opacity: 0.8,
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         opacity: 1,
//                         transform: "translateX(5px)",
//                         color: theme.palette.secondary.light,
//                       },
//                     }}
//                   >
//                     {item}
//                   </Link>
//                 )
//               )}
//             </Box>
//           </Grid>

//           {/* Services */}
//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
//               Services
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               {[
//                 "Web Development",
//                 "Mobile Apps",
//                 "UI/UX Design",
//                 "Consulting",
//                 "Support",
//               ].map((service) => (
//                 <Link
//                   key={service}
//                   href="#"
//                   color="inherit"
//                   sx={{
//                     textDecoration: "none",
//                     opacity: 0.8,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       opacity: 1,
//                       transform: "translateX(5px)",
//                       color: theme.palette.secondary.light,
//                     },
//                   }}
//                 >
//                   {service}
//                 </Link>
//               ))}
//             </Box>
//           </Grid>

//           {/* Newsletter */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
//               Stay Updated
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
//               Subscribe to our newsletter for the latest updates and offers.
//             </Typography>

//             <Box
//               component="form"
//               sx={{
//                 display: "flex",
//                 gap: 1,
//                 flexDirection: isMobile ? "column" : "row",
//               }}
//             >
//               <Box
//                 component="input"
//                 placeholder="Enter your email"
//                 sx={{
//                   flex: 1,
//                   py: 1.5,
//                   px: 2,
//                   border: "none",
//                   borderRadius: 2,
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   color: "white",
//                   fontSize: "14px",
//                   "&:focus": {
//                     outline: "none",
//                     backgroundColor: "rgba(255, 255, 255, 0.15)",
//                   },
//                   "&::placeholder": {
//                     color: "rgba(255, 255, 255, 0.7)",
//                   },
//                 }}
//               />
//               <Box
//                 component="button"
//                 type="submit"
//                 sx={{
//                   py: 1.5,
//                   px: 3,
//                   border: "none",
//                   borderRadius: 2,
//                   backgroundColor: theme.palette.secondary.main,
//                   color: "white",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: theme.palette.secondary.dark,
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 Subscribe
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

//         {/* Bottom Section */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <Typography variant="body2" sx={{ opacity: 0.8 }}>
//             © 2024 YourCompany. All rights reserved.
//           </Typography>

//           {/* Social Media */}
//           <Box sx={{ display: "flex", gap: 1 }}>
//             {[
//               { icon: Facebook, href: "#" },
//               { icon: Twitter, href: "#" },
//               { icon: Instagram, href: "#" },
//               { icon: LinkedIn, href: "#" },
//             ].map((social, index) => (
//               <IconButton
//                 key={index}
//                 href={social.href}
//                 sx={{
//                   color: "white",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: theme.palette.secondary.main,
//                     transform: "translateY(-3px)",
//                   },
//                 }}
//               >
//                 <social.icon />
//               </IconButton>
//             ))}
//           </Box>

//           {/* Additional Links */}
//           <Box sx={{ display: "flex", gap: 3 }}>
//             <Link
//               href="#"
//               color="inherit"
//               sx={{
//                 textDecoration: "none",
//                 opacity: 0.8,
//                 fontSize: "14px",
//                 "&:hover": { opacity: 1 },
//               }}
//             >
//               Privacy Policy
//             </Link>
//             <Link
//               href="#"
//               color="inherit"
//               sx={{
//                 textDecoration: "none",
//                 opacity: 0.8,
//                 fontSize: "14px",
//                 "&:hover": { opacity: 1 },
//               }}
//             >
//               Terms of Service
//             </Link>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default RestaurantFooter;
