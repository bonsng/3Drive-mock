import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { useModal } from "@/ui/Modal/modal.hook";
import { getTypeFromExtension } from "@/lib/extension";

const ContextMenu = ({
  id,
  type,
}: {
  id: string;
  type: "file" | "folder" | "root" | undefined;
}) => {
  const { contextMenuPos, nodeMap } = useFileTree();
  const content = nodeMap.get(id);
  const { openModal } = useModal(type === "file" ? "FileModal" : "UploadModal");
  const handleOpen = () => {
    if (content) {
      if (type === "file") {
        openModal({
          title: content.name,
          url: content.url,
          ext: getTypeFromExtension(
            content.name.split(".").pop()?.toLowerCase(),
          ),
        });
      } else {
        openModal({ title: content.name, folderId: content.id });
      }
    }
  };

  return contextMenuPos ? (
    <div
      className="fixed z-50 w-56 rounded-md bg-white shadow-lg border text-sm text-black"
      style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
    >
      <div
        className="px-4 py-2 hover:bg-gray-100 rounded-t-md cursor-pointer flex justify-between items-center"
        onClick={handleOpen}
      >
        <span>{type === "file" ? "열기" : "파일 업로드"}</span>
      </div>
      <hr />
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        ⬇ 다운로드
      </div>
      <hr />
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">👥 공유</div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        ℹ {type === "file" ? "파일" : "폴더"} 정보
      </div>
      <hr />
      <div className="px-4 py-2 hover:bg-red-100 cursor-pointer rounded-b-md text-red-600 flex justify-between items-center">
        <span>휴지통으로 이동</span>
        <span className="text-xs">Delete</span>
      </div>
    </div>
  ) : null;
};

export default ContextMenu;
