import React from "react";
// import { IoMdNotifications } from "react-icons/io";
import v360Logo from '/images/logov360.png';
import styles from "./Topbar.module.scss";
import Button from "../Button/Button";

const Topbar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        <img src={v360Logo} alt="V360 Logo" />
      </div>
      <h1>To-Do List</h1>
      <Button type="submit">Nova Lista</Button>
      <div className={styles.filters}>
        
      </div>
      {/* <div className={styles.notification}>
        <IoMdNotifications size={24} />
      </div> */}
    </div>
  );
};

export default Topbar;
