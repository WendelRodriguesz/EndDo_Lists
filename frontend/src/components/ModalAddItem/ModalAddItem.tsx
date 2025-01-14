import React, { useState, useEffect } from "react";
import styles from "./ModalAddItem.module.scss";
import Button from "../Button/Button";

interface ModalAddItemProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, dueDate: string | null) => void;
  initialTitle?: string;
  initialDueDate?: string | null;
}

const ModalAddItem: React.FC<ModalAddItemProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTitle = "",
  initialDueDate = null,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [dueDate, setDueDate] = useState(initialDueDate || "");

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle || "");
      setDueDate(initialDueDate || "");
    }
  }, [isOpen, initialTitle, initialDueDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim(), dueDate || null); // Envia null se dueDate for vazio
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{initialTitle ? "Editar Item" : "Adicionar Item"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="title"><h4>Título do Item</h4></label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do item"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="dueDate"><h4>Data de Término</h4></label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddItem;
