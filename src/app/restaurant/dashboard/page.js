"use client";

import AddFoodItems from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <Box>
      <RestaurantHeader />

      <Box
        sx={{
          p: 1,
          backgroundImage:
            "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(214, 214, 218, 0.8)",
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
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Menu
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
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
            </Button>
          </Stack>
        </Box>

        {/* Content Section */}
        <Box sx={{}}>{addItem ? <AddFoodItems /> : <FoodItemList />}</Box>
      </Box>

      <RestaurantFooter />
    </Box>
    // <Box>
    //   <RestaurantHeader />
    //   <Box sx={{ mb: 10 }}>
    //     <Box sx={{ display: "flex" }}>
    //       <Typography>menu</Typography>
    //       <Box sx={{ gap: 2 }}>
    //         <Button
    //           variant="contained"
    //           size="small"
    //           onClick={() => setAddItem(true)}
    //           sx={{
    //             mt: 3,
    //             mb: 2,
    //             py: 1.5,
    //             width: "10%",
    //             backgroundColor: "#18FFFF",
    //             color: "black",
    //             "&:hover": {
    //               backgroundColor: "#00e5e5",
    //             },
    //           }}
    //         >
    //           Add Food
    //         </Button>
    //         <Button
    //           // type="submit"
    //           variant="contained"
    //           size="small"
    //           onClick={() => setAddItem(false)}
    //           sx={{
    //             mt: 3,
    //             mb: 2,
    //             py: 1.5,
    //             width: "10%",
    //             backgroundColor: "#18FFFF",
    //             color: "black",
    //             "&:hover": {
    //               backgroundColor: "#00e5e5",
    //             },
    //           }}
    //         >
    //           Dashboard
    //         </Button>
    //       </Box>
    //     </Box>
    //     {addItem ? (
    //       <Box>
    //         <AddFoodItems />
    //       </Box>
    //     ) : (
    //       <FoodItemList />
    //     )}
    //   </Box>
    //   <RestaurantFooter />
    // </Box>
  );
};
export default Dashboard;
