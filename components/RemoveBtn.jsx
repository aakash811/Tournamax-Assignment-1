"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleRemoveClick} className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
