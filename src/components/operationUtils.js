// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";

const withdraw = function () {};
const deposit = function () {};

const deleteTranscription = function (id) {
  fetch(`http://localhost:3001/transaction/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => console.log(response.json()));
};
const getCategories = function (setCategories, result) {
  const categorySums = {};
  if (result) {
    result.forEach((item) => {
      const { amount, category } = item;

      if (!categorySums[category]) {
        categorySums[category] = amount;
      } else {
        categorySums[category] += amount;
      }
    });
    setCategories(categorySums);
    console.log(categorySums);
  }
  console.log(categorySums);
  const categories = [
    { amount: 34, category: "food" },
    { amount: 12, category: "bus" },
  ];
  return categories;
};

module.exports = { withdraw, deposit, getCategories, deleteTranscription };
