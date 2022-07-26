import "./Styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WarehousePage from "./Pages/Warehouse/WarehousePage";
import InventoryPage from "./Pages/Inventory/InventoryPage";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={WarehousePage} />
        <Route path='/warehouse' component={WarehousePage} />
        <Route path='/inventory' component={InventoryPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
