import { useState, useContext, useEffect, useCallback } from "react";
import StockContext from "../StockContext";
import Papa from "papaparse";

// Next day task is to add form conditions to check
// only string value for stock symbol. recommendations for stock symbols
// quantity to only have positive values and integer
// purchase price can be float and have to be positive values

const Form = () => {
  const [formData, setFormData] = useState({
    stocksymbol: "",
    quantity: "",
    purchase_price: "",
  });

  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Load and parse the CSV file
    //fetch('/listing_status.csv')
    const csvFileUrl = "/SE100-CapstoneProject/listing_status.csv";
    fetch(csvFileUrl)
      .then((response) => response.text())
      .then((csvString) => {
        Papa.parse(csvString, {
          header: true,
          complete: (results) => {
            setSuggestions(results.data.map((item) => item.symbol));
          },
        });
      });
  }, []);

  // Access the setSubmittedData function from the context
  const { setSubmittedData } = useContext(StockContext);

  const validateField = useCallback(
    (name, value) => {
      let errorMsg = "";
      if (name === "stocksymbol") {
        if (!suggestions.includes(value.toUpperCase())) {
          errorMsg = "Please enter a valid stock symbol.";
        }
      } else if (name === "quantity") {
        if (!Number.isInteger(+value) || +value < 0) {
          errorMsg = "Quantity must be a non-negative integer.";
        }
      } else if (name === "purchase_price") {
        if (isNaN(value) || +value < 0) {
          errorMsg = "Purchase price must be a non-negative number.";
        }
      }
      return errorMsg;
    },
    [suggestions]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [validateField]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(Boolean)) {
      return;
    }
    setSubmittedData(formData);
    setFormData({
      stocksymbol: "",
      quantity: "",
      purchase_price: "",
    });
  };

  return (
    <div className="flex flex-col h-full w-full p-4 justify-between">
      <h2 className="text-sm font-bold tracking-tight sm:text-2xl dark:text-gray-300 dark:bg-black-lighter text-center antialiased font-bold mb-4">
        Please input your stock purchase details below
      </h2>
      <form
        className="flex flex-col justify-between flex-grow"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6 flex-grow">
          <div>
            <label
              htmlFor="stocksymbol"
              className="dark:text-gray-300 block text-sm font-medium text-gray-700 mb-4 antialiased font-bold"
            >
              Stock Symbol
            </label>
            <input
              type="text"
              name="stocksymbol"
              id="stocksymbol"
              className="dark:text-black text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Insert your 4 letter stock symbol e.g AAPL"
              onChange={handleChange}
              value={formData.stocksymbol}
            />
            {errors.stocksymbol && (
              <p className="text-red-500">{errors.stocksymbol}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="dark:text-gray-300 block text-sm font-medium text-gray-700 mb-4 antialiased font-bold"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="dark:text-black text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Insert your quantity purchased"
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs italic">{errors.quantity}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="purchase_price"
              className="dark:text-gray-300 block text-sm font-medium text-gray-700 mb-4 antialiased font-bold"
            >
              Purchase Price
            </label>
            <input
              type="number"
              name="purchase_price"
              id="purchase_price"
              className="dark:text-black text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Insert your purchase price"
              onChange={handleChange}
              value={formData.purchase_price}
            />
            {errors.purchase_price && (
              <p className="text-red-500 text-xs italic">
                {errors.purchase_price}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-min-20 self-end justify-self-end py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit details
        </button>
      </form>
    </div>
  );
};

export default Form;
