import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function Transaction({ transaction, handleBalance }) {
  const amountBackgroundColor = transaction.amount > 0 ? "#64ffda" : "#ff5252";
  const deleteTranscription = function (id) {
    fetch(`http://localhost:3001/transaction/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response));
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
            </Grid>
            <Grid item xs={6}>
              <div style={{ backgroundColor: amountBackgroundColor }}>
                {transaction.amount}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>{transaction.category}</div>{" "}
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteTranscription(transaction._id);
                  handleBalance(transaction.amount);
                }}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
