// components/CustomerHeader.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/login" },
  { title: "Sign Up", path: "/signup" },
  { title: "Add Restaurant", path: "/restaurant" },
];

export default function CustomerHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Menu
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                borderRadius: 2,
                "&:hover": { bgcolor: "primary.light", color: "white" },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Cart inside drawer (mobile view) */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/cart"
            sx={{
              borderRadius: 2,
              "&:hover": { bgcolor: "primary.light", color: "white" },
            }}
          >
            <ShoppingCartIcon sx={{ mr: 1 }} /> Cart
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar sx={{ mx: { xl: 15, lg: 10, md: 5, xs: 1 } }}>
          {/* Logo */}
          <RestaurantIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Ashes Foodies
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, mr: 1 }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={Link}
                href={item.path}
                sx={{
                  color: "white",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    // backgroundColor: "#00e5e5a4",
                    // border: "2px solid #000000ff",
                    boxShadow: "0 0 7px 4px #ffffffb9",
                    color: "#fff",
                  },
                }}
              >
                {item.title}
              </Button>
            ))}

            {/* Cart with badge */}
            <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // better performance on mobile
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

// // components/CustomerHeader.tsx
// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import RestaurantIcon from "@mui/icons-material/Restaurant";

// const navLinks = [
//   { title: "Home", path: "/" },
//   { title: "Login", path: "/login" },
//   { title: "Sign Up", path: "/signup" },
//   { title: "Cart", path: "/cart" },
//   { title: "Add Restaurant", path: "/add-restaurant" },
// ];

// export default function CustomerHeader() {
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
//       <List>
//         {navLinks.map((item) => (
//           <ListItem key={item.title} disablePadding>
//             <ListItemButton component={Link} href={item.path}>
//               <ListItemText primary={item.title} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
//         <Toolbar>
//           {/* Logo */}
//           <RestaurantIcon sx={{ mr: 1 }} />
//           <Typography
//             variant="h6"
//             component={Link}
//             href="/"
//             sx={{
//               flexGrow: 1,
//               textDecoration: "none",
//               color: "inherit",
//               fontWeight: "bold",
//             }}
//           >
//             CustomerHeader
//           </Typography>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             {navLinks.map((item) => (
//               <Button
//                 key={item.title}
//                 component={Link}
//                 href={item.path}
//                 sx={{ color: "white" }}
//               >
//                 {item.title}
//               </Button>
//             ))}
//           </Box>

//           {/* Mobile Menu Button */}
//           <IconButton
//             color="inherit"
//             edge="end"
//             sx={{ display: { xs: "block", md: "none" } }}
//             onClick={handleDrawerToggle}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Better mobile performance
//         }}
//       >
//         {drawer}
//       </Drawer>
//     </>
//   );
// }
