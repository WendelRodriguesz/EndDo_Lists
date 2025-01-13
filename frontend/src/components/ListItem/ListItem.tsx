import React, { useState } from "react";
import styles from "./ListItem.module.scss";
import { List } from "../../types";
import ModalAddList from "../ModalAddList/ModalAddList";

interface ListItemProps {
  list: List;
  onEdit: (id: number, data: Partial<List>) => void;
  onDelete: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({ list, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = async (title: string, priority: string, category: string) => {
    await onEdit(list.id, { title, priority, category });
    setIsEditModalOpen(false); // Fecha o modal após a edição
  };

  return (
    <li
      className={`${styles.listItem} ${
        styles[`priority-${list.priority.toLowerCase()}`]
      } ${list.completed ? styles.completed : ""}`}
    >
      <div className={styles.listDetails}>
        <h3>{list.title}</h3>
        <p>
          <strong>Prioridade:</strong>{" "}
          <span className={styles.priority}>{list.priority}</span>
        </p>
        <p>
          <strong>Categoria:</strong>{" "}
          <span className={styles.category}>{list.category}</span>
        </p>
        <p>
          <strong>Status:</strong> {list.completed ? "Concluída" : "Pendente"}
        </p>
        <p>
          <strong>Itens:</strong> {list.item_count}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className={styles.editButton}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(list.id)}
          className={styles.deleteButton}
        >
          Excluir
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

export default ListItem;
