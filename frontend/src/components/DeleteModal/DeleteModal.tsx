import React from "react";
import styles from "./DeleteModal.module.scss";

interface DeleteModalProps {
  title: string; // Título do modal
  description: string; // Mensagem de confirmação
  onConfirm: () => void; // Função chamada ao confirmar
  onCancel: () => void; // Função chamada ao cancelar
}

const DeleteModal: React.FC<DeleteModalProps> = ({ title, description, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
