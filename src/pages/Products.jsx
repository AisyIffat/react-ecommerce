import { Link } from "react-router";
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
import Typography from "@mui/material/Typography";
import { getProducts, deleteProduct } from "../utils/api_products";
import { AddToCart } from "../utils/cart";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // get products from API
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        // delete product at the backend
        await deleteProduct(id);

        // method #1: remove from the state manually
        // delete product from the state
        // setProducts(products.filter( (p) => p._id !== id ));

        // method #2: get the new data from the backend
        const updateProducts = await getProducts(category, page);
        setProducts(updateProducts);

        toast.success("Product has been deleted");
      }
    });
  };

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
            }}
          >
            Products
          </Typography>
          <Button
            component={Link}
            to="/products/new"
            variant="contained"
            color="success"
          >
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
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
              <Paper
                sx={{
                  p: "10px",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
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
                    label={"$ " + product.price}
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
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ my: "20px" }}
                  component={Link}
                  to="/cart"
                  onClick={() => {
                    AddToCart(product);
                    navigate("/cart")
                  }}
                >
                  Add To Cart
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/products/${product._id}/edit`}
                    variant="contained"
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleProductDelete(product._id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {products.length === 0 ? (
          <Typography variant="h5" align="center" py={3}>
            No more products found.
          </Typography>
        ) : null}
        <Box
          sx={{
            pt: 2,
            pb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1 ? true : false} // the button will be disabled if the page is 1
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            variant="contained"
            disabled={products.length === 0 ? true : false} // the button will be disabled if no more products
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
