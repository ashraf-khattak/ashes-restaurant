"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  InputAdornment,
} from "@mui/material";
import {
  AttachMoney,
  Restaurant,
  Description,
  Link,
} from "@mui/icons-material";

const AddFoodItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imagePath: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Food name is required.";
    else if (formData.name.length < 2)
      newErrors.name = "Food name must be at least 2 characters.";

    if (!formData.description)
      newErrors.description = "Description is required.";
    else if (formData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters.";

    if (!formData.price) newErrors.price = "Price is required.";
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be a valid number greater than 0.";

    if (!formData.imagePath) newErrors.imagePath = "Image URL is required.";
    else if (!/^https?:\/\/.+\..+/.test(formData.imagePath))
      newErrors.imagePath = "Please enter a valid image URL.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Get restaurant ID from localStorage
      let resto_id;
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
      if (restaurantData) {
        resto_id = restaurantData._id;
      } else {
        throw new Error("Restaurant not logged in");
      }

      // Add restaurant ID to form data - use resto_id instead of restaurantId
      const submitData = {
        ...formData,
        resto_id: resto_id, // Changed from restaurantId to resto_id
      };

      // Send data to API
      const response = await fetch(
        // "http://localhost:3000/api/restaurant/foods",
        "/api/restaurant/foods",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Food item added successfully!");
        router.push("/restaurant/dashboard");
      } else {
        setErrors({ api: result.message || "Failed to add food item" });
      }
    } catch (error) {
      setErrors({
        api: error.message || "Failed to add food item. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!validate()) return;

  //   setLoading(true);

  //   try {
  //     // Get restaurant ID from localStorage
  //     let resto_id;
  //     const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
  //     if (restaurantData) {
  //       resto_id = restaurantData._id;
  //     } else {
  //       throw new Error("Restaurant not logged in");
  //     }

  //     // Add restaurant ID to form data
  //     const submitData = {
  //       ...formData,
  //       restaurantId: resto_id,
  //     };

  //     // Send data to API
  //     const response = await fetch(
  //       "http://localhost:3000/api/restaurant/foods",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(submitData),
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("Food item added successfully!");
  //       router.push("/restaurant/dashboard");
  //     } else {
  //       setErrors({ api: result.message || "Failed to add food item" });
  //     }
  //   } catch (error) {
  //     setErrors({
  //       api: error.message || "Failed to add food item. Please try again.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Define form fields configuration
  const formFields = [
    {
      id: "name",
      label: "Food Name",
      type: "text",
      icon: <Restaurant sx={{ color: "white" }} />,
      gridProps: { xs: "1 / -1", md: "1 / -1" },
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      icon: <AttachMoney sx={{ color: "white" }} />,
      gridProps: {},
      inputProps: { step: "0.01", min: "0" },
    },
    {
      id: "imagePath",
      label: "Image URL",
      type: "url",
      icon: <Link sx={{ color: "white" }} />,
      placeholder: "https://example.com/image.jpg",
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      multiline: true,
      rows: 3,
      icon: <Description sx={{ color: "white" }} />,
      gridProps: { xs: "1 / -1", md: "1 / -1" },
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        color: "white",
        backgroundColor: "#362c2ce9",
        borderRadius: "16px",
        boxShadow:
          "0 10px 30px rgba(197, 51, 180, 0.2), 0 6px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{
          background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          backgroundSize: "200% auto",
          animation: "gradient 6s linear infinite",
          "@keyframes gradient": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },
        }}
      >
        Add New Food Item
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {formFields.map((field) => (
          <TextField
            key={field.id}
            label={field.label}
            type={field.type}
            value={formData[field.id]}
            onChange={handleChange(field.id)}
            error={!!errors[field.id]}
            helperText={errors[field.id]}
            multiline={field.multiline}
            rows={field.rows}
            placeholder={field.placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{field.icon}</InputAdornment>
              ),
              inputProps: field.inputProps,
            }}
            sx={{
              gridColumn: field.gridProps || {},
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#18FFFF",
                },
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiFormHelperText-root": {
                color: errors[field.id]
                  ? "#f44336"
                  : "rgba(255, 255, 255, 0.7)",
              },
            }}
          />
        ))}

        {/* Image Preview */}
        {formData.imagePath && (
          <Box sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#18FFFF", mb: 1 }}>
              Image Preview
            </Typography>
            <Box
              component="img"
              src={formData.imagePath}
              alt="Food preview"
              sx={{
                maxWidth: "100%",
                maxHeight: 200,
                borderRadius: "8px",
                border: "2px solid #18FFFF",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </Box>
        )}

        {errors.api && (
          <Alert
            severity="error"
            sx={{
              gridColumn: "1 / -1",
              mt: 1,
              "& .MuiAlert-message": { color: "white" },
            }}
          >
            {errors.api}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="medium"
          disabled={loading}
          sx={{
            gridColumn: "1 / -1",
            mt: 2,
            py: 1.5,
            backgroundColor: loading ? "#cccccc" : "#18FFFF",
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: loading ? "#cccccc" : "#00e5e5",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Adding Food Item..." : "Add Food Item"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddFoodItems;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   Paper,
//   InputAdornment,
// } from "@mui/material";
// import {
//   AttachMoney,
//   Restaurant,
//   Description,
//   Link,
// } from "@mui/icons-material";

// const AddFoodItems = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     imagePath: "",
//     description: "",
//   });

//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   const handleChange = (field) => (event) => {
//     setFormData({ ...formData, [field]: event.target.value });

//     // Clear specific field error when user starts typing
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: "" });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name) newErrors.name = "Food name is required.";
//     else if (formData.name.length < 2)
//       newErrors.name = "Food name must be at least 2 characters.";

//     if (!formData.description)
//       newErrors.description = "Description is required.";
//     else if (formData.description.length < 10)
//       newErrors.description = "Description must be at least 10 characters.";

//     if (!formData.price) newErrors.price = "Price is required.";
//     else if (isNaN(formData.price) || parseFloat(formData.price) <= 0)
//       newErrors.price = "Price must be a valid number greater than 0.";

//     if (!formData.imagePath) newErrors.imagePath = "Image URL is required.";
//     else if (!/^https?:\/\/.+\..+/.test(formData.imagePath))
//       newErrors.imagePath = "Please enter a valid image URL.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validate()) return;

//     // In a real application, you would send this data to your API
//     console.log("Food item data:", formData);

//     // Simulate API call
//     try {
//       // This would be your actual API endpoint
//       let resto_id;
//       const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
//       if (restaurantData) {
//         resto_id = restaurantData._id;
//       }

//       const response = await fetch(
//         "http://localhost:3000/api/restaurant/foods",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       response = await response.json();

//       // Simulate success
//       alert("Food item added successfully!");
//       router.push("/restaurant/dashboard");
//     } catch (error) {
//       setErrors({ api: "Failed to add food item. Please try again." });
//     }
//   };

//   // Define form fields configuration
//   const formFields = [
//     {
//       id: "name",
//       label: "Food Name",
//       type: "text",
//       icon: <Restaurant sx={{ color: "white" }} />,
//       gridProps: {},
//     },

//     {
//       id: "price",
//       label: "Price",
//       type: "number",
//       icon: <AttachMoney sx={{ color: "white" }} />,
//       gridProps: {},
//       inputProps: { step: "0.01", min: "0" },
//     },
//     {
//       id: "imagePath",
//       label: "Image URL",
//       type: "url",
//       icon: <Link sx={{ color: "white" }} />,
//       gridProps: { xs: "1 / -1", md: "1 / -1" },
//       placeholder: "https://example.com/image.jpg",
//     },
//     {
//       id: "description",
//       label: "Description",
//       type: "text",
//       multiline: true,
//       rows: 3,
//       icon: <Description sx={{ color: "white" }} />,
//       gridProps: { xs: "1 / -1", md: "1 / -1" },
//     },
//   ];

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 4,
//         maxWidth: 800,
//         mx: "auto",
//         mt: 4,
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundBlendMode: "overlay",
//         color: "white",
//         backgroundColor: "#362c2ce9",
//         borderRadius: "16px",
//         boxShadow:
//           "0 10px 30px rgba(197, 51, 180, 0.2), 0 6px 10px rgba(0, 0, 0, 0.15)",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         sx={{
//           background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
//           backgroundClip: "text",
//           textFillColor: "transparent",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           fontWeight: "bold",
//           backgroundSize: "200% auto",
//           animation: "gradient 6s linear infinite",
//           "@keyframes gradient": {
//             "0%": {
//               backgroundPosition: "0% 50%",
//             },
//             "50%": {
//               backgroundPosition: "100% 50%",
//             },
//             "100%": {
//               backgroundPosition: "0% 50%",
//             },
//           },
//         }}
//       >
//         Add New Food Item
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
//           gap: 2,
//         }}
//       >
//         {formFields.map((field) => (
//           <TextField
//             key={field.id}
//             label={field.label}
//             type={field.type}
//             value={formData[field.id]}
//             onChange={handleChange(field.id)}
//             error={!!errors[field.id]}
//             helperText={errors[field.id]}
//             multiline={field.multiline}
//             rows={field.rows}
//             placeholder={field.placeholder}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">{field.icon}</InputAdornment>
//               ),
//               inputProps: field.inputProps,
//             }}
//             sx={{
//               gridColumn: field.gridProps || {},
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "white",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "white",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#18FFFF",
//                 },
//                 color: "white",
//               },
//               "& .MuiInputLabel-root": {
//                 color: "white",
//               },
//               "& .MuiFormHelperText-root": {
//                 color: errors[field.id]
//                   ? "#f44336"
//                   : "rgba(255, 255, 255, 0.7)",
//               },
//             }}
//           />
//         ))}

//         {/* Image Preview */}
//         {/* {formData.imagePath && (
//           <Box sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
//             <Typography variant="h6" sx={{ color: "#18FFFF", mb: 1 }}>
//               Image Preview
//             </Typography>
//             <Box
//               component="img"
//               src={formData.imagePath}
//               alt="Food preview"
//               sx={{
//                 maxWidth: "100%",
//                 maxHeight: 200,
//                 borderRadius: "8px",
//                 border: "2px solid #18FFFF",
//               }}
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />
//           </Box>
//         )} */}

//         {errors.api && (
//           <Alert
//             severity="error"
//             sx={{
//               gridColumn: "1 / -1",
//               mt: 1,
//               "& .MuiAlert-message": { color: "white" },
//             }}
//           >
//             {errors.api}
//           </Alert>
//         )}

//         <Button
//           type="submit"
//           variant="contained"
//           size="medium"
//           sx={{
//             gridColumn: "1 / -1",
//             mt: 2,
//             py: 1.5,
//             backgroundColor: "#18FFFF",
//             color: "black",
//             fontWeight: "bold",
//             "&:hover": {
//               backgroundColor: "#00e5e5",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             },
//             transition: "all 0.3s ease",
//           }}
//         >
//           Add Food Item
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default AddFoodItems;

// import { Box, Typography } from "@mui/material";

// const AddFoodItems = () => {
//   return (
//     <Box>
//       <Typography>Add New food items</Typography>
//     </Box>
//   );
// };

// export default AddFoodItems;
