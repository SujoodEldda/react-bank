import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import CircularProgress from "@mui/joy/CircularProgress";

export default function Transactions({ handleBalance }) {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/transaction/").then((result) => {
      result.json().then((result) => {
        setTransactions(result);
      });
    });
  }, [transactions]);
  return (
    <>
      {transactions ? (
        transactions.map((transaction) => (
          <Transaction
            transaction={transaction}
            handleBalance={handleBalance}
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
