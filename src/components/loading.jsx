import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/DotLoader";

const Loading = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="sweet-loading">
        <ClipLoader css={override} size={150} color={"#000"} loading={true} />
      </div>
    </div>
  );
};

export default Loading;
