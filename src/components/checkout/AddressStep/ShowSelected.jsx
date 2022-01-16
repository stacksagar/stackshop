import React from "react";

const ShowSelected = ({selectedAddress}) => {
  return (
    <div className="relative">
      <b className="absolute right-12 inset-y-0 my-auto w-20 h-6">
        {selectedAddress?.addressType}
      </b>
      <div className="flex space-x-5">
        <p className="w-20 flex justify-between">
          <b>Name</b>
          <b>:</b>
        </p>
        <p>{selectedAddress?.name}</p>
      </div>
      <div className="flex space-x-5">
        <p className="w-20 flex justify-between">
          <b>Contact</b>
          <b>:</b>
        </p>
        <p>{selectedAddress?.number}</p>
      </div>
      <div className="flex space-x-5">
        <p className="w-20 flex justify-between">
          <b>Address</b>
          <b>:</b>
        </p>
        <p>{selectedAddress?.address}</p>
      </div>
    </div>
  );
};

export default ShowSelected;
