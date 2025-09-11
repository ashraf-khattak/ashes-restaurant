"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Drawer,
  List,
  Divider,
  Badge,
  useScrollTrigger,
  Slide,
  alpha,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Restaurant as RestaurantIcon,
  AccountCircle,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  TableRestaurant as TableIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Sticky AppBar component
const StickyAppBar = ({ children }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

// Styled components
const GradientAppBar = styled(AppBar)(({ theme }) => ({
  // background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  // backgroundColor: "#000",
  // boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  padding: theme.spacing(0.5, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 300,
    // background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    backgroundColor: "#000",
    color: "white",
  },
}));

const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, [pathName, router]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
    handleClose();
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/" },
  ];
  const profileMenuItems = [
    { label: "Profile", icon: <AccountCircle /> },
    { label: "Reservations", icon: <TableIcon /> },
    { label: "Customers", icon: <GroupIcon /> },
  ];

  const renderDesktopMenu = () => (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        ml: 4,
      }}
    >
      {menuItems.map((item) => (
        <Button
          key={item.name}
          component={Link}
          href={item.href}
          startIcon={item.icon}
          sx={{
            mx: 1,
            color: "white",
            borderRadius: 25,
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );

  const renderDesktopAuth = () => {
    if (!details?.name) {
      return (
        <StyledButton
          component={Link}
          href="/restaurant"
          variant="contained"
          sx={{
            ml: 2,
            borderRadius: 8,
            backgroundColor: "#18FFFF",
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#00e5e5",
            },
          }}
        >
          Restaurant Login
        </StyledButton>
      );
    }

    return (
      <>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Button
          color="inherit"
          startIcon={<AccountCircle />}
          onClick={handleMenu}
          sx={{
            textTransform: "none",
            borderRadius: 25,
            px: 3,
            ml: 1,
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          {details.name}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: { mt: 1.5, borderRadius: 2, minWidth: 180 },
          }}
        >
          {profileMenuItems.map((item) => (
            <MenuItem key={item.label} onClick={handleClose}>
              {item.icon}
              <Box sx={{ ml: 1.5 }}>{item.label}</Box>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={logout}>
            <LogoutIcon />
            <Box sx={{ ml: 1.5 }}>Logout</Box>
          </MenuItem>
        </Menu>
      </>
    );
  };

  const renderDrawer = () => (
    <Box sx={{ textAlign: "center", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RestaurantIcon sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Gourmet Hub
          </Typography>
        </Box>
        <IconButton onClick={toggleMobileMenu} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <Button
            key={item.name}
            component={Link}
            href={item.href}
            fullWidth
            startIcon={item.icon}
            sx={{
              justifyContent: "flex-start",
              color: "white",
              py: 1.5,
              borderRadius: 2,
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            {item.name}
          </Button>
        ))}
      </List>
      <Box sx={{ p: 2, position: "absolute", bottom: 0, width: "100%" }}>
        {details?.name ? (
          <>
            <Button
              fullWidth
              startIcon={<AccountCircle />}
              sx={{
                justifyContent: "flex-start",
                color: "white",
                py: 1.5,
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              {details.name}
            </Button>
            <Button
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={logout}
              sx={{
                justifyContent: "flex-start",
                color: "white",
                py: 1.5,
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <StyledButton
            fullWidth
            component={Link}
            href="/restaurant"
            variant="contained"
            sx={{
              bgcolor: "white",
              borderRadius: 8,
              backgroundColor: "#18FFFF",
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#00e5e5",
              },
            }}
          >
            Restaurant Login
          </StyledButton>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <StickyAppBar>
        <GradientAppBar position="sticky">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <RestaurantIcon
                  sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    fontSize: 32,
                  }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  GOURMET HUB
                </Typography>

                <RestaurantIcon
                  sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  component={Link}
                  href="/"
                  sx={{
                    display: { xs: "flex", md: "none" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  GH
                </Typography>
              </Box>

              {renderDesktopMenu()}

              {/* Desktop auth section */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {renderDesktopAuth()}
              </Box>

              {/* Mobile menu button */}
              <IconButton
                size="large"
                aria-label="open menu"
                onClick={toggleMobileMenu}
                color="inherit"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </GradientAppBar>
      </StickyAppBar>

      {/* Mobile drawer */}
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        ModalProps={{ keepMounted: true }}
      >
        {renderDrawer()}
      </StyledDrawer>
    </>
  );
};

export default RestaurantHeader;
