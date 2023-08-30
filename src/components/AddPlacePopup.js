import React, { useState } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [card, setCard] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState("Создать");

  const handleSetCard = (e) => {
    setCard(e.target.value);
  };

  const handleSetLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading("Создание карточки...");

    onAddPlace(
      {
        name: card,
        link,
      },
      setIsLoading
    );

    setCard("");
    setLink("");
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="card"
      buttonText={isLoading}
      onSubmit={handleSubmit}
    >
      <input
        id="card-input"
        className="popup__input"
        name="card"
        type="text"
        value={card ?? ""}
        onChange={handleSetCard}
        min-length="2"
        max-length="30"
        placeholder="Название"
        required
      />
      <span className="popup__input-error card-input-error"></span>
      <input
        id="link-input"
        className="popup__input"
        name="link"
        value={link ?? ""}
        onChange={handleSetLink}
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
