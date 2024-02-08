import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";

export default function Operations({ handleBalance }) {
  const [category, setCategory] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [amount, setAmount] = useState(null);
  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState("You should fill all the fields above!");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const clearAll = function () {
    setAmount(null);
    setVendor(null);
    setCategory(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const checkInsertion = function () {
    if (amount && vendor && category) {
      return true;
    }
    return false;
  };

  const successMess = function (word) {
    setMess("Your operations of " + word + " have been successfully done!");
    setOpen(true);
  };
  const deposit = function () {
    console.log(category);
    if (!checkInsertion()) {
      setOpen(true);
      return;
    }
    fetch(`http://localhost:3001/transaction/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, vendor, category }),
    }).then((response) => console.log(response));
    handleBalance(amount);
    successMess("depositing");
    clearAll();
  };

  const withdraw = function () {
    if (!checkInsertion()) {
      setOpen(true);
      return;
    }
    fetch(`http://localhost:3001/transaction/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: -amount, vendor, category }),
    }).then((response) => console.log(response));
    handleBalance(-amount);
    successMess("withdrawing");
    clearAll();
  };

  return (
    <Card sx={{ width: "400px", marginLeft: "20px", marginTop: "20px" }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#455a64" }}
          >
            Insert Transactions
            <TextField
              id="transaction-amount"
              label="Transaction amount"
              variant="standard"
              value={amount}
              onChange={handleAmountChange}
            />
            <TextField
              id="transaction-vendor"
              label="Transaction vendor"
              variant="standard"
              value={vendor}
              onChange={handleVendorChange}
            />
            <TextField
              sx={{ marginRight: "10px" }}
              id="transaction-category"
              label="Transaction category"
              variant="standard"
              value={category}
              onChange={handleCategoryChange}
            />
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ marginRight: "10px" }}
            onClick={deposit}
          >
            Deposit
          </Button>
          <Button variant="outlined" color="error" onClick={withdraw}>
            Withdraw
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={mess}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
