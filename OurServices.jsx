import React from "react";
import Home from "./Home";
import Homenavbar from "./Homenavbar1";

export default function OurServices() {
  const services = [
    {
      title: "Flight Booking",
      description:
        "Book domestic and international flights with ease and get instant confirmation.",
      icon: "✈️",
      color: "#007bff",
    },
    {
      title: "Check-In Assistance",
      description:
        "Skip long queues with our express check-in counters and online check-in support.",
      icon: "🛄",
      color: "#28a745",
    },
    {
      title: "Lounge Access",
      description:
        "Relax in our premium lounges with complimentary food, beverages, and Wi-Fi.",
      icon: "🛋️",
      color: "#ffc107",
    },
    {
      title: "Cargo Services",
      description:
        "Efficient cargo handling for your parcels and goods with real-time tracking.",
      icon: "📦",
      color: "#fd7e14",
    },
    {
      title: "Customer Support",
      description:
        "24/7 support to resolve queries, complaints, and provide travel guidance.",
      icon: "📞",
      color: "#6f42c1",
    },
    {
      title: "Airport Shuttle",
      description:
        "Convenient shuttle service to and from Sambhaji Nagar Airport.",
      icon: "🚌",
      color: "#20c997",
    },
  ];

  return (
    <div>
      <Homenavbar />
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div className="container" style={styles.content}>
        <h1 style={styles.title}>Our Services</h1>
        <p style={styles.subtitle}>
          Explore the premium services Sambhaji Nagar Airport offers for travelers ✨
        </p>

        <div className="row mt-5">
          {services.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div style={{ ...styles.card, borderTop: `4px solid ${service.color}` }}>
                <h2 style={styles.icon}>{service.icon}</h2>
                <h4 style={styles.cardTitle}>{service.title}</h4>
                <p style={styles.cardDesc}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={styles.footer}>
          © 2026 Sambhaji Nagar Airport • Your Journey, Our Service
        </p>
      </div>
    </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1537498425277-c283d32ef9db')",
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
    color: "#fff",
    paddingTop: "60px",
    paddingBottom: "40px",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.9,
  },
  card: {
    background: "#ffffff",
    color: "#000",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "15px",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDesc: {
    color: "#555",
    fontSize: "14px",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "14px",
    opacity: 0.8,
  },
};
