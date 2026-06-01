import React from "react";
import Homenavbar from "./Homenavbar1";

export default function AboutUs() {
  
  return (
    <div>
      <Homenavbar />
    
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div className="container" style={styles.content}>
        <h1 style={styles.title}>About Chhatrapati Shivaji International Airport</h1>
        <p style={styles.subtitle}>
          Connecting people, places, and possibilities ✈️
        </p>


          <div className="col-md-6" style={{ color: "#fff" }}>
            <h3 style={styles.heading}>Our Mission</h3>
            <p style={styles.text}>
              To provide world-class airport services with safety, efficiency, and
              comfort at the heart of every journey. We aim to make every travel
              experience seamless and enjoyable.
            </p>

            <h3 style={styles.heading}>Our Vision</h3>
            <p style={styles.text}>
              To be the leading regional airport, connecting Sambhaji Nagar to the
              world while delivering excellence in aviation services, customer
              experience, and innovation.
            </p>

            <h3 style={styles.heading}>Why Choose Us?</h3>
            <ul style={styles.list}>
              <li>State-of-the-art facilities & modern terminals</li>
              <li>Efficient check-in and boarding services</li>
              <li>Premium lounges & customer support</li>
              <li>Advanced security and safety measures</li>
              <li>Reliable airport shuttles and transportation</li>
            </ul>
          </div>
        </div>

        <p style={styles.footer}>
          © 2026 Chhatrapati Shivaji International Airport • Excellence in Travel & Aviation
        </p>
      </div>
    </div>
    
    
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://tse1.mm.bing.net/th/id/OIP.ix7ZIX00V9kXwfr3afVvhwHaEK?pid=Api&P=0&h=180')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    position: "relative",
    zIndex: 2,
    paddingTop: "60px",
    paddingBottom: "40px",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "1px",
    fontSize: "40px",
  },
  subtitle: {
    textAlign: "center",
    color: "#ddd",
    fontSize: "18px",
    marginTop: "10px",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#f1f1f1",
    lineHeight: "1.6",
  },
  list: {
    fontSize: "16px",
    lineHeight: "1.8",
    paddingLeft: "20px",
  },
  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#ccc",
    fontSize: "14px",
  },
};
