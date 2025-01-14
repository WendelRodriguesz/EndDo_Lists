import React, { useState } from "react";
import styles from "./ListDetail.module.scss";
import { List } from "../../types";
import ModalAddList from "../ModalAddList/ModalAddList";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface ListDetailProps {
  list: List;
  onEdit: (id: number, data: Partial<List>) => void;
  onDelete: (id: number) => void;
}

const ListDetail: React.FC<ListDetailProps> = ({ list, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async (title: string, priority: string, category: string) => {
    await onEdit(list.id, { title, priority, category });
    setIsEditModalOpen(false); // Fecha o modal após a edição
  };

  const handleNavigateToDetails = () => {
    navigate(`/lists/${list.id}`);
  };

  return (
    <li
      className={`${styles.listItem} ${
        styles[`priority-${list.priority.toLowerCase()}`]
      } ${list.completed ? styles.completed : ""}`}
      onClick={handleNavigateToDetails}
    >
      <div className={styles.listDetails}>
        <h3>{list.title}</h3>
        <p>
          <strong>Prioridade:</strong>{" "}
          <span className={styles.priority}>{list.priority}</span>
        </p>
        <p>
          <strong>Categoria:</strong>{" "}
          <span className={styles.category}>{list.category === "" ? "Não definido" : list.category}</span>
        </p>
        <p>
          <strong>Status:</strong> {list.completed ? "Concluída" : "Pendente"}
        </p>
        <p>
          <strong>Qtd. de itens:</strong> {list.item_count}
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
          onDelete(list.id);
          }}
          className={styles.deleteButton}
        >
          <MdDeleteForever />
        </button>
      </div>

      {isEditModalOpen && (
        <ModalAddList
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAddList={handleEdit}
          initialTitle={list.title}
          initialPriority={list.priority}
          initialCategory={list.category}
        />
      )}
    </li>
  );
};

export default ListDetail;
