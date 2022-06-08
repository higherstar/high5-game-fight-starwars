import React from 'react';

import SeatDetailsSvg from '../assets/images/seat-details.svg';

const SeatSelectModal = ({open, title, data, handleSelect, handleClose}) => {
  return (
    <>
      {
        open && <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center py-[10%] bg-[#00000070]">
          <div className="max-h-[85vh] max-w-[600px] w-full flex flex-col overflow-hidden max-w-full m-5 bg-white rounded">
            <div className="flex md:flex-col px-4">
              <div className="flex flex justify-end flex-1 text-2xl cursor-pointer" onClick={handleClose}>
                x
              </div>
              <h2 className="order-[-1] md:order-[1] font-bold text-[24px] leading-[28px] md:text-[36px] md:leading-[39px]">{title}</h2>
            </div>
            <div className="flex-1 overflow-auto pt-3 px-8">
              <div className="flex flex-col items-center">
                <h2 className="font-bold text-3xl -mt-4 mb-5">{ data?.seatDesignator } Economic</h2>
        
                <div className="flex">
                  <div className="w-32 mr-10">
                    <img src={SeatDetailsSvg} alt="" />
                  </div>
                  <ul className="py-6 px-4 list-disc">
                    {
                      data?.seatCharacteristics.map(characteristic => (
                        <li key={characteristic.value}>{characteristic.value}</li>
                      ))
                    }
                  </ul>
                </div>
                {
                  data.seatPaxAmount &&
                  <div className="text-center mt-5">
                    <p className="font-bold text-4xl">{data.seatPaxAmount[0].price.net} {data.seatPaxAmount[0].price.currency}</p>
                  </div>
                }
        
                <div className="flex items-center py-6">
                  <button className="rounded bg-blue-600 mx-4 text-white hover:opacity-90 px-6 py-1.5" onClick={handleSelect}>Select</button>
                  <button className="rounded hover:bg-gray-100 mx-4 px-6 py-1.5" onClick={handleClose}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default SeatSelectModal;