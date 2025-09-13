"use client";

import { useState } from "react";
import AddFoodItems from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <Box>
      <RestaurantHeader />

      <Box
        sx={{
          minHeight: "80vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage:
            "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "Multiply",
          color: "white",
          py: { xs: 6, md: 15 },
          // px: { xs: 1, sm: 2, md: 10 },
          px: { xs: 1, sm: 2, md: 5, lg: 10, xl: 20 },
        }}
      >
        {/* Top Section */}
        <Box
          sx={{
            py: 2,
            px: 1,
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            justifyContent: "space-between",
            alignItems: "center",
            justifyItems: "center",
            mb: 1,
          }}
        >
          {!addItem ? (
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Menu
            </Typography>
          ) : (
            " "
          )}

          <Stack direction="row" spacing={2}>
            {addItem ? (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setAddItem(false)}
                startIcon={<ArrowBackIcon />} // 👈 Back Icon
                sx={{
                  px: 2,
                  py: 0.5,
                  border: "2px solid #18FFFF",
                  color: "#18FFFF",
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 0 10px 7px #ffffff57",
                  "&:hover": {
                    backgroundColor: "#00ffffff",
                    border: "2px solid #000000ff",
                    boxShadow: "0 0 9px 6px #ffffffb9",
                    color: "#000",
                  },
                }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setAddItem(true)}
                sx={{
                  px: 2,
                  py: 0.5,
                  border: "2px solid #18FFFF",
                  color: "#18FFFF",
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 0 10px 7px #ffffff57",
                  "&:hover": {
                    backgroundColor: "#00ffffff",
                    border: "2px solid #000000ff",
                    boxShadow: "0 0 9px 6px #ffffffb9",
                    color: "#000",
                  },
                }}
              >
                Add Food
              </Button>
            )}
            {/* <Button
              variant="contained"
              size="small"
              onClick={() => setAddItem(true)}
              sx={{
                px: 2,
                py: 0.5,
                backgroundColor: "#18FFFF",
                color: "#000",
                fontWeight: 600,
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#00e5e5",
                },
              }}
            >
              Add Food
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setAddItem(false)}
              sx={{
                px: 2,
                py: 0.5,
                backgroundColor: "#18FFFF",
                color: "#000",
                fontWeight: 600,
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#00e5e5",
                },
              }}
            >
              Dashboard
            </Button> */}
          </Stack>
        </Box>

        {/* Content Section */}
        <Box sx={{}}>
          {addItem ? (
            <AddFoodItems setAddItem={setAddItem} />
          ) : (
            <FoodItemList />
          )}
        </Box>
      </Box>

      <RestaurantFooter />
    </Box>
  );
};
export default Dashboard;
