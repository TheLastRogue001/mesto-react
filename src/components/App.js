import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import "../index.css";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTrashPopupOpen, setIsTrashPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleTrashClick = () => {
    setIsTrashPopupOpen(!isTrashPopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTrashPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <div className="layout">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onTrashClick={handleTrashClick}
        />
        <Footer />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          title="Редактировать профиль"
          name="edit"
          buttonText="Сохранить"
        >
          <input
            id="name-input"
            className="popup__input"
            name="name"
            type="text"
            min-length="2"
            max-length="40"
            placeholder="ФИО"
            required
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            id="job-input"
            className="popup__input"
            name="job"
            type="text"
            min-length="2"
            max-length="200"
            placeholder="Работа"
            required
          />
          <span className="popup__input-error job-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          title="Новое место"
          name="card"
          buttonText="Создать"
        >
          <input
            id="card-input"
            className="popup__input"
            name="card"
            type="text"
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
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isTrashPopupOpen}
          onClose={closeAllPopups}
          title="Вы уверены?"
          name="trash"
          buttonText="Да"
        />
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          title="Обновить аватар"
          name="avatar"
          buttonText="Сохранить"
        >
          <input
            id="avatar-input"
            className="popup__input"
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
