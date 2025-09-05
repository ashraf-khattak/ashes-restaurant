"use client";

import AddFoodItems from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <Box>
      <RestaurantHeader />
      <Box sx={{ gap: 2, mb: 10 }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => setAddItem(true)}
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            width: "10%",
            backgroundColor: "#18FFFF",
            color: "black",
            "&:hover": {
              backgroundColor: "#00e5e5",
            },
          }}
        >
          Add Food
        </Button>
        <Button
          // type="submit"
          variant="contained"
          size="medium"
          onClick={() => setAddItem(false)}
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            width: "10%",
            backgroundColor: "#18FFFF",
            color: "black",
            "&:hover": {
              backgroundColor: "#00e5e5",
            },
          }}
        >
          Dashboard
        </Button>
        {addItem ? (
          <Box>
            <AddFoodItems />
          </Box>
        ) : (
          <FoodItemList />
        )}
      </Box>
      <RestaurantFooter />
    </Box>
  );
};
export default Dashboard;
