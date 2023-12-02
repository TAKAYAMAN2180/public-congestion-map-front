import { useEffect, useState } from "react";
import useCurrentLocation from "@/src/lib/hooks/useLocationEffect";
import styled, { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { atomMessageState } from "@/src/lib/recoilAtom";

interface MarkerProps {
  size: number;
}

const createPulse = (size: number) => keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 ${size}px rgba(0, 0, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 255, 0);
  }
`;

const Marker = styled.div<MarkerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: blue;
  border-radius: 50%;
  position: relative;
  animation: ${(props) => createPulse(props.size)} 2s infinite;
  border: ${(props) => props.size / 10}px solid ghostwhite;
`;

const CurrentLocationMark = ({
  screenHookHeight,
}: {
  screenHookHeight: number;
}) => {
  // CSSアニメーションが原因っぽい
  const [leftPosition, setLeftPosition] = useState<number>(0);
  const [topPosition, setTopPosition] = useState<number>(0);
  const { location } = useCurrentLocation();
  const [messageState, setMessageState] = useRecoilState(atomMessageState);
  const [isOk, setIsOk] = useState<boolean>(false);

  useEffect(() => {
    // window.alert(JSON.stringify(location));
    // console.log(JSON.stringify(location));
    if (
      location == null ||
      location.latitude == null ||
      location.longitude == null
    ) {
      // console.log("location == null→" + location == null);
      // console.log("location.latitude == null" + location.latitude == null);
      // console.log("location.longitude == null" + location.longitude == null);
      setMessageState(
        "現在位置の取得を許可すると、現在の位置の表示を許可することができます。",
      );
    } else {
      let lat: number = location.latitude;
      let lng: number = location.longitude;

      //let lat: number = 34.9785273;
      //let lng: number = 135.964968;
      // window.alert(`lat: ${(lat - 34.9) * 10000000}, lng: ${(lng - 34.9) * 10000000}`);

      if (lat == 0 || lng == 0) return;
      const leftPosition: number =
        -0.000589793087 * ((lng - 135.9) * 10000000.0) +
        -0.014783262 * ((lat - 34.9) * 10000000.0) +
        13338.8909;
      const topPosition: number =
        -0.0121005479 * ((lng - 135.9) * 10000000.0) +
        0.00082099908 * ((lat - 34.9) * 10000000.0) +
        7443.09013;

      setLeftPosition(leftPosition);
      setTopPosition(topPosition);

      //window.alert(`lat: ${lat}, lng: ${lng}, leftPosition: ${leftPosition}, topPosition: ${topPosition}`)

      if (
        leftPosition <= 0 ||
        leftPosition >= 1500 ||
        topPosition <= 0 ||
        topPosition >= 700
      ) {
        setMessageState(
          "現在位置が表示可能範囲の外側になっています。大学構内では現在地を表示することができます。",
        );
      } else {
        setIsOk(true);
        setMessageState("");
      }
    }
  }, [location, location.latitude, location.longitude, setMessageState]);

  return isOk ? (
    <div
      style={{
        position: "absolute",
        top: `${(screenHookHeight / 1000) * topPosition}px`,
        left: `${(screenHookHeight / 1000) * leftPosition}px`,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <Marker size={(16 / 1000) * screenHookHeight} />
    </div>
  ) : null;
};

export default CurrentLocationMark;
