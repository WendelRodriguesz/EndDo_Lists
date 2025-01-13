import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalAddList.module.scss";
import Button from "../Button/Button";

interface ModalAddListProps {
  isOpen: boolean;
  onClose: () => void;
  onAddList: (title: string, priority: number) => Promise<void>;
  initialTitle?: string; 
  initialPriority?: number; 
}

const ModalAddList: React.FC<ModalAddListProps> = ({
  isOpen,
  onClose,
  onAddList,
  initialTitle = "", 
  initialPriority = 1, 
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [priority, setPriority] = useState<number>(initialPriority);

  useEffect(() => {
    setTitle(initialTitle); 
    setPriority(initialPriority);
  }, [initialTitle, initialPriority]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title, priority);
      setTitle("");
      setPriority(1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{initialTitle ? "Editar Lista" : "Adicionar Nova Lista"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              Nome da Lista:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Lista de compras"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="priority" className={styles.label}>
              Prioridade:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className={styles.select}
            >
              <option value={1}>Baixa</option>
              <option value={2}>Média</option>
              <option value={3}>Importante</option>
              <option value={4}>Urgente</option>
            </select>
          </div>
          <div className={styles.buttons}>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialTitle ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalAddList;