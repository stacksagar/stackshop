import React, {useEffect, useState} from "react";

const Message = ({message, error}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message?.length > 0) {
      setShow(true);
    }
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [message]);

  if (!show) return <></>;
  return (
    <div className="w-full fixed z-50 top-16 inset-x-0 flex justify-center items-center">
      <p
        style={{minWidth: "100px"}}
        className={`px-4 py-2 rounded border ${
          error
            ? "bg-red-500 text-red-200 border-red-300"
            : "bg-green-600 border-green-300"
        }`}
      >
        {message?.length > 3 ? message : "something wrong!"}
      </p>
    </div>
  );
};

export default Message;
