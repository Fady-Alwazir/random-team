import {
  Modal,
  Backdrop,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuth, authErrorMessage } from "../../context/AuthContext";

const COPY = {
  signin: {
    title: "Sign in",
    subtitle: "Load your players, teams and match history",
    action: "Sign in",
  },
  signup: {
    title: "Create account",
    subtitle: "Your current players, teams and history are saved to it",
    action: "Create account",
  },
  reset: {
    title: "Reset password",
    subtitle: "We'll email you a link to choose a new one",
    action: "Send reset link",
  },
};

const AuthDialog = ({ open, handleClose, mode }) => {
  const { signIn, signUp, resetPassword } = useAuth();
  const isDark = mode === "dark";

  const [view, setView] = useState("signin"); // signin | signup | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const green = isDark ? "#22c55e" : "#16a34a";
  const muted = isDark ? "#64748b" : "#9ca3af";

  const switchView = (next) => {
    setView(next);
    setError("");
    setNotice("");
  };

  const close = () => {
    if (busy) return;
    setPassword("");
    setError("");
    setNotice("");
    setView("signin");
    handleClose();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setNotice("");

    if (!email.trim()) return setError("Enter your email address.");
    if (view !== "reset" && !password) return setError("Enter your password.");
    if (view === "signup" && password.length < 6)
      return setError("Password must be at least 6 characters.");

    setBusy(true);
    try {
      if (view === "reset") {
        await resetPassword(email);
        setNotice("If an account exists for that email, a reset link is on its way.");
      } else {
        await (view === "signup" ? signUp : signIn)(email, password);
        setPassword("");
        setView("signin");
        handleClose();
      }
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
    return undefined;
  };

  const fieldSx = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 500,
      fontSize: "1rem",
      color: isDark ? "#f0f6ff" : "#0f172a",
      "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" },
      "&:hover fieldset": { borderColor: isDark ? "rgba(34,197,94,0.4)" : "rgba(22,163,74,0.35)" },
      "&.Mui-focused fieldset": { borderColor: green },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: green },
  };

  const linkSx = {
    color: green,
    fontWeight: 600,
    cursor: "pointer",
    textDecorationColor: "transparent",
    "&:hover": { textDecorationColor: green },
  };

  const copy = COPY[view];

  return (
    <Modal
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300, sx: { backdropFilter: "blur(4px)", bgcolor: "rgba(0,0,0,0.6)" } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 2, sm: 0 } }}
    >
      <Box
        component="form"
        onSubmit={submit}
        noValidate
        sx={{
          outline: "none",
          width: { xs: "100%", sm: 420 },
          bgcolor: isDark ? "#0d1a2b" : "#ffffff",
          borderRadius: "16px",
          border: `1.5px solid ${isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.15)"}`,
          boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.12)",
          p: { xs: 3, sm: 4 },
          animation: "pop 0.25s ease both",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: isDark ? "#f0f6ff" : "#0f172a",
                lineHeight: 1.2,
              }}
            >
              {copy.title}
            </Typography>
            <Typography variant="caption" sx={{ color: muted, mt: 0.5, display: "block" }}>
              {copy.subtitle}
            </Typography>
          </Box>
          <IconButton
            onClick={close}
            size="small"
            aria-label="Close"
            sx={{
              borderRadius: "8px",
              color: muted,
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          sx={fieldSx}
        />

        {view !== "reset" && (
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete={view === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            helperText={view === "signup" ? "At least 6 characters" : ""}
            FormHelperTextProps={{ sx: { color: muted } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                    size="small"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    sx={{ color: muted }}
                  >
                    {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />
        )}

        {view === "signin" && (
          <Box sx={{ textAlign: "right", mt: -1, mb: 2 }}>
            <Link component="button" type="button" variant="caption" onClick={() => switchView("reset")} sx={linkSx}>
              Forgot password?
            </Link>
          </Box>
        )}

        {(error || notice) && (
          <Box
            role={error ? "alert" : "status"}
            sx={{
              px: 2,
              py: 1.25,
              mb: 2,
              borderRadius: "8px",
              bgcolor: error
                ? (isDark ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.06)")
                : (isDark ? "rgba(34,197,94,0.1)" : "rgba(22,163,74,0.07)"),
              border: `1px solid ${error
                ? (isDark ? "rgba(248,113,113,0.25)" : "rgba(220,38,38,0.18)")
                : (isDark ? "rgba(34,197,94,0.25)" : "rgba(22,163,74,0.2)")}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: error ? (isDark ? "#fca5a5" : "#dc2626") : (isDark ? "#4ade80" : "#15803d"),
              }}
            >
              {error || notice}
            </Typography>
          </Box>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={busy}
          sx={{
            borderRadius: "10px",
            py: 1.4,
            bgcolor: green,
            color: "#fff",
            fontWeight: 700,
            "&:hover": { bgcolor: isDark ? "#16a34a" : "#15803d" },
            "&.Mui-disabled": { bgcolor: green, color: "#fff", opacity: 0.7 },
          }}
        >
          {busy ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : copy.action}
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 2.5, color: muted, fontSize: "0.9rem" }}>
          {view === "signin" && (
            <>
              New here?{" "}
              <Link component="button" type="button" onClick={() => switchView("signup")} sx={linkSx}>
                Create an account
              </Link>
            </>
          )}
          {view === "signup" && (
            <>
              Already have an account?{" "}
              <Link component="button" type="button" onClick={() => switchView("signin")} sx={linkSx}>
                Sign in
              </Link>
            </>
          )}
          {view === "reset" && (
            <Link component="button" type="button" onClick={() => switchView("signin")} sx={linkSx}>
              Back to sign in
            </Link>
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AuthDialog;
