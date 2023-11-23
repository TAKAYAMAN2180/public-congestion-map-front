import { useEffect, useState } from "react";

const CongestionSentence = ({
  congestionLevel,
}: {
  congestionLevel: number;
}) => {
  const [content, setContent] = useState<string>("");
  const [underlineColor, setUnderlineColor] = useState<string>("#FFFFFF");

  useEffect(() => {
    switch (congestionLevel) {
      case 0:
        setContent("中止しています");
        setUnderlineColor("#999999");
        break;
      case 1:
        setContent("空いています");
        setUnderlineColor("#0099ff");
        break;
      case 2:
        setContent("少し混雑しています");
        setUnderlineColor("#ffcc00");
        break;
      case 3:
        setContent("混雑しています");
        setUnderlineColor("#ff0000");
        break;
    }
  }, [congestionLevel]);

  return (
    <span
      style={{
        fontSize: "1.7rem",
        marginLeft: "1rem",
        fontWeight: "bold",
        borderBottom: `3.5px solid ${underlineColor}`,
        paddingBottom: "0.02rem",
      }}
    >
      {content}
    </span>
  );
};

export default CongestionSentence;
