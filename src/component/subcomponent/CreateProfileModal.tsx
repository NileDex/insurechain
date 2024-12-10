import React, { useState, ReactNode } from 'react';
import './Modal.css';
import HealthProfile from '../form/healthprofile';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const CreateProfileModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal}>Create Profile</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Your existing Create Profile component goes here */}
        <div><HealthProfile/></div>
      </Modal>
    </>
  );
};

export default CreateProfileModal;
