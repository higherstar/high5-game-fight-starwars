import React, { useContext } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";

const BookDetail = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  console.log(state)
  const backToBookTrip = () => {
    navigate('/', { replace: false });
  }

  return (
    <div>
      <h1 className="text-center mb-8 mt-6 text-2xl">Book detail</h1>
      <div className="flex flex-col w-full max-w-[600px] shadow-md mx-auto p-6 rounded-md mt-5">
        {
          state.tripData &&
          <div className=" w-full">
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">People: </span>
              <p className="text-xl">{state.tripData.people.label}</p>
            </div>
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">Trip Type: </span>
              <p className="text-xl">{state.tripData.isOnewayTrip ? 'One way' : 'Round Trip'}</p>
            </div>
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">Start Date: </span>
              <p className="text-xl">{moment(state.tripData.startDate).format('MM/DD/YYYY')}</p>
            </div>
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">End Date: </span>
              <p className="text-xl">{moment(state.tripData.endDate).format('MM/DD/YYYY')}</p>
            </div>
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">Departure Planet: </span>
              <p className="text-xl">{state.tripData.departurePlanet.label}</p>
            </div>
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">Destination Planet: </span>
              <p className="text-xl">{state.tripData.destinationPlanet.label}</p>
            </div>
            <div className="mb-6 flex">
              <span className="text-xl font-medium w-[250px]">Vehicle: </span>
              <p className="text-xl">{state.tripData.vehicle.label}</p>
            </div>
            {
              state.tripData?.seat &&
              <div className="mb-6 flex">
                <span className="text-xl font-medium w-[250px]">Seat: </span>
                <p className="text-xl">{state.tripData?.seat?.seatDesignator}</p>
              </div>
            }
          </div>
        }
        <div className="flex justify-end mt-7">
          <button onClick={backToBookTrip} className="min-w-[150px] text-xl bg-white text-blue-600 border-blue-600 border-solid border-2 rounded whitespace-nowrap py-2 outline-0">
            Back
          </button>
          <button className="min-w-[150px] text-xl text-white bg-blue-600 rounded whitespace-nowrap py-2 ml-2 outline-0">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookDetail;

