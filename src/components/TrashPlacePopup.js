import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function TrashPlacePopup({ isOpen, onClose, CardDelete, card }) {
  const [isLoading, setIsLoading] = useState("Да");

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading("Удаление карточки...");

    CardDelete(card, setIsLoading);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="trash"
      buttonText={isLoading}
    />
  );
}

export default TrashPlacePopup;
