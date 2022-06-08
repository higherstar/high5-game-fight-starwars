import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import data from '../../../data/seat_map.json';
import NotAvailableSvg from '../../../assets/images/eco-seat-not-available.svg';
import PlayingSvg from '../../../assets/images/eco-seat-paying.svg';
import AvailableSvg from '../../../assets/images/eco-seat-available.svg';
import ActiveSeatSvg from '../../../assets/images/eco-seat-active.svg';
import SeatSelectModal from "../../../components/SeatSelectModal";
import { AppContext, SET_TRIP_DATA } from "../../../context/AppContext";

const SeatMap = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [rows, setRows] = useState([]);
  const [exitPositions, setExitPositions] = useState([]);
  const [activeSeat, setActiveSeat] = useState(null);
  
  useEffect(() => {
    if (data) {
      setRows(data.deck[0].rows);
      
      const exitPositionValues = data.deck[0].deckCharacteristics.exitRowPosition.rowPositions.map((position) => position.first);
      setExitPositions(exitPositionValues);
    }
  }, [])
  
  const selectSeat = (rowIndex, columnIndex) => {
    const seat = rows[rowIndex]?.seats[columnIndex];
    setActiveSeat(seat);
  };
  
  const unSelectSeat = () => {
    setActiveSeat(null);
  };
  
  const reverseSeat = () => {
    if (activeSeat) {
      const newRows = rows.map((row) => {
        row.seats = row.seats?.map((seat) => {
          if (seat.seatDesignator === activeSeat.seatDesignator) {
            seat = {
              ...seat,
              seatAvailability: 'Reserved'
            };
          }
          return seat;
        })
        return row;
      });
      
      setRows(newRows);
    }
    unSelectSeat();
  };
  
  const confirmSeat = () => {
    if (activeSeat) {
      dispatch({
        type: SET_TRIP_DATA,
        payload: { ...state.tripData, seat: activeSeat },
      });
    }
    navigate('/', { replace: false });
  }
  
  return (
    <div>
      <div className="flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl my-4">Seat Map</h1>
        <div className="flex w-min flex-col items-center">
          {
            rows.map((row, i) => (
              <div key={i}>
                {
                  exitPositions.includes(row.number) &&
                  <div className="flex justify-between w-full p-1 mb-2">
                    <span className="font-bold">Exit</span>
                    <span className="font-bold">Exit</span>
                  </div>
                }
                <div className="flex">
                  {
                    row.seats?.map((seat, j) => (
                      <div className="flex items-center mx-1 mb-2" key={j}>
                        <div className="flex flex-col items-center">
                          <div className="flex w-full">
                            {i === 0 && <span className="pb-1 text-center w-9">{seat.column}</span>}
                          </div>
                          <div className="flex items-center">
                            <div className="w-9 h-10">
                              {
                                seat.seatAvailability === 'Reserved' &&
                                <img className="w-full h-full" src={NotAvailableSvg} alt=""/>
                              }
                              {
                                seat.seatAvailability === 'Available' &&
                                <div className="cursor-pointer" onClick={() => selectSeat(i, j)}>
                                  {
                                    state.tripData?.seat?.id === seat.id ?
                                      <img className="w-full h-full" src={ActiveSeatSvg} alt=""/>
                                    :
                                      seat.seatPaxAmount
                                        ? <img className="w-full h-full" src={PlayingSvg} alt=""/>
                                        : <img className="w-full h-full" src={AvailableSvg} alt=""/>
                                  }
                                </div>
                              }
                            </div>
                            {
                              (j === 2 || j === 6) &&
                              <p className="pl-3 pr-1">
                                {row.number}
                              </p>
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <SeatSelectModal
        data={activeSeat}
        handleClose={reverseSeat}
        handleSelect={confirmSeat}
        open={!!activeSeat}
      />
    </div>
  )
}

export default SeatMap;