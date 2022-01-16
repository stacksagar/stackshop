import React from "react";
import Input from "../../utilities/Input";

const AddressForm = ({state, stateHandler}) => {
  return (
    <div className="flex flex-col space-y-5 py-5">
      <div className="flex items-center space-x-5">
        <Input
          value={state?.name || ""}
          onChange={stateHandler}
          notLabel={true}
          np={true}
          name="name"
        />
        <Input
          value={state?.number || ""}
          onChange={stateHandler}
          notLabel={true}
          np={true}
          name="number"
        />
      </div>
      <Input
        value={state?.address || ""}
        onChange={stateHandler}
        notLabel={true}
        np={true}
        name="address"
      />
      <div className="flex space-x-5">
        <Input
          value={state?.district || ""}
          onChange={stateHandler}
          notLabel={true}
          np={true}
          name="district"
        />
        <Input
          value={state?.postcode || ""}
          onChange={stateHandler}
          notLabel={true}
          np={true}
          name="postcode"
        />
      </div>
      <div className="flex items-center space-x-5">
        <Input
          value={state?.alternate_number || ""}
          onChange={stateHandler}
          notLabel={true}
          name="alternate_number"
          placeholder="alternate number  (optinal)"
        />
        <div className="w-full h-12 flex justify-around items-center">
          <b>Address Type: </b>
          <label className="flex items-center space-x-1" htmlFor="Home">
            <span>Home</span>
            <input
              onChange={stateHandler}
              type="radio"
              name="addressType"
              value="home"
              id="Home"
              checked={state?.addressType === "home"}
            />
          </label>
          <label className="flex items-center space-x-1" htmlFor="Office">
            <span>Office</span>
            <input
              onChange={stateHandler}
              type="radio"
              name="addressType"
              value="office"
              id="Office"
              checked={state?.addressType === "office"}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
