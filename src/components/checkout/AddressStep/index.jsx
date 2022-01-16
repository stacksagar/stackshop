import React, {useEffect, useState} from "react";
import CheckoutStep from "../CheckoutStep";
import axiosInstance from "../../../helpers/axiosInstance";
import Button from "../../utilities/Button";
import ShowSelected from "./ShowSelected";
import AddressForm from "./Form";

const AddressStep = ({
  step,
  setOrderState,
  setCompletedStep,
  setActiveStep,
  ...all
}) => {
  const continue_handler = () => {};

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showANA, setShowANA] = useState(false);
  const [showEA, setShowEA] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [state, setState] = useState({});

  const stateHandler = (e) => {
    setState((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const addAddress = () => {
    if (Object.keys(state).length < 6) {
      return alert("something wrong!");
    }
    axiosInstance
      .post("/api/address/create", state)
      .then((res) => {
        setAddresses(
          res?.data.userAddress?.addresses?.map((ad) => ad?.address)
        );
        setShowANA(false);
        setState({});
      })
      .catch(console.log);
  };

  const updateAddress = (id) => {
    axiosInstance
      .put(`/api/address/${id}`, state)
      .then((res) => {
        setAddresses(
          res?.data.userAddress?.addresses?.map((ad) => ad?.address)
        );
        setShowANA(false);
        setShowEA(false);
        setState({});
      })
      .catch(console.log);
  };

  const deleteAddress = (id) => {
    axiosInstance
      .delete(`/api/address/${id}`)
      .then((res) =>
        setAddresses(res?.data.userAddress.addresses.map((ad) => ad?.address))
      )
      .catch(console.log);
  };

  useEffect(() => {
    axiosInstance
      .get("/api/address/user")
      .then((res) =>
        setAddresses(res?.data.userAddress.addresses.map((ad) => ad?.address))
      )
      .catch(console.log);
  }, []);

  return (
    <CheckoutStep
      {...all}
      step={step}
      completed={completed}
      continue_button={continue_handler}
      loading={false}
    >
      <div className="flex flex-col p-3">
        {Object.keys(selectedAddress).length > 0 ? (
          <ShowSelected selectedAddress={selectedAddress} />
        ) : (
          addresses.map((ad, i) => (
            <div
              onClick={() => setSelected(i)}
              key={i}
              className="bg-gray-100 hover:bg-gray-200 relative p-5 mt-5 cursor-pointer"
            >
              <div
                style={{padding: "2.5px"}}
                className="w-4 h-4 ring rounded-full absolute right-5 inset-y-0 my-auto"
              >
                {selected === i && (
                  <div className={`bg-blue-500 rounded-full w-full h-full`} />
                )}
              </div>
              <b className="absolute right-20 inset-y-0 my-auto w-20 h-6">
                {ad?.addressType}
              </b>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => deleteAddress(ad?._id)}
                  className=" text-xs text-white bg-red-500 px-3 py-1 rounded focus:ring"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setState(ad);
                    setShowEA(true);
                    setShowANA(false);
                  }}
                  className=" text-xs text-white bg-red-500 px-3 py-1 rounded focus:ring"
                >
                  Edit
                </button>
              </div>
              <div className="flex space-x-5">
                <p className="w-20 flex justify-between">
                  <b>Name</b>
                  <b>:</b>
                </p>
                <p>{ad?.name}</p>
              </div>
              <div className="flex space-x-5">
                <p className="w-20 flex justify-between">
                  <b>Contact</b>
                  <b>:</b>
                </p>
                <p>{ad?.number}</p>
              </div>
              <div className="flex space-x-5">
                <p className="w-20 flex justify-between">
                  <b>Address</b>
                  <b>:</b>
                </p>
                <p>{ad?.address}</p>
              </div>
              {selected === i && (
                <Button
                  onClick={() => {
                    setCompleted(true);
                    setSelectedAddress(ad);
                    setCompletedStep((prev) => [...prev, step]);
                    setActiveStep(step + 1);
                    setShowANA(false);
                    setShowEA(false);
                    setOrderState((p) => ({...p, address: ad._id}));
                  }}
                  text="Delivery Here"
                />
              )}
            </div>
          ))
        )}
        {(showANA || showEA) && (
          <AddressForm state={state} stateHandler={stateHandler} />
        )}

        <div className="flex justify-between">
          {!completed && (
            <Button
              onClick={() => {
                setState({});
                setShowEA(false);
                setShowANA(true);
              }}
              className="w-40 mt-2"
              danger={showANA}
              text={showANA ? "Cencel" : "Add New Address"}
            />
          )}
          {(showANA || showEA) && (
            <Button
              onClick={() => (showEA ? updateAddress(state._id) : addAddress())}
              className="w-40"
              text={showEA ? "Update Address" : "Add Address"}
            />
          )}
        </div>
      </div>
    </CheckoutStep>
  );
};

export default AddressStep;
