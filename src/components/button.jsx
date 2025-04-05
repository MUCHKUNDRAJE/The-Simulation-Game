// JumpButton.jsx
export default function JumpButton({ onJump }) {
    return (
      <button
        onClick={onJump}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "#008CBA",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Jump
      </button>
    );
  }
  