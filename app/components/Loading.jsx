import React from "react";
import { DNA } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <h1 className="font-bold">loading</h1>
    </div>
  );
};

export default Loading;
