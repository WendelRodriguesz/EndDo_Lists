import React, { useState } from "react";
import styles from "./ListItem.module.scss";
import { List } from "../../types";
import ModalAddList from "../ModalAddList/ModalAddList";

interface ListItemProps {
  list: List;
  onEdit: (id: number, data: Partial<List>) => void;
  onDelete: (id: number) => void;
  itemCount: number;
}

const translatePriority = (priority: number): string => {
  switch (priority) {
    case 1:
      return "Baixa";
    case 2:
      return "Média";
    case 3:
      return "Importante";
    case 4:
      return "Urgente";
    default:
      return "Desconhecida";
  }
};

const ListItem: React.FC<ListItemProps> = ({ list, onEdit, onDelete, itemCount }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = async (title: string, priority: number) => {
    await onEdit(list.id, { title, priority });
    setIsEditModalOpen(false); // Fecha o modal após a edição
  };

  return (
    <li
      className={`${styles.listItem} ${styles[`priority-${list.priority}`]} ${
        list.completed ? styles.completed : ""
      }`}
    >
      <div className={styles.listDetails}>
        <h3>{list.title}</h3>
        <p>
          <strong>Prioridade:</strong>{" "}
          <span className={styles.priority}>
            {translatePriority(list.priority)}
          </span>
        </p>
        <p>
          <strong>Status:</strong> {list.completed ? "Concluída" : "Pendente"}
        </p>
        <p>
          <strong>Itens:</strong> {itemCount}
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
        />
      )}
    </li>
  );
};

export default ListItem;
