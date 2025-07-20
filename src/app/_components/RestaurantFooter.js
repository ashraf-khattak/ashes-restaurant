import Link from "next/link";
import styles from "../restaurant/RestaurantFooter.module.css";

const RestaurantFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Gourmet Delight</h3>
          <p className={styles.footerText}>
            Serving delicious meals since 2010. Our passion for food brings people together.
          </p>
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" className={styles.socialIcon}>
              <img src="/icons/facebook.svg" alt="Facebook" />
            </Link>
            <Link href="https://instagram.com" className={styles.socialIcon}>
              <img src="/icons/instagram.svg" alt="Instagram" />
            </Link>
            <Link href="https://twitter.com" className={styles.socialIcon}>
              <img src="/icons/twitter.svg" alt="Twitter" />
            </Link>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/" className={styles.footerLink}>Home</Link></li>
            <li><Link href="/" className={styles.footerLink}>Menu</Link></li>
            <li><Link href="/" className={styles.footerLink}>Reservations</Link></li>
            <li><Link href="/" className={styles.footerLink}>About Us</Link></li>
            <li><Link href="/" className={styles.footerLink}>Contact</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Contact Us</h3>
          <address className={styles.contactInfo}>
            <p>123 Food Street, Culinary City</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@gourmetdelight.com</p>
          </address>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Opening Hours</h3>
          <ul className={styles.openingHours}>
            <li>Monday - Friday: 11am - 10pm</li>
            <li>Saturday: 10am - 11pm</li>
            <li>Sunday: 10am - 9pm</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Gourmet Delight. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
          <Link href="/terms-of-service" className={styles.legalLink}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default RestaurantFooter;