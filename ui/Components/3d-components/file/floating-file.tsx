"use client";
import { useMousePosition } from "@/ui/Components/hooks/use-mouse-position";
import Image, { StaticImageData } from "next/image";
import excelTex from "@/public/icon-tex/excel-tex.png";
import folderTex from "@/public/icon-tex/folder-tex.png";
import imageTex from "@/public/icon-tex/image-tex.png";
import musicTex from "@/public/icon-tex/music-tex.png";
import pdfTex from "@/public/icon-tex/pdf-tex.png";
import photoshopTex from "@/public/icon-tex/photoshop-tex.png";
import pptTex from "@/public/icon-tex/ppt-tex.png";
import pptxTex from "@/public/icon-tex/pptx-tex.png";
import videoTex from "@/public/icon-tex/video-tex.png";
import wordTex from "@/public/icon-tex/word-tex.png";
import zipTex from "@/public/icon-tex/zip-tex.png";
import { getTypeFromExtension } from "@/lib/extension";

const iconMap: Record<string, StaticImageData> = {
  image: imageTex,
  pdf: pdfTex,
  video: videoTex,
  word: wordTex,
  excel: excelTex,
  music: musicTex,
  photoshop: photoshopTex,
  ppt: pptTex,
  pptx: pptxTex,
  zip: zipTex,
  unknown: imageTex,
};

const FloatingFile = ({
  name,
  type,
}: {
  name: string;
  type: "file" | "folder" | "root" | undefined;
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
      {type === "folder" ? (
        <FolderIconTextured />
      ) : (
        <FileIconTextured name={name} />
      )}
      <div className={"bg-white/90 text-black px-2 py-1 rounded shadow"}>
        {name}
      </div>
    </div>
  );
};

const FolderIconTextured = () => {
  return <Image src={folderTex} alt={"folder-tex"} width={50} height={50} />;
};

const FileIconTextured = ({ name }: { name: string }) => {
  const ext = getTypeFromExtension(name.split(".").pop()?.toLowerCase());

  const src = iconMap[ext];
  return <Image src={src} alt={name} width={50} height={50} />;
};

export default FloatingFile;
