import trashInfos from "@/src/lib/trashInfos";

const TrashMarks = ({ screenHookHeight }: { screenHookHeight: number }) => {
  return (
    <>
      {trashInfos.map((trashInfo) => (
        <div
          key={`trash-illustrations-${trashInfo.index}`}
          style={{
            position: "absolute",
            top: `${(screenHookHeight / 1000) * trashInfo.y}px`,
            left: `${(screenHookHeight / 1000) * trashInfo.x}px`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <img
            src={"./img/illustrations/trash.webp"}
            height={(20 / 1000) * screenHookHeight}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default TrashMarks;
