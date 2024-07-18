// Plan: in mobile, have a 50:50 ratio. left will be the wording results, right will be the graph
// in desktop, have a 40:60 ratio. left will be the wording results, right will be the graph
// IC1CPR5W7ALA6QHZ
import StockChart from "./Stockchart";
import ResultsInfo from "./ResultsInfo";
import StockContext from "../StockContext";
import { useContext } from "react";

const Result = () => {
  const { stockDataList, monthlyDataList, currentPage, setCurrentPage } =
    useContext(StockContext);
  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < stockDataList.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Check if data is available before rendering components that depend on it
  const isDataAvailable =
    stockDataList.length > 0 && monthlyDataList.length > 0;

  return (
    <div className="flex flex-col h-full w-full p-4">
      <h2 className="text-4xl font-bold tracking-tight sm:text-4xl dark:text-gray-300 text-center mb-4">
        Stock Profit/Loss Summary {monthlyDataList.length > 0 ? currentPage + 1 : ''}
      </h2>
      {isDataAvailable ? (
        <div className="flex flex-grow grid grid-cols-2 md:grid-cols-3 gap-2 w-full h-full">
          <div className="col-span-1 md:col-span-1 flex justify-center items-center">
            <ResultsInfo data={stockDataList[currentPage]} />
          </div>
          <div className="flex col-span-1 md:col-span-2 justify-center items-center w-full h-full">
            <StockChart data={monthlyDataList[currentPage]} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center content-center w-full h-full">No stocks available</div>
      )}
      <div className="flex justify-end items-end w-full mt-auto">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="text-black bg-white hover:text-gray-800 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === stockDataList.length - 1}
          className="text-black bg-white hover:text-gray-800 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 dark:hover:text-white transition-colors ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Result;
