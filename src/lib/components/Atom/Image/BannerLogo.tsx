import React from "react";

const BannerLogo = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={"/img/header.webp"}
        alt={"Header Image"}
        placeholder={"blur"}
        style={{ height: "90%", width: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default BannerLogo;
