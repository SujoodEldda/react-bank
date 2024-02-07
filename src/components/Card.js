import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React from "react";

export default function NewCard({ category, amount }) {
  return (
    <Card
      sx={{
        width: "250px",
        height: "30px",
        margin: "20px",
      }}
    >
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{
          textAlign: "left",
          marginTop: "3px",
          marginLeft: "10px",
          color: "#455a64",
        }}
      >
        {category}: {amount}
      </Typography>
    </Card>
  );
}
