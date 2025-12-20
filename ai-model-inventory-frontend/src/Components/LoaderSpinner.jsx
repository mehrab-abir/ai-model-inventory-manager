import React from "react";
import { BallTriangle } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4338CA"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoaderSpinner;
