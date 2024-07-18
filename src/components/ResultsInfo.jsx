import React from "react";

const ResultsInfo = React.memo((props) => {
  if (!props) return null;

  let stockData = props.data;
  const userInputs = stockData.userInputs || {};

  let symbolName = stockData["01. symbol"] || "";
  let currentPrice = parseFloat(stockData["05. price"]) || "";
  let quantity = parseInt(userInputs.quantity) || "";
  let purchasePrice = parseFloat(userInputs.purchase_price) || "";

  let profitLoss = "";
  if (currentPrice !== "" && purchasePrice !== "" && quantity !== "") {
    profitLoss = (currentPrice - purchasePrice) * quantity;
  }

  const allDataAvailable =
    symbolName !== "" &&
    currentPrice !== "" &&
    quantity !== "" &&
    purchasePrice !== "" &&
    profitLoss !== "";

  return (
    <>
      {allDataAvailable && (
        <table className="table-auto ">
          <tbody>
            <tr>
              <th className="border px-4 py-2 text-left dark:text-gray-300 dark:bg-black-lighter">
                Symbol
              </th>
              <td className="border px-4 py-2 dark:text-gray-300 dark:bg-black-lighter min-w-[110px] ">
                {symbolName}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left dark:text-gray-300 dark:bg-black-lighter">
                Quantity
              </th>
              <td className="border px-4 py-2 dark:text-gray-300 dark:bg-black-lighter">
                {quantity}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left dark:text-gray-300 dark:bg-black-lighter">
                Purchase Price
              </th>
              <td className="border px-4 py-2 dark:text-gray-300 dark:bg-black-lighter">
                {purchasePrice !== "" ? `$${purchasePrice.toFixed(2)}` : ""}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left dark:text-gray-300 dark:bg-black-lighter">
                Current Price
              </th>
              <td className="border px-4 py-2 dark:text-gray-300 dark:bg-black-lighter">
                {currentPrice !== "" ? `$${currentPrice.toFixed(2)}` : ""}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left dark:text-gray-300 dark:bg-black-lighter">
                Profit/Loss
              </th>
              <td
                className={`border px-4 py-2 ${
                  profitLoss >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {profitLoss !== "" ? `$${profitLoss.toFixed(2)}` : ""}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
});

export default ResultsInfo;
