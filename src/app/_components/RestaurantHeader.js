"use client";

import Link from "next/link";
import styles from "../restaurant/RestaurantHeader.module.css";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Restaurant from "../restaurant/page";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []); // <-- empty dependency array
  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            src="/next.svg" // Replace with your actual logo path
            alt="Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Menu
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              About Us
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Contact
            </Link>
          </li> */}
          {details && details.name ? (
            <>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>
                  Profile
                </Link>
              </li>
              <div className={styles.authButtons}>
                <button onClick={logout} className={styles.signupButton}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <li className={styles.navItem}>
              <Link href="/restaurant" className={styles.navLink}>
                Login / SignUp
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default RestaurantHeader;

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Button,
//   List,
//   ListItem,
//   styled,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";

// const NavLink = styled(Link)(({ theme }) => ({
//   color: "inherit",
//   textDecoration: "none",
//   padding: theme.spacing(1),
//   "&:hover": {
//     textDecoration: "underline",
//   },
// }));

// const RestaurantHeader = () => {
//   const [details, setDetails] = useState();
//   const router = useRouter();
//   const pathName = usePathname();

//   useEffect(() => {
//     let data = localStorage.getItem("restaurantUser");
//     if (!data && pathName == "/restaurant/dashboard") {
//       router.push("/restaurant");
//     } else if (data && pathName == "/restaurant") {
//       router.push("/restaurant/dashboard");
//     } else {
//       setDetails(JSON.parse(data));
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("restaurantUser");
//     router.push("/restaurant");
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         backgroundColor: "background.paper",
//         color: "text.primary",
//         boxShadow: "none",
//         py: 1,
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         {/* Logo */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Link href="/" passHref>
//             <Image
//               src="/next.svg"
//               alt="Logo"
//               width={120}
//               height={40}
//               style={{ cursor: "pointer" }}
//             />
//           </Link>
//         </Box>

//         {/* Navigation */}
//         <Box component="nav">
//           <List sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <ListItem sx={{ width: "auto", p: 0 }}>
//               <NavLink href="/">Home</NavLink>
//             </ListItem>
//             <ListItem sx={{ width: "auto", p: 0 }}>
//               <NavLink href="/">Menu</NavLink>
//             </ListItem>
//             <ListItem sx={{ width: "auto", p: 0 }}>
//               <NavLink href="/">About Us</NavLink>
//             </ListItem>
//             <ListItem sx={{ width: "auto", p: 0 }}>
//               <NavLink href="/">Contact</NavLink>
//             </ListItem>

//             {/* Conditional rendering based on auth */}
//             {details && details.name ? (
//               <>
//                 <ListItem sx={{ width: "auto", p: 0 }}>
//                   <NavLink href="/">Profile</NavLink>
//                 </ListItem>
//                 <ListItem sx={{ width: "auto", p: 0 }}>
//                   <Button
//                     variant="contained"
//                     onClick={logout}
//                     sx={{
//                       backgroundColor: "primary.main",
//                       color: "white",
//                       "&:hover": {
//                         backgroundColor: "primary.dark",
//                       },
//                     }}
//                   >
//                     Logout
//                   </Button>
//                 </ListItem>
//               </>
//             ) : (
//               <ListItem sx={{ width: "auto", p: 0 }}>
//                 <NavLink href="/">Login / SignUp</NavLink>
//               </ListItem>
//             )}
//           </List>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default RestaurantHeader;
