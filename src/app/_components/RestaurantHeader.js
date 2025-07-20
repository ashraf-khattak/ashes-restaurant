"use client";

import Link from "next/link";
import styles from "../restaurant/RestaurantHeader.module.css";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Restaurant from "../restaurant/page";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []); // <-- empty dependency array
  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            src="/next.svg" // Replace with your actual logo path
            alt="Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Menu
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              About Us
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Contact
            </Link>
          </li>
          {details && details.name ? (
            <>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>
                  Profile
                </Link>
              </li>
              <div className={styles.authButtons}>
                <button onClick={logout} className={styles.signupButton}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Login / SignUp
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default RestaurantHeader;
