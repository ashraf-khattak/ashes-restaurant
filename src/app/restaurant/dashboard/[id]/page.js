"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  AttachMoney,
  Restaurant,
  Description,
  Link,
} from "@mui/icons-material";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditFoodItems = (props) => {
  const { id } = props.params; // food item id
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imagePath: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Load existing food item details
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`/api/restaurant/foods/edit/${id}`);
        const data = await res.json();

        if (res.ok && data.success && data.food) {
          setFormData({
            name: data.food.name || "",
            description: data.food.description || "",
            price: data.food.price?.toString() || "",
            imagePath: data.food.imagePath || "",
          });
        } else {
          setErrors({ api: data.message || "Failed to load food item" });
        }
      } catch (err) {
        setErrors({ api: "Error loading food item" });
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchFood();
  }, [id]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });

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

  // ✅ Update food item
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      let response = await fetch(`/api/restaurant/foods/edit/${id}`, {
        method: "PUT", // or PATCH depending on your API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Food item updated successfully!");
        router.push("../dashboard");
      } else {
        setErrors({ api: result.message || "Failed to update food item" });
      }
    } catch (error) {
      setErrors({
        api: error.message || "Failed to update food item. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // your form fields array (unchanged)
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
        // sx={{
        //   p: 1,
        //   backgroundImage:
        //     "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundBlendMode: "overlay",
        //   backgroundColor: "rgba(214, 214, 218, 0.8)",
        //   minHeight: "80vh",
        // }}
      >
        <Paper
          elevation={3}
          sx={{
            px: { xs: 1, sm: 3 },
            py: 3,
            maxWidth: 800,
            mx: "auto",
            mt: 4,
            color: "white",
            backgroundColor: "rgba(13, 13, 18, 0.54)",
            borderRadius: "16px",
            boxShadow: "0 0 10px 10px #ffffff57",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            sx={{
              background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              backgroundSize: "200% auto",
              animation: "gradient 6s linear infinite",
              "@keyframes gradient": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}
          >
            Update Food Item
          </Typography>

          {fetching ? (
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <CircularProgress sx={{ color: "#18FFFF" }} />
              <Typography sx={{ mt: 2 }}>Loading food details...</Typography>
            </Box>
          ) : (
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
                  size="small"
                  value={formData[field.id]}
                  onChange={handleChange(field.id)}
                  error={!!errors[field.id]}
                  helperText={errors[field.id]}
                  multiline={field.multiline}
                  rows={field.rows}
                  placeholder={field.placeholder}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {field.icon}
                      </InputAdornment>
                    ),
                    inputProps: field.inputProps,
                  }}
                  sx={{
                    gridColumn: field.gridProps || {},
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "#18FFFF" },
                      color: "white",
                    },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiFormHelperText-root": {
                      color: errors[field.id]
                        ? "#f44336"
                        : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              ))}

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
                variant="outlined"
                size="medium"
                startIcon={<ArrowBackIcon />} // 👈 Back Icon
                onClick={() => router.push("../dashboard")}
                sx={{
                  my: 3,
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "2px solid #18FFFF",
                  color: "#18FFFF",
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 0 10px 7px #ffffff57",
                  "&:hover": {
                    backgroundColor: loading
                      ? "rgba(24, 255, 255, 0.7)"
                      : "#00e5e5",
                    border: "2px solid #000000ff",
                    boxShadow: "0 0 9px 6px #ffffffb9",
                    color: "#000",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(24, 255, 255, 0.5)",
                    color: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="outlined"
                size="small"
                disabled={loading}
                sx={{
                  my: 3,
                  px: 2,
                  py: 1,
                  width: "100%",
                  border: "2px solid #18FFFF",
                  color: "#18FFFF",
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 0 10px 7px #ffffff57",
                  "&:hover": {
                    backgroundColor: loading
                      ? "rgba(24, 255, 255, 0.7)"
                      : "#00e5e5",
                    border: "2px solid #000000ff",
                    boxShadow: "0 0 9px 6px #ffffffb9",
                    color: "#000",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(24, 255, 255, 0.5)",
                    color: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#18FFFF" }} />
                ) : (
                  "Update Food Item"
                )}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      <RestaurantFooter />
    </Box>
  );
};

export default EditFoodItems;

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
//   CircularProgress,
// } from "@mui/material";
// import {
//   AttachMoney,
//   Restaurant,
//   Description,
//   Link,
// } from "@mui/icons-material";
// import RestaurantFooter from "@/app/_components/RestaurantFooter";
// import RestaurantHeader from "@/app/_components/RestaurantHeader";

// const EditFoodItems = (props) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     imagePath: "",
//   });
//   console.log(props.params.id, "aaaaaaaaaaaaaaaa");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
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

//     setLoading(true);

//     // try {
//     //   // Get restaurant ID from localStorage
//     //   let resto_id;
//     //   const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
//     //   if (restaurantData) {
//     //     resto_id = restaurantData._id;
//     //   } else {
//     //     throw new Error("Restaurant not logged in");
//     //   }

//     //   // Add restaurant ID to form data - use resto_id instead of restaurantId
//     //   const submitData = {
//     //     ...formData,
//     //     resto_id: resto_id, // Changed from restaurantId to resto_id
//     //   };

//     //   // Send data to API
//     //   const response = await fetch(
//     //     "/api/restaurant/foods",
//     //     {
//     //       method: "POST",
//     //       headers: { "Content-Type": "application/json" },
//     //       body: JSON.stringify(submitData),
//     //     }
//     //   );

//     //   const result = await response.json();

//     //   if (result.success) {
//     //     alert("Food item added successfully!");
//     //     props.setAddItem(false)
//     //   } else {
//     //     setErrors({ api: result.message || "Failed to add food item" });
//     //   }
//     // } catch (error) {
//     //   setErrors({
//     //     api: error.message || "Failed to add food item. Please try again.",
//     //   });
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   // Define form fields configuration
//   const formFields = [
//     {
//       id: "name",
//       label: "Food Name",
//       type: "text",
//       icon: <Restaurant sx={{ color: "white" }} />,
//       gridProps: { xs: "1 / -1", md: "1 / -1" },
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
//     <Box>
//       <RestaurantHeader />

//       <Box
//         sx={{
//           p: 1,
//           backgroundImage:
//             "url('https://b.zmtcdn.com/data/pictures/8/19475178/0ee7d3ca6c321c2e1ec61042f1a3d056.jpg?fit=around|960:500&crop=960:500;*,*');",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundBlendMode: "overlay",
//           backgroundColor: "rgba(214, 214, 218, 0.8)",
//           minHeight: "80vh",
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             px: { xs: 1, sm: 3 },
//             py: 3,
//             maxWidth: 800,
//             mx: "auto",
//             mt: 4,
//             color: "white",
//             backgroundColor: "rgba(13, 13, 18, 0.54)",
//             borderRadius: "16px",
//             boxShadow: "0 0 10px 10px #ffffff57",
//           }}
//         >
//           <Typography
//             variant="h4"
//             gutterBottom
//             textAlign="center"
//             sx={{
//               background: "linear-gradient(45deg, #FF4081, #7C4DFF, #18FFFF)",
//               backgroundClip: "text",
//               textFillColor: "transparent",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontWeight: "bold",
//               backgroundSize: "200% auto",
//               animation: "gradient 6s linear infinite",
//               "@keyframes gradient": {
//                 "0%": {
//                   backgroundPosition: "0% 50%",
//                 },
//                 "50%": {
//                   backgroundPosition: "100% 50%",
//                 },
//                 "100%": {
//                   backgroundPosition: "0% 50%",
//                 },
//               },
//             }}
//           >
//             Update New Food Item
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               display: "grid",
//               gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
//               gap: 2,
//             }}
//           >
//             {formFields.map((field) => (
//               <TextField
//                 key={field.id}
//                 label={field.label}
//                 type={field.type}
//                 value={formData[field.id]}
//                 onChange={handleChange(field.id)}
//                 error={!!errors[field.id]}
//                 helperText={errors[field.id]}
//                 multiline={field.multiline}
//                 rows={field.rows}
//                 placeholder={field.placeholder}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       {field.icon}
//                     </InputAdornment>
//                   ),
//                   inputProps: field.inputProps,
//                 }}
//                 sx={{
//                   gridColumn: field.gridProps || {},
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "white",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "white",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#18FFFF",
//                     },
//                     color: "white",
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "white",
//                   },
//                   "& .MuiFormHelperText-root": {
//                     color: errors[field.id]
//                       ? "#f44336"
//                       : "rgba(255, 255, 255, 0.7)",
//                   },
//                 }}
//               />
//             ))}

//             {/* Image Preview */}
//             {formData.imagePath && (
//               <Box sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
//                 <Typography variant="h6" sx={{ color: "#18FFFF", mb: 1 }}>
//                   Image Preview
//                 </Typography>
//                 <Box
//                   component="img"
//                   src={formData.imagePath}
//                   alt="Food preview"
//                   sx={{
//                     maxWidth: "100%",
//                     maxHeight: 200,
//                     borderRadius: "8px",
//                     border: "2px solid #18FFFF",
//                   }}
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                   }}
//                 />
//               </Box>
//             )}

//             {errors.api && (
//               <Alert
//                 severity="error"
//                 sx={{
//                   gridColumn: "1 / -1",
//                   mt: 1,
//                   "& .MuiAlert-message": { color: "white" },
//                 }}
//               >
//                 {errors.api}
//               </Alert>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               size="medium"
//               disabled={loading} // Disable button when loading
//               sx={{
//                 gridColumn: "1 / -1",
//                 mt: 3,
//                 // mb: 2,
//                 py: 1.5,
//                 borderRadius: 8,
//                 backgroundColor: loading
//                   ? "rgba(24, 255, 255, 0.7)"
//                   : "#18FFFF", // Change color when loading
//                 color: "black",
//                 fontWeight: "bold",
//                 "&:hover": {
//                   backgroundColor: loading
//                     ? "rgba(24, 255, 255, 0.7)"
//                     : "#00e5e5",
//                 },
//                 "&.Mui-disabled": {
//                   backgroundColor: "rgba(24, 255, 255, 0.5)",
//                   color: "rgba(0, 0, 0, 0.7)",
//                 },
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} sx={{ color: "#18FFFF" }} /> // Show spinner when loading
//               ) : (
//                 "Update Food Item"
//               )}
//             </Button>
//             <Button
//               variant="contained"
//               size="medium"
//               onClick={() => router.push(`../dashboard`)}
//               sx={{
//                 // gridColumn: "1 / -1",
//                 mt: 1,
//                 mb: 2,
//                 py: 1.5,
//                 borderRadius: 8,
//                 backgroundColor: "rgba(24, 255, 255, 0.7)", // Change color when loading
//                 color: "black",
//                 fontWeight: "bold",
//                 "&:hover": {
//                   backgroundColor: loading
//                     ? "rgba(24, 255, 255, 0.7)"
//                     : "#00e5e5",
//                 },
//               }}
//             >
//               Back
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//       <RestaurantFooter />
//     </Box>
//   );
// };

// export default EditFoodItems;
