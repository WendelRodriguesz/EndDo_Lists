import React, { useState } from "react";
import styles from "./FormAddList.module.scss";
import Button from "../Button/Button";

interface FormAddListProps {
  onAddList: (title: string, priority: number) => Promise<void>;
}

const FormAddList: React.FC<FormAddListProps> = ({ onAddList }) => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title, priority);
      setTitle("");
      setPriority(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova lista"
        className={styles.input}
      />
      <input
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        placeholder="Prioridade"
        min="1"
        className={styles.input}
      />
      <Button type="submit">Adicionar</Button>
    </form>
  );
};

export default FormAddList;
