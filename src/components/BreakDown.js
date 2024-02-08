import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import NewCard from "./Card";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BreakDown() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleClose = () => setOpen(false);

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
  useEffect(() => {
    fetch(`http://localhost:3001/transaction/${hoveredCategory}`).then(
      (result) => {
        result.json().then((result) => {
          setTransactions(result);
        });
      }
    );
  }, [hoveredCategory]);

  const handleMouseOver = (category) => {
    setHoveredCategory(category);
    setOpen(true);
  };

  const handleMouseOut = () => {
    setHoveredCategory(null);
    setOpen(false);
  };

  return (
    <>
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
                <NewCard
                  key={elem.category}
                  category={elem.category}
                  amount={elem.amount}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
              ))
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {hoveredCategory}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {transactions ? (
              transactions.map((transaction) => (
                <div>
                  {transaction.vendor} - {transaction.category} :
                  {transaction.amount}$
                </div>
              ))
            ) : (
              <CircularProgress />
            )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
