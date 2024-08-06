import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";

const Cart = () => {
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

  return (
    <>
      {Loadingstate ? (
        <>
          <Loading />
        </>
      ) : (
        "home page"
      )}
    </>
  );
};

export default Cart;
