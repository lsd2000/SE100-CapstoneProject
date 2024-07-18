import React, { createContext, useState, useEffect, useCallback} from "react";


//Understood that I have to do error handling here when doing the api call to display an error. However, realized it too late
// and have already did a field form check with the csv file before users are allowed to submit, which might not be updated  
// as compared to calling with API. Will simply catch the error but will not happen since user can't submit it in the first place, which maybe inaccurate

// Not sure if I have used callback correctly, please advice as well :D 

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockDataList, setStockDataList] = useState([]);
  const [monthlyDataList, setMonthlyDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [submittedData, setSubmittedData] = useState({
    stocksymbol: "",
    quantity: "",
    purchase_price: "",
  });

  // Memoized data fetch function
  const fetchData = useCallback(() => {
    if (submittedData.stocksymbol) {
      const dailyUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${submittedData.stocksymbol}&apikey=6CTGGE3DBL4UMPNI`;
      const monthlyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${submittedData.stocksymbol}&apikey=6CTGGE3DBL4UMPNI`;

      Promise.all([
        fetch(dailyUrl).then(res => res.json()),
        fetch(monthlyUrl).then(res => res.json())
      ])
      .then(([dailyData, monthlyData]) => {
        if (dailyData["Global Quote"]) {
          const combinedData = {
            ...dailyData["Global Quote"],
            userInputs: submittedData,
          };
          setStockDataList(prev => [...prev, combinedData]);
          setCurrentPage(stockDataList.length);
        }

        if (monthlyData["Monthly Time Series"]) {
          const series = monthlyData["Monthly Time Series"];
          const formattedData = Object.keys(series).map(key => ({
            date: key,
            open: parseFloat(series[key]["1. open"]),
            high: parseFloat(series[key]["2. high"]),
            low: parseFloat(series[key]["3. low"]),
            close: parseFloat(series[key]["4. close"]),
            volume: parseInt(series[key]["5. volume"]),
          }));
          setMonthlyDataList(prev => [...prev, formattedData]);
        }
      })
      .catch(error => {
        console.error("API error:", error);
      });
    }
  }, [submittedData]);  // Dependencies array

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StockContext.Provider
      value={{
        stockDataList,
        setStockDataList,
        monthlyDataList,
        setMonthlyDataList,
        submittedData,
        setSubmittedData,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
