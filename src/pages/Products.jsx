import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // get products from API
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  return (
    <>
      <Box
        fullWidth
        sx={{
          textAlign: "center",
        }}
      >
        <h1>
          <b>Welcome to My Store</b>
        </h1>
      </Box>
      <Container>
        <hr />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Products</h2>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            paddingBottom: "10px",
          }}
        >
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white", paddingRight: "5px" }}
            >
              Filter By Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                <Paper sx={{ p: "10px", minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h2>{product.name}</h2>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      size="small"
                      label={product.price}
                      variant="outlined"
                      color="success"
                    />
                    <Chip
                      size="small"
                      label={product.category}
                      variant="outlined"
                      color="error"
                    />
                  </Box>
                  <Button fullWidth variant="contained" sx={{ my: "20px" }}>
                    Add To Cart
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip label="Edit" color="primary" />
                    <Chip label="Delete" color="error" />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
