import { Container, Button, Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { deleteItemFromCart } from "../utils/cart";
import Swal from "sweetalert2";

const CartPage = () => {
  const navigate = useNavigate();

  const dataInLocalStorage = localStorage.getItem("carts");
  const carts = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];

  let totalPrice = 0;
  const priceArray = carts.map((cart) => cart.price * cart.quantity);
  for (let i = 0; i < priceArray.length; i++) {
    totalPrice = totalPrice + priceArray[i];
  }

  return (
    <>
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
          Cart
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 1 }}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button variant="contained" color="primary" sx={{ ml: 1 }}>
            Cart
          </Button>
        </Box>
      </Box>
      <Container sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.length > 0 ? (
                carts.map((cart) => (
                  <TableRow
                    key={cart.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {cart.name}
                    </TableCell>
                    <TableCell align="right">$ {cart.price}</TableCell>
                    <TableCell align="right">{cart.quantity}</TableCell>
                    <TableCell align="right">
                      $ {cart.price * cart.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
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
                              deleteItemFromCart(cart.id);
                              navigate("/cart");
                            }
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    No Product Add Yet!
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">$ {totalPrice}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={carts.length === 0}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
