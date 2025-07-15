interface Props {
  username: string;
  verificationCode: string;
  formattedExpiry: string;
  verificationLink: string;
}

export const VerificationEmail = ({
  username,
  verificationCode,
  formattedExpiry,
  verificationLink,
}: Props) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f8f8",
      padding: "20px",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#333" }}>
        Welcome to{" "}
        <span style={{ color: "oklch(64.5% 0.246 16.439)" }}>FoodieGo</span>,
        {username}!
      </h2>
      <p style={{ color: "#555" }}>
        Thank you for signing up. Please verify your email using the code below:
      </p>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "oklch(64.5% 0.246 16.439)",
        }}
      >
        {verificationCode}
      </p>
      <p>
        Or&bbsp;
        <a
          href={verificationLink}
          style={{ color: "oklch(64.5% 0.246 16.439)" }}
        >
          click here
        </a>
        to verify.
      </p>
      <p style={{ color: "#777" }}>
        This code is valid until <strong>{formattedExpiry}</strong>. If you did
        not sign up, please ignore this email.
      </p>
      <footer style={{ marginTop: "20px", fontSize: "12px", color: "#aaa" }}>
        &copy; 2025 FoodieGo. All rights reserved.
      </footer>
    </div>
  </div>
);
