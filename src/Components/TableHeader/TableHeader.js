import sortArrow from '../../Assets/Icons/sort-24px.svg'
import './TableHeader.scss'
import React,{useEffect, useRef} from 'react'

const TableHeader = (props) =>{  

    const fifthHeader = useRef([])

    useEffect(()=>{
        if (props.fifthHeader === null){
            fifthHeader.current.classList.add('tableHeader__container--hidden')
        } 
    })

    return(
        <>
            <div className='tableHeader'>
                <div className={`tableHeader__container tableHeader__${props.className}-container--primary`}>
                    <p className='tableHeader__title'>{props.firstHeader}</p>
                    <img className='tableHeader__icon' src={sortArrow} alt="Sorting Arrows Button"/>
                </div>
                <div className={`tableHeader__container tableHeader__${props.className}-container--secondary`}>
                    <p className='tableHeader__title'>{props.secondHeader}</p>
                    <img className='tableHeader__icon' src={sortArrow} alt="Sorting Arrows Button"/>
                </div>
                <div className={`tableHeader__container tableHeader__${props.className}-container--tertiary`}>
                    <p className='tableHeader__title'>{props.thirdHeader}</p>
                    <img className='tableHeader__icon' src={sortArrow} alt="Sorting Arrows Button"/>
                </div>
                <div className={`tableHeader__container tableHeader__${props.className}-container--quaternary`}>
                    <p className='tableHeader__title'>{props.fourthHeader}</p>
                    <img className='tableHeader__icon' src={sortArrow} alt="Sorting Arrows Button"/>
                </div>
                <div className={`tableHeader__container tableHeader__${props.className}-container--quinary`} ref={fifthHeader}>
                    <p className='tableHeader__title'>{props.fifthHeader}</p>
                    <img className='tableHeader__icon' src={sortArrow} alt="Sorting Arrows Button"/>
                </div>
                <div className={`tableHeader__container tableHeader__${props.className}-container--senary`}>
                    <p className='tableHeader__title'>{props.sixthHeader}</p>
                </div>
            </div>
        </>
    )
}

export default TableHeader;