import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalAddList.module.scss";

interface ModalAddListProps {
  isOpen: boolean;
  onClose: () => void;
  onAddList: (title: string, priority: string, category: string) => Promise<void>;
  initialTitle?: string;
  initialPriority?: string;
  initialCategory?: string;
}

const ModalAddList: React.FC<ModalAddListProps> = ({
  isOpen,
  onClose,
  onAddList,
  initialTitle = "",
  initialPriority = "Baixa",
  initialCategory = "",
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [priority, setPriority] = useState<string>(initialPriority);
  const [category, setCategory] = useState<string>(initialCategory);

  useEffect(() => {
    setTitle(initialTitle);
    setPriority(initialPriority);
    setCategory(initialCategory || "");
  }, [initialTitle, initialPriority, initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title, priority, category.trim());
      setTitle("");
      setPriority("Baixa");
      setCategory("");
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
              Nome da Lista*:
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
              onChange={(e) => setPriority(e.target.value)}
              className={styles.select}
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Importante">Importante</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="category" className={styles.label}>
              Categoria:
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Trabalho, Estudo, Lazer"
              className={styles.input}
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancelButton} type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className={styles.confirmButton} type="submit">
              {initialTitle ? "Salvar Alterações" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalAddList;
