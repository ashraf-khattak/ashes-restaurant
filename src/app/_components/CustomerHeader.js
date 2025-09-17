"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CustomerHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [details, setDetails] = useState(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else if (data) {
      setDetails(JSON.parse(data));
    }
  }, [pathName]);

  // useEffect(() => {
  //   const data = localStorage.getItem("restaurantUser");
  //   if (!data && pathName === "/restaurant/dashboard") {
  //     router.push("/restaurant");
  //   } else if (data && pathName === "/restaurant") {
  //     router.push("/restaurant/dashboard");
  //   } else if (data) {
  //     setDetails(JSON.parse(data));
  //   }
  // }, [pathName]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // const handleLogout = () => {
  //   localStorage.removeItem("restaurantUser");
  //   router.push("/restaurant");
  //   handleClose();
  //   setMobileOpen(false);
  // };
  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    setDetails(null); // clear user state
    router.push("/restaurant");
    handleClose();
    setMobileOpen(false);
  };
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact-us" },
    { title: "Login", path: "/" },
    { title: "Sign Up", path: "/" },
  ];

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

        {/* Cart in drawer */}
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

      <Divider sx={{ my: 2 }} />

      {/* Auth section for mobile */}
      {!details?.name ? (
        <>
          <Button
            fullWidth
            component={Link}
            href="/restaurant"
            sx={{
              mb: 1,
              borderRadius: 2,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Restaurant Login
          </Button>
        </>
      ) : (
        <>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            {details?.name}
          </Typography>

          {/* ✅ Profile Button (added) */}
          <Button
            fullWidth
            component={Link}
            href="/restaurant/dashboard"
            startIcon={<AccountCircleIcon />}
            sx={{
              mb: 1,
              borderRadius: 2,
              color: "primary.main",
              "&:hover": { bgcolor: "rgba(0,0,255,0.1)" },
            }}
          >
            Dashboard
          </Button>

          {/* Logout */}
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: "error.main",
              "&:hover": { bgcolor: "rgba(255,0,0,0.1)" },
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Box>
  );

  // const drawer = (
  //   <Box sx={{ width: 250, p: 2 }} onClick={handleDrawerToggle}>
  //     <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
  //       Menu
  //     </Typography>
  //     <List>
  //       {navLinks.map((item) => (
  //         <ListItem key={item.title} disablePadding>
  //           <ListItemButton
  //             component={Link}
  //             href={item.path}
  //             sx={{
  //               borderRadius: 2,
  //               "&:hover": { bgcolor: "primary.light", color: "white" },
  //             }}
  //           >
  //             <ListItemText primary={item.title} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}

  //       {/* Cart in drawer */}
  //       <ListItem disablePadding>
  //         <ListItemButton
  //           component={Link}
  //           href="/cart"
  //           sx={{
  //             borderRadius: 2,
  //             "&:hover": { bgcolor: "primary.light", color: "white" },
  //           }}
  //         >
  //           <ShoppingCartIcon sx={{ mr: 1 }} /> Cart
  //         </ListItemButton>
  //       </ListItem>
  //     </List>

  //     <Divider sx={{ my: 2 }} />

  //     {/* Auth section for mobile */}
  //     {!details?.name ? (
  //       <>
  //         <Button
  //           fullWidth
  //           component={Link}
  //           href="/restaurant"
  //           sx={{
  //             mb: 1,
  //             borderRadius: 2,
  //             backgroundColor: "primary.main",
  //             color: "white",
  //             "&:hover": { bgcolor: "primary.dark" },
  //           }}
  //         >
  //           Restaurant Login
  //         </Button>
  //       </>
  //     ) : (
  //       <>
  //         <Typography sx={{ fontWeight: "bold", mb: 1 }}>
  //           {details?.name}
  //         </Typography>
  //         <Button
  //           fullWidth
  //           startIcon={<LogoutIcon />}
  //           onClick={handleLogout}
  //           sx={{
  //             borderRadius: 2,
  //             color: "error.main",
  //             "&:hover": { bgcolor: "rgba(255,0,0,0.1)" },
  //           }}
  //         >
  //           Logout
  //         </Button>
  //       </>
  //     )}
  //   </Box>
  // );

  return (
    <>
      <AppBar
        position="fixed"
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              mr: 1,
              alignItems: "center",
            }}
          >
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
                    boxShadow: "0 0 7px 4px #ffffffb9",
                    color: "#fff",
                  },
                }}
              >
                {item.title}
              </Button>
            ))}

            {/* Cart */}
            <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Auth Section */}
            {!details?.name ? (
              <>
                <Button
                  component={Link}
                  href="/restaurant"
                  sx={{
                    // color: "white",
                    // textTransform: "none",
                    // fontWeight: 500,
                    border: "2px solid #18FFFF",
                    color: "#18FFFF",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "14px",
                    boxShadow: "0 0 5px 4px #ffffff57",
                    textTransform: "capitalize",
                    // "&:hover": {
                    //   backgroundColor: loading
                    //     ? "rgba(24, 255, 255, 0.7)"
                    //     : "#00e5e5",
                    //   border: "2px solid #000000ff",
                    //   boxShadow: "0 0 9px 6px #ffffffb9",
                    //   color: "#000",
                    // },
                    // color: "white",
                    // fontWeight: 500,
                    // textTransform: "none",
                    // borderRadius: 2,
                    px: 1,
                    py: 0.1,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      boxShadow: "0 0 7px 4px #ffffffb9",
                      color: "#fff",
                    },
                  }}
                >
                  Restaurant Login
                </Button>
              </>
            ) : (
              <Box
                onClick={handleProfileClick}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  // px: 1.5,
                  py: 0.8,
                  // borderRadius: "30px",
                  // background: "rgba(255,255,255,0.15)",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "&:hover": { background: "rgba(255,255,255,0.25)" },
                  color: "white",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    boxShadow: "0 0 7px 4px #ffffffb9",
                    color: "#fff",
                  },
                }}
              >
                <Avatar
                  alt={details.name}
                  src={details?.avatar || "/profile.png"}
                  sx={{
                    width: 24,
                    height: 24,
                    border: "2px solid white",
                    mr: 1,
                    fontSize: "14px",
                  }}
                />
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    mr: 0.5,
                    fontSize: "14px",
                  }}
                >
                  {details?.name}
                </Typography>
                <ExpandMoreIcon sx={{ color: "white" }} />
              </Box>
            )}

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: { borderRadius: 2, mt: 1, minWidth: 160 },
              }}
            >
              <MenuItem component={Link} href="/restaurant/dashboard">
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

///////////copy new//////////////
// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
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
//   Badge,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   ListItemIcon,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// export default function CustomerHeader() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [user, setUser] = useState(null); // customer details
//   const [details, setDetails] = useState(null);
//   const router = useRouter();
//   const pathName = usePathname();

//   // Load user from localStorage
//   // useEffect(() => {
//   //   const data = localStorage.getItem("customerUser");
//   //   if (data) {
//   //     setUser(JSON.parse(data));
//   //   } else {
//   //     setUser(null);
//   //   }
//   // }, [pathName]);
//   useEffect(() => {
//     const data = localStorage.getItem("restaurantUser");
//     if (!data && pathName === "/restaurant/dashboard") {
//       router.push("/restaurant");
//     } else if (data && pathName === "/restaurant") {
//       router.push("/restaurant/dashboard");
//     } else if (data) {
//       setDetails(JSON.parse(data));
//     }
//   }, [pathName, router]);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleLogout = () => {
//     localStorage.removeItem("restaurantUser");
//     router.push("/restaurant");
//     handleClose();
//     setMobileOpen(false);
//     // localStorage.removeItem("customerUser");
//     // setUser(null);
//     // setAnchorEl(null);
//     // router.push("/login"); // redirect after logout
//   };

//   const navLinks = [
//     { title: "Home", path: "/" },
//     { title: "Add Restaurant", path: "/restaurant" },
//     { title: "Login", path: "/" },
//     { title: "Sign Up", path: "/" },
//   ];

//   const drawer = (
//     <Box sx={{ width: 250, p: 2 }} onClick={handleDrawerToggle}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//         Menu
//       </Typography>
//       <List>
//         {navLinks.map((item) => (
//           <ListItem key={item.title} disablePadding>
//             <ListItemButton
//               component={Link}
//               href={item.path}
//               sx={{
//                 borderRadius: 2,
//                 "&:hover": { bgcolor: "primary.light", color: "white" },
//               }}
//             >
//               <ListItemText primary={item.title} />
//             </ListItemButton>
//           </ListItem>
//         ))}

//         {/* Cart in drawer */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             href="/cart"
//             sx={{
//               borderRadius: 2,
//               "&:hover": { bgcolor: "primary.light", color: "white" },
//             }}
//           >
//             <ShoppingCartIcon sx={{ mr: 1 }} /> Cart
//           </ListItemButton>
//         </ListItem>
//       </List>

//       <Divider sx={{ my: 2 }} />

//       {/* Auth section for mobile */}
//       {!details?.name ? (
//         <>
//           <Button
//             fullWidth
//             component={Link}
//             href="/restaurant"
//             sx={{
//               mb: 1,
//               borderRadius: 2,
//               backgroundColor: "primary.main",
//               color: "white",
//               "&:hover": { bgcolor: "primary.dark" },
//             }}
//           >
//             Restaurant Login
//           </Button>
//           {/* <Button
//             fullWidth
//             component={Link}
//             href="/signup"
//             variant="outlined"
//             sx={{
//               borderRadius: 2,
//               borderColor: "primary.main",
//               color: "primary.main",
//               "&:hover": { bgcolor: "primary.light", color: "white" },
//             }}
//           >
//             Sign Up
//           </Button> */}
//         </>
//       ) : (
//         <>
//           <Typography sx={{ fontWeight: "bold", mb: 1 }}>
//             {details?.name}
//           </Typography>
//           <Button
//             fullWidth
//             startIcon={<LogoutIcon />}
//             onClick={handleLogout}
//             sx={{
//               borderRadius: 2,
//               color: "error.main",
//               "&:hover": { bgcolor: "rgba(255,0,0,0.1)" },
//             }}
//           >
//             Logout
//           </Button>
//         </>
//       )}
//     </Box>
//   );

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           background:
//             "linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//         }}
//       >
//         <Toolbar sx={{ mx: { xl: 15, lg: 10, md: 5, xs: 1 } }}>
//           {/* Logo */}
//           <RestaurantIcon sx={{ mr: 1, fontSize: 28 }} />
//           <Typography
//             variant="h6"
//             component={Link}
//             href="/"
//             sx={{
//               flexGrow: 1,
//               textDecoration: "none",
//               color: "inherit",
//               fontWeight: "bold",
//               letterSpacing: 1,
//             }}
//           >
//             Ashes Foodies
//           </Typography>

//           {/* Desktop Menu */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 1,
//               mr: 1,
//               alignItems: "center",
//             }}
//           >
//             {navLinks.map((item) => (
//               <Button
//                 key={item.title}
//                 component={Link}
//                 href={item.path}
//                 sx={{
//                   color: "white",
//                   fontWeight: 500,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   px: 2,
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                     boxShadow: "0 0 7px 4px #ffffffb9",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 {item.title}
//               </Button>
//             ))}

//             {/* Cart */}
//             <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
//               <Badge badgeContent={3} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>

//             {/* Auth Section */}
//             {!details?.name ? (
//               <>
//                 <Button
//                   component={Link}
//                   href="/restaurant"
//                   sx={{
//                     color: "white",
//                     textTransform: "none",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Restaurant Login
//                 </Button>
//               </>
//             ) : (
//               <Box
//                 onClick={handleProfileClick}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                   px: 1.5,
//                   py: 0.5,
//                   borderRadius: "30px",
//                   background: "rgba(255,255,255,0.15)",
//                   "&:hover": { background: "rgba(255,255,255,0.25)" },
//                 }}
//               >
//                 <Avatar
//                   alt={details.name}
//                   src={user?.avatar || "/profile.png"}
//                   sx={{
//                     width: 34,
//                     height: 34,
//                     border: "2px solid white",
//                     mr: 1,
//                   }}
//                 />
//                 <Typography sx={{ color: "white", fontWeight: 500, mr: 0.5 }}>
//                   {details?.name}
//                 </Typography>
//                 <ExpandMoreIcon sx={{ color: "white" }} />
//               </Box>
//             )}

//             {/* Dropdown Menu */}
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//               transformOrigin={{ vertical: "top", horizontal: "right" }}
//               PaperProps={{
//                 sx: { borderRadius: 2, mt: 1, minWidth: 160 },
//               }}
//             >
//               <MenuItem component={Link} href="/profile">
//                 <ListItemIcon>
//                   <AccountCircleIcon fontSize="small" />
//                 </ListItemIcon>
//                 Profile
//               </MenuItem>
//               <Divider />
//               <MenuItem onClick={handleLogout}>
//                 <ListItemIcon>
//                   <LogoutIcon fontSize="small" color="error" />
//                 </ListItemIcon>
//                 Logout
//               </MenuItem>
//             </Menu>
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
//         ModalProps={{ keepMounted: true }}
//       >
//         {drawer}
//       </Drawer>
//     </>
//   );
// }

////////////////////////////////
/////// Old one ////////////////
///////////////////////////

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
//   Badge,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const navLinks = [
//   { title: "Home", path: "/" },
//   { title: "Login", path: "/login" },
//   { title: "Sign Up", path: "/signup" },
//   { title: "Add Restaurant", path: "/restaurant" },
// ];

// export default function CustomerHeader() {
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box sx={{ width: 250, p: 2 }} onClick={handleDrawerToggle}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//         Menu
//       </Typography>
//       <List>
//         {navLinks.map((item) => (
//           <ListItem key={item.title} disablePadding>
//             <ListItemButton
//               component={Link}
//               href={item.path}
//               sx={{
//                 borderRadius: 2,
//                 "&:hover": { bgcolor: "primary.light", color: "white" },
//               }}
//             >
//               <ListItemText primary={item.title} />
//             </ListItemButton>
//           </ListItem>
//         ))}

//         {/* Cart inside drawer (mobile view) */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             href="/cart"
//             sx={{
//               borderRadius: 2,
//               "&:hover": { bgcolor: "primary.light", color: "white" },
//             }}
//           >
//             <ShoppingCartIcon sx={{ mr: 1 }} /> Cart
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           background:
//             "linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, #6a11cb 70%, #2574fce1 100%)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//         }}
//       >
//         <Toolbar sx={{ mx: { xl: 15, lg: 10, md: 5, xs: 1 } }}>
//           {/* Logo */}
//           <RestaurantIcon sx={{ mr: 1, fontSize: 28 }} />
//           <Typography
//             variant="h6"
//             component={Link}
//             href="/"
//             sx={{
//               flexGrow: 1,
//               textDecoration: "none",
//               color: "inherit",
//               fontWeight: "bold",
//               letterSpacing: 1,
//             }}
//           >
//             Ashes Foodies
//           </Typography>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, mr: 1 }}>
//             {navLinks.map((item) => (
//               <Button
//                 key={item.title}
//                 component={Link}
//                 href={item.path}
//                 sx={{
//                   color: "white",
//                   fontWeight: 500,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   px: 2,
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                     // backgroundColor: "#00e5e5a4",
//                     // border: "2px solid #000000ff",
//                     boxShadow: "0 0 7px 4px #ffffffb9",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 {item.title}
//               </Button>
//             ))}

//             {/* Cart with badge */}
//             <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
//               <Badge badgeContent={3} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
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
//           keepMounted: true, // better performance on mobile
//         }}
//       >
//         {drawer}
//       </Drawer>
//     </>
//   );
// }
