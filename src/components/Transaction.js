import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Transaction({ transaction, handleBalance }) {
  const [amount, setAmount] = useState(transaction.amount);
  const amountBackgroundColor = transaction.amount > 0 ? "#64ffda" : "#ff5252";
  const deleteTranscription = function (id) {
    fetch(`http://localhost:3001/transaction/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log("done"));
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    fetch(`http://localhost:3001/transaction/${transaction._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }).then((response) => console.log("done"));
    handleBalance(transaction.amount - amount);
  };

  return (
    <Card sx={{ width: "400px", marginLeft: "20px", marginTop: "20px" }}>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{ backgroundColor: "#80d8ff" }}>
                {transaction.vendor}
              </div>
              <br />
              <div>{transaction.description}</div>
            </Grid>
            <Grid item xs={6}>
              {/* <div style={{ backgroundColor: amountBackgroundColor }}>
                {transaction.amount}$
              </div> */}
              <TextField
                id="transaction-amount"
                label="transaction amount"
                variant="standard"
                value={amount}
                onChange={handleAmountChange}
                style={{ backgroundColor: amountBackgroundColor }}
              />
            </Grid>
            <Grid item xs={6}>
              <div>{transaction.category}</div>{" "}
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginRight: "10px" }}
                onClick={() => {
                  deleteTranscription(transaction._id);
                  handleBalance(transaction.amount);
                }}
              >
                DELETE
              </Button>
              <Button color="secondary" onClick={handleAmountChange}>
                EDIT
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
