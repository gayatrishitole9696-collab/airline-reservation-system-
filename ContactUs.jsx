import React, { useState } from "react";
import Homenavbar from "./Homenavbar1";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✈️ Thank you for reaching Chhatrapati Shivaji International Airport. We will contact you soon!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <Homenavbar></Homenavbar>
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div className="container" style={styles.content}>
        <h1 style={styles.title}>Contact Chhatrapati Shivaji International Airport</h1>
        <p style={styles.subtitle}>
          We’re here to assist you on every journey ✨
        </p>

        <div className="row mt-4">
          {/* Info Card */}
          <div className="col-md-5">
            <div style={styles.card}>
              <h4>✈️ Airport Information</h4>
              <hr />
              <p><strong>Airport Name:</strong> Chhatrapati Shivaji International Airport</p>
              <p><strong>Airport Code:</strong> IXU</p>
              <p><strong>Location:</strong> Mumbai, Maharashtra</p>
              <p><strong>Contact:</strong> +91 240 247 7821</p>
              <p><strong>Email:</strong> support@ixuairport.com</p>
              <p style={styles.note}>
                Your comfort and safety are our top priorities.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-7">
            <div style={styles.card}>
              <h4>📩 Get in Touch</h4>
              <hr />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button style={styles.button}>
                  Send Message ✈️
                </button>
              </form>
            </div>
          </div>
        </div>

        <p style={styles.footer}>
          © 2026 Chhatrapati Shivaji International Airport • Fly Safe • Fly Smart
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
      "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df')",
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
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(45deg, #007bff, #00c6ff)",
    border: "none",
    borderRadius: "25px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
  },
  note: {
    marginTop: "10px",
    fontStyle: "italic",
    color: "#555",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "14px",
    opacity: 0.8,
  },
};
