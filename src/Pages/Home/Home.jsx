import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";
import { delete_storedata, check_token } from "../../Utility/utility";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigation = useNavigate();
  const [Loadingstate, setLoadingstate] = useState(false);

  useEffect(() => {
    // Simulate a network request or other async operation
    const loadData = async () => {
      setLoadingstate(true);
      // Simulate a delay (e.g., fetch data from an API)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setLoadingstate(false);
    };
    loadData();
  }, []);

  const handel_click = async () => {
    // const isTokenValid = await check_access_token_is_valid();
    const isTokenValid = await check_token();
    if (isTokenValid) {
      console.log("token is valid");
    } else {
      console.log("token is not valid");
      console.log("deleting data");
      delete_storedata();
      navigation("/login");
      ``;
    }
  };

  return (
    <>
      {Loadingstate ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          "home page"
          <button
            onClick={() => {
              handel_click();
            }}
          >
            check token
          </button>
        </>
      )}
    </>
  );
};

export default Home;
