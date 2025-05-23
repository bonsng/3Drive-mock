import { toast } from "react-hot-toast";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { useModal } from "@/ui/Modal/modal.hook";
import { getTypeFromExtension } from "@/lib/extension";
import { useSession } from "next-auth/react";

const ContextMenu = ({
  id,
  type,
}: {
  id: number;
  type: "file" | "folder" | "root" | undefined;
}) => {
  const { data: session } = useSession();
  const { contextMenuPos, nodePositionMap, deleteNodeToTrash } = useFileTree();
  const content = nodePositionMap.get(id);
  const { openModal } = useModal(type === "file" ? "FileModal" : "UploadModal");
  const { openModal: openCreateFolder } = useModal("CreateFolderModal");
  const handleOpen = () => {
    if (content) {
      if (type === "file") {
        openModal({
          title: content.name,
          ext: getTypeFromExtension(
            content.name.split(".").pop()?.toLowerCase(),
          ),
          parentId: content.parentId,
        });
      } else {
        openModal({ title: content.name, folderId: content.id });
      }
    }
  };

  const handleDelete = async () => {
    if (!content) return;

    const path =
      content.type === "file"
        ? `/files/${content.parentId}/${content.name}`
        : `/folders/${content.id}`;
    const formData = new FormData();
    formData.append("targetId", session?.trashFolderId?.toString() ?? "");
    await toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }).then((res) => {
        if (!res.ok) throw new Error("삭제 실패");
        deleteNodeToTrash(id);
      }),
      {
        loading: "삭제 중입니다...",
        success: "삭제되었습니다.",
        error: "삭제에 실패했습니다.",
      },
    );
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
      {type === "folder" && (
        <>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => openCreateFolder({ targetFolderId: id })}
          >
            📁 새 폴더
          </div>
          <hr />
        </>
      )}
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        ⬇ 다운로드
      </div>
      <hr />
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">👥 공유</div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        ℹ {type === "file" ? "파일" : "폴더"} 정보
      </div>
      <hr />
      {id && (
        <div
          className="px-4 py-2 hover:bg-red-100 cursor-pointer rounded-b-md text-red-600 flex justify-between items-center"
          onClick={handleDelete}
        >
          <span>휴지통으로 이동</span>
          <span className="text-xs">Delete</span>
        </div>
      )}
    </div>
  ) : null;
};

export default ContextMenu;
