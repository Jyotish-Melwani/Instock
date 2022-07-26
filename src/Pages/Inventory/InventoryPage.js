import { Switch, Route } from "react-router-dom";
import InventoryItemDetails from '../../Components/InventoryItemDetails/InventoryItemDetails';
import EditInventory from '../../Components/EditInventory/EditInventory';
import PageHeader from "../../Components/Header/Header";
import InventoryList from "../../Components/InventoryList/InventoryList";
import AddInventory from "../../Components/AddInventory/AddInventory";
import './InventoryPage.scss'

function InventoryPage()  {

    return (
    <>
        <PageHeader isActive='Inventory' />
        <div className="component-wrapper">
                <Switch>
                    <Route path='/inventory' exact component={InventoryList} />
                    <Route path='/inventory/add'  component={AddInventory} /> 
                    <Route path='/inventory/edit/:id' component={EditInventory} />
                    <Route path='/inventory/:id'  component={InventoryItemDetails} />
                </Switch>
        </div>
    </>
    )
}

export default InventoryPage;