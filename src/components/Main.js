import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import Card from "./Card";
import "../index.css";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick }) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserProfile()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка данных: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка данных: ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-button">
          <img className="profile__avatar" alt="Аватар" src={userAvatar} />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            aria-label="Edit"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          aria-label="Add-button"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onTrashClick={onTrashClick} onCardClick={onCardClick} />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
