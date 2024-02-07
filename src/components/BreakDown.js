import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import NewCard from "./Card";
import CircularProgress from "@mui/joy/CircularProgress";

export default function BreakDown() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/transaction/").then((result) => {
      result.json().then((result) => {
        const categorySums = {};

        result.forEach((entry) => {
          const { category, amount } = entry;

          if (!categorySums[category]) {
            categorySums[category] = { category, amount: 0 };
          }

          categorySums[category].amount += amount;
        });

        const resultArray = Object.values(categorySums);
        setCategories(resultArray);
      });
    });
  }, [categories]);
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
            BreakDown
          </Typography>
          {categories ? (
            categories.map((elem) => (
              <NewCard category={elem.category} amount={elem.amount} />
            ))
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
