import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 3)
      newErrors.password = "Password must be at least 3 characters.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!name) newErrors.name = "Restaurant name is required.";
    if (!city) newErrors.city = "City is required.";
    if (!address) newErrors.address = "Address is required.";

    if (!contact) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10,15}$/.test(contact))
      newErrors.contact = "Contact must be 10–15 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        name,
        city,
        address,
        contact,
      }),
    });

    const result = await response.json();
    if (result.success) {
      const { result: user } = result;
      delete user.password;
      localStorage.setItem("restaurantUser", JSON.stringify(user));
      router.push("/restaurant/dashboard");
    } else {
      setErrors({ api: result.message || "Registration failed." });
    }
  };

  return (
    <div className="signup-container">
      <h3>Restaurant Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Enter Email ID"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Restaurant Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="City"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Full Address"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Contact Number"
            className="input-field"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {errors.contact && (
            <span className="error-text">{errors.contact}</span>
          )}
        </div>

        {errors.api && (
          <div className="input-wrapper">
            <span className="error-text">{errors.api}</span>
          </div>
        )}

        <div className="input-wrapper">
          <button type="submit" className="button">
            Sign Up
          </button>
        </div>
      </form>

      <style jsx>{`
        .error-text {
          color: red;
          font-size: 13px;
          margin-top: 5px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default RestaurantSignUp;
