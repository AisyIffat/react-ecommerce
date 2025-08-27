import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate, useParams, Link } from "react-router";

const Header = (props) => {
  const { current, title = "Welcome To My Store" } = props;
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
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button
          variant={current === "home" ? "contained" : "outlined"}
          color="primary"
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button
          variant={current === "cart" ? "contained" : "outlined"}
          color="primary"
          component={Link}
          to="/cart"
        >
          Cart
        </Button>
        <Button
          variant={current === "orders" ? "contained" : "outlined"}
          color="primary"
          component={Link}
          to="/orders"
        >
          My Orders
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
