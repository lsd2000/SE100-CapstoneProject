import "./App.css";
import DarkModeToggle from "./components/DarkModeToggle";
import Header from "./components/Header";
import Form from "./components/Form";
import Results from "./components/Results";
import { StockProvider } from "./StockContext";

function App() {
  
  /*const { stockDataList, setStockDataList, submittedData, setSubmittedData } = useContext(StockContext);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  useEffect(() => {
    // Ensure to use the context state for submittedData
    if (submittedData.stocksymbol) {
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${submittedData.stocksymbol}&apikey=demo`
      )
      .then((res) => res.json())
      .then((data) => {
        setStockDataList([...stockDataList, data["Global Quote"]]);
      });
    }
  }, [submittedData, stockDataList]); */

  return (
    <StockProvider>
      <div>
        <DarkModeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 ">
        <div className="col-span-1 md:col-span-5 min-h-[50vh] md:min-h-[30vh] my-2 rounded-lg border-2 border-gray-300 shadow-lg dark:shadow-gray-700 dark:border-gray-500 flex items-center justify-center">
          <Header />
        </div>
        <div className="md:col-span-2 col-span-1 min-h-[60vh] md:min-h-[58vh] rounded-lg border-2 border-gray-300 shadow-lg dark:shadow-gray-700 dark:border-gray-500 flex">
          <Form />
        </div>
        <div className="md:col-span-3 col-span-1 min-h-[50vh] md:min-h-[58vh] rounded-lg border-2 border-gray-300 shadow-lg dark:shadow-gray-700 dark:border-gray-500 flex items-center justify-center">
          <Results />
        </div>
      </div>
    </StockProvider>
  );
}

export default App;