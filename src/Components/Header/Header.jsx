import logo from '../../Assets/Logo/InStock-Logo.svg'
import {Link} from 'react-router-dom'
import './Header.scss'

const PageHeader = (props) => {
    const { isActive } = props;
    
    return (
        <nav className="page-header">
            <div className="page-header__logo-wrapper">
            <Link to="/">
                <img className="page-header__logo-img" src={logo} alt="instock logo"/>
            </Link>
            </div>
            <div className="page-header__wrapper">
                <Link 
                    className={isActive === "Warehouse" ? "page-header__link page-header__link--active" : "page-header__link"} 
                    to="/">
                        Warehouses
                </Link>
                <Link 
                    className={isActive === "Inventory" ? "page-header__link  page-header__link--active" : "page-header__link"} 
                    to="/inventory">
                        Inventory
                </Link>
            </div>
        </nav>
    )
}

export default PageHeader