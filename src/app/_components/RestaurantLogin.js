import { useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 3)
      newErrors.password = "Password must be at least 3 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const res = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, login: true }),
    });

    const result = await res.json();

    if (result.success) {
      const { result: user } = result;
      delete user.password;
      localStorage.setItem("restaurantUser", JSON.stringify(user));
      router.push("/restaurant/dashboard");
    } else {
      setErrors({ api: result.message || "Login failed. Please try again." });
    }
  };

  return (
    <div>
      <h3>Login Component</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "", api: "" }));
            }}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "", api: "" }));
            }}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        {errors.api && (
          <div className="input-wrapper">
            <span className="error-text">{errors.api}</span>
          </div>
        )}

        <div className="input-wrapper">
          <button type="submit" className="button">
            Login
          </button>
        </div>
        {/* <div className="input-wrapper">
          <button type="submit" className="button">
            Login
          </button>
        </div> */}
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

export default RestaurantLogin;
