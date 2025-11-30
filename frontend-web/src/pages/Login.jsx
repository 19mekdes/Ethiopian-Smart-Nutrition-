import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../contexts/AuthContext.jsx";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login, loading: authLoading, isConfigError } = useContext(AuthContext);

  const [email, setEmail] = useState("healthworker@mock.com");
  const [password, setPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isAmharic = i18n.language === "am";
  const isFormDisabled = authLoading || isSubmitting || isConfigError;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormDisabled) return;

    setError("");
    setIsSubmitting(true);

    try {
      // Use the mock login function provided by AuthContext
      await login(email, password);
      // Successful login navigates to the dashboard (ChildrenList)
      navigate("/dashboard");
    } catch (err) {
      console.error("Login attempt failed:", err);
      // Display the specific mock error
      setError(err.message || t("login.genericError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
        direction: i18n.dir(),
        fontFamily: isAmharic
          ? 'Nyala, "Abyssinica SIL", serif'
          : "Roboto",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          {t("login.welcome")}
        </Typography>

        {isConfigError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t("System Error")}: {t("login.authDisabled")}
          </Alert>
        )}

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
            <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label={t("login.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isFormDisabled}
              required
              variant="outlined"
              size="small"
              inputProps={{ 'aria-label': 'Email Address' }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 4 }}>
            <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label={t("login.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isFormDisabled}
              required
              variant="outlined"
              size="small"
              inputProps={{ 'aria-label': 'Password' }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isFormDisabled}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              backgroundColor: "#0C8040",
              "&:hover": {
                backgroundColor: "#1B5E20",
              },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t("login.loginButton")}
          </Button>
        </form>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t("login.forgotPassword")}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;