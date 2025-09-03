import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { signup } from "../utils/api_signup";
import { Button, Typography, Chip, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async (event) => {
    // 1. check for error
    try {
      if (!name || !email || !password) {
        toast.error("Please fill up the required fields");
      } else if (password !== confirmPassword) {
        toast.error("Password does not match");
      } else {
        // 2. trigger the API to create new product
        await signup(name, email, password);
        // 3. if successful, redirect user back to home page and show success message
        toast.success("New user has been added");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header current="signup" title="Create a New Account" />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box mb={2}>
            <Typography variant="h6">Name</Typography>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Email</Typography>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Password</Typography>
            <TextField
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Confirm Password</Typography>
            <TextField
              label="Confirm Password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
