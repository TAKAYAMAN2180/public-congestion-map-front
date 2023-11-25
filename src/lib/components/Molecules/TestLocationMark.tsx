import React from "react";

const TestLocationMark = ({
  screenHookHeight,
}: {
  screenHookHeight: number;
}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 1348.7}px`,
          top: `${(screenHookHeight / 1000) * 415.0}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "red" /*背景色*/,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 1348.7}px`,
          top: `${(screenHookHeight / 1000) * 217.1}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "blue" /*背景色*/,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 283.5}px`,
          top: `${(screenHookHeight / 1000) * 430.9}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "brown" /*背景色*/,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 687.1}px`,
          top: `${(screenHookHeight / 1000) * 321.8}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "green" /*背景色*/,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 1009.1}px`,
          top: `${(screenHookHeight / 1000) * 599.8}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "yellow" /*背景色*/,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 1103.1}px`,
          top: `${(screenHookHeight / 1000) * 642}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "yellowgreen" /*背景色*/,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${(screenHookHeight / 1000) * 1093.5}px`,
          top: `${(screenHookHeight / 1000) * 414.0}px`,
          width: 1,
          height: 1,
          borderRadius: "50%",
          backgroundColor: "aliceblue" /*背景色*/,
        }}
      />
    </>
  );
};

export default TestLocationMark;
