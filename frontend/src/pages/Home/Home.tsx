import React, { useEffect, useState } from "react";
import { getLists, createList } from "../../api/axios";
import { List } from "../../types";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [newListTitle, setNewListTitle] = useState<string>("");
  const [newListPriority, setNewListPriority] = useState<number>(1);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        console.error("Erro ao carregar as listas:", error);
      }
    };

    fetchLists();
  }, []);

  const handleAddList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    try {
      const newList = await createList(newListTitle, newListPriority);
      setLists((prev) => [...prev, newList]);
      setNewListTitle(""); 
      setNewListPriority(1);
    } catch (error) {
      console.error("Erro ao criar a lista:", error);
    }
  };

  return (
    <div>
      <h1>TO-DO Lists</h1>

      <form onSubmit={handleAddList} className={styles.form}>
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Nova lista"
          className={styles.input}
        />
        <input
          type="number"
          value={newListPriority}
          onChange={(e) => setNewListPriority(Number(e.target.value))}
          placeholder="Prioridade"
          min="1"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Adicionar
        </button>
      </form>

      <ul className={styles.list}>
        {lists.map((list) => (
          <li key={list.id} className={styles.listItem}>
            <strong>{list.title}</strong> (Prioridade: {list.priority})
            <p>Concluída: {list.completed ? "Sim" : "Não"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
