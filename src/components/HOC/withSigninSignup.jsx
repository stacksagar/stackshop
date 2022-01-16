import React, {useEffect, useState} from "react";
import axiosInstance from "../../helpers/axiosInstance";
import {useHistory} from "react-router-dom";

const withSigninSignup = (WrappedComponent, actionUrl) => {
  return () => {
    const history = useHistory();
    const [formState, setFormState] = useState({});
    const [error, setError] = useState({});
    const [fetching, setFetching] = useState(false);
    const [photo, setPhoto] = useState("");

    useEffect(() => {
      if (photo) {
        setFormState((prev) => ({...prev, photo}));
      }
    }, [photo]);

    const handleFormState = (e) =>
      setFormState((prev) => ({...prev, [e.target.name]: e.target.value}));

    const fetchHandler = (e) => {
      setFetching(true);
      e.preventDefault();
      axiosInstance.post(actionUrl, formState).then(({data}) => {
        setFetching(false);
        if (data.error) {
          setError({error: data.error});
        } else {
          setError({});
          setFormState({});
          history.replace("/");
        }
      });
    };

    return (
      <WrappedComponent
        setPhoto={setPhoto}
        handleFormState={handleFormState}
        fetchHandler={fetchHandler}
        fetching={fetching}
        error={error}
      />
    );
  };
};

export default withSigninSignup;
