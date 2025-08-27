import axios from "axios";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Container, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { getOrders, updateOrder, deleteOrder } from "../utils/api_orders";

const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        // putting the data into orders state
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page load

  console.log(orders);

  const removeOrder = (order) => {
    // 1. remove order
    const updatedOrder = cart.filter((item) => item._id !== product._id);
    // 2. update the cart data in local storage and the state
    updateCart(updatedCart);
    // 3. update the state
    setCart(updatedCart);
  };

  const handleUpdate = async (_id, status) => {
    try {
      await updateOrder(_id, status);
      toast.success("Product has been updated");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteOrder(_id);

        const updateOrders = await getOrders(_id);
        setOrders(updateOrders);

        toast.success("Product has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>
                      {order.customerName}
                      <br />({order.customerEmail})
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {order.products.map((product) => (
                      <Typography>{product.name}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={order.status}
                        label="Status"
                        onChange={(event) =>
                          handleUpdate(order._id, event.target.value)
                        }
                        disabled={order.status === "pending" ? true : false}
                      >
                        <MenuItem value={"pending"} disabled>
                          Pending
                        </MenuItem>
                        <MenuItem value={"paid"}>Paid</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                        <MenuItem value={"completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{order.paid_at}</TableCell>
                  <TableCell>
                    {order.status === "pending" ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleDelete(order._id);
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrdersPage;
