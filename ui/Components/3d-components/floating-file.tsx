"use client";
import { useMousePosition } from "@/ui/Components/hooks/use-mouse-position";

const FloatingFile = ({
  name,
  type,
}: {
  name: string;
  type: "file" | "folder" | undefined;
}) => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed pointer-events-none bg-transparent  text-xs  flex items-center gap-2"
      style={{
        left: x,
        top: y - 20,
      }}
    >
      <div
        className={`w-5 h-5 rounded-full ${
          type === "folder" ? "bg-folder" : "bg-file"
        }`}
      />
      <div className={"bg-white/90 text-black px-2 py-1 rounded shadow"}>
        {name}
      </div>
    </div>
  );
};
export default FloatingFile;
