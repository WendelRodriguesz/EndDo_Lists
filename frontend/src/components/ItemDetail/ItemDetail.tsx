import React, { useState } from "react";
import styles from "./ItemDetail.module.scss";
import { Item } from "../../types";
import ModalEditItem from "../ModalEditItem/ModalEditItem";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface ItemDetailProps {
  item: Item;
  onEdit: (id: number, data: Partial<Item>) => void;
  onDelete: (id: number) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = async (title: string, endDate: string) => {
    await onEdit(item.id, { title, endDate });
    setIsEditModalOpen(false); // Fecha o modal após a edição
  };

  return (
    <li className={styles.itemDetail}>
      <div className={styles.itemDetails}>
        <h3>{item.title}</h3>
        <p>
          <strong>Data de término:</strong>{" "}
          <span>{item.endDate || "Não definida"}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditModalOpen(true);
          }}
          className={styles.editButton}
        >
          <FaRegEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className={styles.deleteButton}
        >
          <MdDeleteForever />
        </button>
      </div>

      {isEditModalOpen && (
        <ModalEditItem
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEditItem={handleEdit}
          initialTitle={item.title}
          initialEndDate={item.endDate}
        />
      )}
    </li>
  );
};

export default ItemDetail;
