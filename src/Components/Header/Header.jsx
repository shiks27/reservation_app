import React, { useState } from 'react'
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCab, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
// import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import { useNavigate } from 'react-router-dom'
const Header = ({ type }) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");
    const [openOptions, setOpenOptions] = useState(false);
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    },
    ]);
    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
        room: 1,
    })
    const navigate=useNavigate();
    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }
    const handleSearch=()=>{
         navigate("/hotels",{state:{destination,date,options}});
    }
    return (
        <div className='header'>
            <div className={type==="list"? "headerContainer listMode":"headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCab} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxi's</span>
                    </div>
                </div>
                {type !=="list" &&<> <h1 className="headerTitle">
                    A lifetime of Discounts? It's genius
                </h1>
                    <p className="headerDesc">
                        Choose from cabins, houses and more
                    </p>
                    <button className="headerBtn">
                        Sign-In/Register
                    </button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className='headerIcon' />
                            <input type='text' placeholder='where are you going?' onChange={e=>setDestination(e.target.value)} className='handleSearchInput' />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                            <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate &&
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                />
                            }
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                            <span onClick={() => setOpenOptions(!openOptions)} className='handleSearchText'>{`${options.adults} adult . ${options.children} children .${options.room} room`}</span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOptions("adults", "i")}>+</button>
                                        <span className="optionCounterNumber">{options.adults}</span>
                                        <button className="optionCounterButton" disabled={options.adults < 1} onClick={() => handleOptions("adults", "d")}> -</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOptions("children", "i")}>+</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" disabled={options.children < 1} onClick={() => handleOptions("children", "d")}> -</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOptions("room", "i")}>+</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" disabled={options.room < 1} onClick={() => handleOptions("room", "d")}> -</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Header
