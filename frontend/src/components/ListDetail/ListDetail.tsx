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
    {/* Cabeçalho com título, prioridade e categoria */}
    <div className={styles.header}>
      <h3>{list.title}</h3>
      <div className={styles.priority}>
        <strong>Prioridade: </strong>
        <span >{list.priority}</span>
      </div>
      
    </div>
    <div className={styles.detailsGrid}>
    
      <p>
        <strong>Qtd. de itens:</strong> {list.item_count}
      </p>
      <span className={styles.category}>
        <strong>Categoria:</strong> {list.category === "" ? "Não definido" : list.category}
      </span>
      <p>
        <strong>Status:</strong> {list.completed ? "Concluída" : "Pendente"}
      </p>
    </div>
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
