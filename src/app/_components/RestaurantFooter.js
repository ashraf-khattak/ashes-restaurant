import Link from "next/link";
import styles from "../restaurant/RestaurantFooter.module.css";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const RestaurantFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Ashes Khan</h3>
          <p className={styles.footerText}>
            Serving delicious meals since 2010. Our passion for food brings
            people together.
          </p>
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" className={styles.socialIcon}>
              <FacebookOutlinedIcon fill="#fff" />
            </Link>
            <Link href="https://instagram.com" className={styles.socialIcon}>
              <InstagramIcon />
            </Link>
            <Link href="https://twitter.com" className={styles.socialIcon}>
              <XIcon />
            </Link>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/" className={styles.footerLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.footerLink}>
                Menu
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.footerLink}>
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.footerLink}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.footerLink}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Contact Us</h3>
          <address className={styles.contactInfo}>
            <p>123 Food Street, Culinary City</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@gourmetdelight.com</p>
          </address>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Opening Hours</h3>
          <ul className={styles.openingHours}>
            <li>Monday - Friday: 11am - 10pm</li>
            <li>Saturday: 10am - 11pm</li>
            <li>Sunday: 10am - 9pm</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Ashes Khan. All rights reserved.
        </p>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className={styles.legalLink}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;

// import Link from "next/link";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   List,
//   ListItem,
//   Link as MuiLink,
//   Divider,
// } from "@mui/material";
// import XIcon from "@mui/icons-material/X";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

// const RestaurantFooter = () => {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: "background.paper",
//         color: "text.primary",
//         py: 6,
//         mt: "auto",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* About Section */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" gutterBottom>
//               Ashes Khan
//             </Typography>
//             <Typography variant="body2" paragraph>
//               Serving delicious meals since 2010. Our passion for food brings
//               people together.
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <MuiLink href="https://facebook.com" color="inherit">
//                 <FacebookOutlinedIcon />
//               </MuiLink>
//               <MuiLink href="https://instagram.com" color="inherit">
//                 <InstagramIcon />
//               </MuiLink>
//               <MuiLink href="https://twitter.com" color="inherit">
//                 <XIcon />
//               </MuiLink>
//             </Box>
//           </Grid>

//           {/* Quick Links Section */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" gutterBottom>
//               Quick Links
//             </Typography>
//             <List dense>
//               {["Home", "Menu", "Reservations", "About Us", "Contact"].map(
//                 (item) => (
//                   <ListItem key={item} sx={{ px: 0 }}>
//                     <MuiLink
//                       component={Link}
//                       href="/"
//                       color="inherit"
//                       underline="hover"
//                       sx={{ display: "block", width: "100%" }}
//                     >
//                       {item}
//                     </MuiLink>
//                   </ListItem>
//                 )
//               )}
//             </List>
//           </Grid>

//           {/* Contact Section */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" gutterBottom>
//               Contact Us
//             </Typography>
//             <address>
//               <Typography variant="body2" paragraph>
//                 123 Food Street, Culinary City
//               </Typography>
//               <Typography variant="body2" paragraph>
//                 Phone: (123) 456-7890
//               </Typography>
//               <Typography variant="body2">
//                 Email: info@gourmetdelight.com
//               </Typography>
//             </address>
//           </Grid>

//           {/* Hours Section */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" gutterBottom>
//               Opening Hours
//             </Typography>
//             <List dense>
//               <ListItem sx={{ px: 0 }}>
//                 <Typography variant="body2">
//                   Monday - Friday: 11am - 10pm
//                 </Typography>
//               </ListItem>
//               <ListItem sx={{ px: 0 }}>
//                 <Typography variant="body2">Saturday: 10am - 11pm</Typography>
//               </ListItem>
//               <ListItem sx={{ px: 0 }}>
//                 <Typography variant="body2">Sunday: 10am - 9pm</Typography>
//               </ListItem>
//             </List>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="body2">
//             &copy; {new Date().getFullYear()} Ashes Khan. All rights reserved.
//           </Typography>
//           <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
//             <MuiLink
//               component={Link}
//               href="/privacy-policy"
//               color="inherit"
//               variant="body2"
//               underline="hover"
//             >
//               Privacy Policy
//             </MuiLink>
//             <MuiLink
//               component={Link}
//               href="/terms-of-service"
//               color="inherit"
//               variant="body2"
//               underline="hover"
//             >
//               Terms of Service
//             </MuiLink>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default RestaurantFooter;
