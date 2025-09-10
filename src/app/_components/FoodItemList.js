"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Typography,
  CircularProgress,
} = require("@mui/material");
const { Edit, Delete } = require("@mui/icons-material");

const FoodItemList = () => {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    try {
      setLoading(true);
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));

      // Check if restaurant data exists and has an _id
      if (!restaurantData || !restaurantData._id) {
        throw new Error("Restaurant data not found in localStorage");
      }

      const resto_id = restaurantData._id; // Fixed: Added const declaration

      // let response = await fetch(
      //   "http://localhost:3000/api/restaurant/foods/" + resto_id
      // );
      // let response = await fetch("/api/restaurant/foods/" + resto_id);
      let response = await fetch(`/api/restaurant/foods/${resto_id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Fixed: Renamed to avoid confusion
      console.log("API Response:", data); // Add this for debugging

      if (data.success) {
        setFoodItems(data.result || []);
      } else {
        setError(data.message || "Failed to load food items");
        setFoodItems([]);
      }
    } catch (error) {
      console.error("Error loading food items:", error);
      setError(error.message || "Failed to load food items. Please try again.");
      setFoodItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
    // Add your edit logic here
  };

  const handleDeleteFood = async (id) => {
    try {
      const response = await fetch(`/api/restaurant/foods/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete food item");
      }

      const data = await response.json();

      if (data.success) {
        loadFoodItems();
        alert(data.message || "Food item is deleted.");
      } else {
        alert(data.message || "Food item is deleted.");
      }
    } catch (error) {
      setError(
        error.message || "Failed to delete food item. Please try again."
      );
    }
  };

  // const handleDeleteFood = async (id) => {
  //   // console.log("Delete item with ID:", id);
  //   try {
  //     let response = await fetch(`/api/restaurant/foods/${id}`, {
  //       method: "delete",
  //     });
  //     if (response.success) {
  //       loadFoodItems();
  //     } else {
  //       alert("Food item is not deleted");
  //     }
  //   } catch (error) {
  //     setError(
  //       error.message || "Failed to Delete food items. Please try again."
  //     );
  //   }
  // };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <button onClick={loadFoodItems} style={{ marginTop: "10px" }}>
          Try Again
        </button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ px: { xs: 0.5, sm: 2, md: 6, lg: 10 }, pb: 3 }}>
        {foodItems.length === 0 ? (
          <Typography sx={{ textAlign: "center", padding: 3 }}>
            No food items found.
          </Typography>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer
              sx={{
                borderRadius: 2,
                maxHeight: 500,
              }}
            >
              {/* <Table sx={{ minWidth: 650 }} aria-label="food items table"> */}
              <Table aria-label="food items table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#000000a5" }}>
                    <TableCell
                      sx={{ color: "white", fontSize: 16, fontWeight: 600 }}
                    >
                      S. No
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", fontSize: 16, fontWeight: 600 }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", fontSize: 16, fontWeight: 600 }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", fontSize: 16, fontWeight: 600 }}
                    >
                      Image
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontSize: 16, fontWeight: 600 }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontSize: 16, fontWeight: 600 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foodItems.map((item, index) => (
                    <TableRow
                      key={item._id || item.id || index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 300,
                          color: "text.secondary",
                          fontSize: 14,
                        }}
                      >
                        {item.description}
                      </TableCell>
                      <TableCell>
                        <Avatar
                          src={item.imagePath}
                          alt={item.name}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            boxShadow: 2,
                          }}
                          variant="rounded"
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "secondary.main",
                        }}
                      >
                        ${item.price?.toFixed(2)}
                      </TableCell>
                      <TableCell align="center" sx={{ gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            router.push(`dashboard/${item._id || item.id}`)
                          }
                          // onClick={() => handleEdit(item._id || item.id)}
                          aria-label="edit"
                          sx={{
                            backgroundColor: "#03f917c1",
                            color: "white",
                            marginRight: 1,
                            "&:hover": {
                              backgroundColor: "#049f11ff",
                            },
                          }}
                        >
                          <Edit size="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteFood(item._id || item.id)}
                          aria-label="delete"
                          sx={{
                            backgroundColor: "error.light",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "error.dark",
                            },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default FoodItemList;
