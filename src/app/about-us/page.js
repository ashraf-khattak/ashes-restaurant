"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import RestaurantFooter from "../_components/RestaurantFooter";
import CustomerHeader from "../_components/CustomerHeader";
import orhan from "../../../public/image/orhan.jpg";

export default function AboutUs() {
  return (
    <>
      <CustomerHeader />

      {/* 🌟 Hero Section */}
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "multiply",
          color: "white",
          py: { xs: 13, md: 15, lg: 20 },
          px: { xs: 2, md: 10 },
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 10 }}>
          About Us
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            textAlign: "center",
            mx: "auto",
            width: { xs: "100%", md: "80%", lg: "40%" },
          }}
        >
          Delivering happiness, one meal at a time. Fresh flavors, trusted
          restaurants, and lightning-fast delivery.
        </Typography>
      </Box>

      {/* 🌍 Mission & Vision */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          px: { xs: 2, md: 6 },
          py: 8,
        }}
      >
        {[
          {
            title: "Our Mission",
            desc: "To make delicious food accessible to everyone, while supporting local restaurants and creating unforgettable experiences for our customers.",
            img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80",
          },
          {
            title: "Our Vision",
            desc: "To be the most loved food delivery app, known for quality, innovation, and spreading happiness with every order placed.",
            img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80",
          },
        ].map((item, i) => (
          <Card
            key={i}
            sx={{
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              overflow: "hidden",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={item.img}
              alt={item.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {item.title}
              </Typography>
              <Typography color="text.secondary">{item.desc}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 💡 Core Values */}
      <Box
        sx={{
          background: "#f7f7f7",
          px: { xs: 2, md: 6 },
          py: 8,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          sx={{ color: "#333" }}
        >
          Our Core Values
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {[
            {
              icon: <RestaurantIcon />,
              title: "Quality Food",
              desc: "Partnering with the best restaurants to deliver fresh and tasty meals every time.",
              img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
            },
            {
              icon: <LocalShippingIcon />,
              title: "Fast Delivery",
              desc: "Ensuring your food reaches you hot and on time, wherever you are.",
              img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
            },
            {
              icon: <FavoriteIcon />,
              title: "Customer Love",
              desc: "Putting our customers first, always listening, and improving continuously.",
              img: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80",
            },
            {
              icon: <EmojiPeopleIcon />,
              title: "Community",
              desc: "Supporting local restaurants and empowering communities with growth opportunities.",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
            },
          ].map((value, i) => (
            <Card
              key={i}
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={value.img}
                alt={value.title}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "#18FFFF",
                    color: "#000",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {value.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {value.title}
                </Typography>
                <Typography color="text.secondary">{value.desc}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* 🙌 CTA */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
          background:
            "linear-gradient(90deg,rgba(0,0,0,1) 0%, #6a11cb 70%, #2574fc 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Join the FoodieExpress Family
        </Typography>
        <Typography sx={{ maxWidth: 600, mx: "auto", mb: 4, color: "#ddd" }}>
          Thousands trust us for their daily meals. Let us serve you with love,
          speed, and unmatched quality.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: "16px",
            background:
              "linear-gradient(90deg,#18FFFF 0%, #6a11cb 70%, #2574fc 100%)",
            "&:hover": {
              background: "linear-gradient(90deg,#00e5e5, #18FFFF)",
              boxShadow: "0 0 10px 6px #18FFFF",
            },
          }}
        >
          Order Now
        </Button>
      </Box>

      {/* 👥 Team Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          sx={{ color: "#333" }}
        >
          Meet Our Team
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {[
            {
              name: "Shahbaaz Khan",
              role: "Founder & CEO",
              img: orhan, // ✅ works now
            },
            {
              name: "Musharraf Khan",
              role: "Head of Operations",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Orhan Saeed",
              role: "Marketing Lead",
              img: "https://randomuser.me/api/portraits/women/55.jpg",
            },
          ].map((member, i) => (
            <Card
              key={i}
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                p: 3,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
                },
              }}
            >
              <Avatar
                src={member.img}
                sx={{
                  width: 110,
                  height: 110,
                  mx: "auto",
                  mb: 2,
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {member.name}
              </Typography>
              <Typography color="text.secondary">{member.role}</Typography>
            </Card>
          ))}
        </Box>
      </Container>

      <RestaurantFooter />
    </>
  );
}
