import React, { useEffect, useState } from "react";
import { getLists } from "../api/axios";
import { List } from "../types";

const Home: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        console.log("Fetching lists...");
        const data = await getLists();
        console.log("Lists fetched:", data);
        setLists(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
  
    fetchLists();
  }, []);

  return (
    <div>
      <h1>TO-DO Lists</h1>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
