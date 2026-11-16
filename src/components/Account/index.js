import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCloudSync } from "../../context/CloudSyncContext";
import AuthDialog from "./AuthDialog";

const STATUS = {
  syncing: { label: "Syncing…", Icon: CloudSyncIcon },
  synced: { label: "Saved to your account", Icon: CloudDoneIcon },
  error: { label: "Sync problem. Changes are kept on this device.", Icon: CloudOffIcon },
};

/** Top-right account button: opens sign in when signed out, a small menu when signed in. */
const Account = ({ mode }) => {
  const { user, loading, signOut } = useAuth();
  const { status } = useCloudSync();
  const isDark = mode === "dark";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  if (loading) return null;

  const green = isDark ? "#22c55e" : "#16a34a";
  const red = isDark ? "#f87171" : "#dc2626";
  const sync = STATUS[status] || STATUS.syncing;
  const ButtonIcon = user ? sync.Icon : PersonOutlineIcon;
  const accent = user && status === "error" ? red : green;

  return (
    <>
      <Tooltip title={user ? "Account" : "Sign in to save your data"} placement="left">
        <IconButton
          aria-label={user ? "Account" : "Sign in"}
          onClick={(e) => (user ? setAnchor(e.currentTarget) : setDialogOpen(true))}
          sx={{
            position: "fixed",
            top: { xs: 12, sm: 20 },
            right: { xs: 64, sm: 72 },
            zIndex: 1300,
            width: 44,
            height: 44,
            borderRadius: "10px",
            bgcolor: isDark ? "rgba(34,197,94,0.12)" : "rgba(22,163,74,0.1)",
            border: `1.5px solid ${isDark ? "rgba(34,197,94,0.3)" : "rgba(22,163,74,0.25)"}`,
            color: accent,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.18)",
              transform: "scale(1.06)",
            },
          }}
        >
          <ButtonIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor) && Boolean(user)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 270,
            borderRadius: "12px",
            bgcolor: isDark ? "#0d1a2b" : "#ffffff",
            backgroundImage: "none",
            border: `1.5px solid ${isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.15)"}`,
          },
        }}
      >
        <Box sx={{ px: 2, pt: 1, pb: 1.5 }}>
          <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", display: "block" }}>
            Signed in as
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isDark ? "#f0f6ff" : "#0f172a",
              overflowWrap: "anywhere",
            }}
          >
            {user?.email}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 1, color: accent }}>
            <sync.Icon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              {sync.label}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
        <MenuItem
          onClick={() => { setAnchor(null); signOut(); }}
          sx={{ mt: 0.5, py: 1.25, alignItems: "flex-start", whiteSpace: "normal" }}
        >
          <ListItemIcon sx={{ color: isDark ? "#94a3b8" : "#6b7280", mt: 0.25 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: isDark ? "#f0f6ff" : "#0f172a" }}>
              Sign out
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", display: "block", lineHeight: 1.3 }}>
              Your data stays in your account and is removed from this device
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      <AuthDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} mode={mode} />
    </>
  );
};

export default Account;
