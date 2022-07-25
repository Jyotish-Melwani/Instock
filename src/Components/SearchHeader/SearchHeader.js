import { Link } from 'react-router-dom';
import SearchIcon from '../../Assets/Icons/search-24px.svg'
import './SearchHeader.scss'

const SearchHeader = (props) =>{  
    return(
        <>
            <div className='searchHeader'>
                <div className='searchHeader__header-container'>
                    <div className='searchHeader__title-container'>
                        <h1 className='searchHeader__title'>{props.title}</h1>
                    </div>
                    <div className='searchHeader__header-subContainer'>
                        <div className='searchHeader__input-container'>
                            <input className='searchHeader__input' type="text" placeholder='Search...'/>
                            <img className='searchHeader__input-icon' src={SearchIcon} alt="Search Magnifying Glass Icon" />
                        </div>
                        <div className='searchHeader__button-container'>
                            <Link to='/inventory/add'>
                                <button className='searchHeader__button'>{props.buttonText}</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchHeader;