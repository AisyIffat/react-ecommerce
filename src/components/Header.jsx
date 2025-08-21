import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate, useParams, Link } from "react-router";

const Header = () => {
  return (
    <Box
      sx={{
        py: 4,
        textAlign: "center",
        borderBottom: "1px solid #ddd",
        mb: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "700",
          mb: 3,
        }}
      >
        Welcome to My Store
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 1 }}
          component={Link}
          to="/cart"
        >
          Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
