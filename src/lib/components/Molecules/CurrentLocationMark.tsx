import { useEffect, useState } from "react";
import useCurrentLocation from "@/src/lib/hooks/useLocationEffect";

const CurrentLocationMark = ({
  screenHookHeight,
}: {
  screenHookHeight: number;
}) => {
  const [leftPosition, setLeftPosition] = useState<number>(0);
  const [topPosition, setTopPosition] = useState<number>(0);
  const { location } = useCurrentLocation();

  useEffect(() => {
    if (
      location == null ||
      location.latitude == null ||
      location.longitude == null
    ) {
    } else {
      let lat: number = location.latitude;
      let lng: number = location.longitude;

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

      // window.alert(`lat: ${lat}, lng: ${lng}, leftPosition: ${leftPosition}, topPosition: ${topPosition}`)
    }
  }, [location]);

  return leftPosition == 0 || topPosition == 0 ? null : (
    <div
      style={{
        position: "absolute",
        top: `${(screenHookHeight / 1000) * topPosition}px`,
        left: `${(screenHookHeight / 1000) * leftPosition}px`,
        width: 10,
        height: 10,
        zIndex: 100,
        transform: "scale(0.6)",
        pointerEvents: "none",
      }}
    >
      <div className="dot med">
        <span className="point">
          <span className="pulse"></span>
        </span>
      </div>
    </div>
  );
};

export default CurrentLocationMark;
