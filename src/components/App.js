import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import TrashPlacePopup from "./TrashPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTrashPopupOpen, setIsTrashPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardtoTrash, setSelectedCardtoTrash] = useState(null);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .getUserProfile()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка данных: ${err}`);
      });
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка данных: ${err}`);
      });
  }, []);

  const handleCardLike = (likes, id) => {
    const isLiked = likes.some((i) => i._id === currentUser?._id);

    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Возникла ошибка с лайками: ${err}`);
      });
  };

  const handleCardDelete = (card, setIsLoading) => {
    api
      .deleteInitialCards(card?._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((cardItem) => card?._id !== cardItem._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при удалении карточки: ${err}`);
      })
      .finally(() => setIsLoading("Да"));
  };

  const handleUpdateUser = ({ name, about }, setIsLoading) => {
    api
      .updateUserProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при получении данных  пользователя: ${err}`
        );
      })
      .finally(() => setIsLoading("Сохранить"));
  };

  const handleUpdateAvatar = ({ avatar }, setIsLoading) => {
    api
      .updateAvatarProfile(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при получении данных  пользователя: ${err}`
        );
      })
      .finally(() => setIsLoading("Сохранить"));
  };

  const handleAddPlaceSubmit = ({ name, link }, setIsLoading) => {
    api
      .renderInitialCards(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при получении данных  пользователя: ${err}`
        );
      })
      .finally(() => setIsLoading("Создать"));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleTrashClick = (card) => {
    setSelectedCardtoTrash(card);
    setIsTrashPopupOpen(true);
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="layout">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onTrashClick={handleTrashClick}
            onCardLike={handleCardLike}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <TrashPlacePopup
            isOpen={isTrashPopupOpen}
            onClose={closeAllPopups}
            CardDelete={handleCardDelete}
            card={selectedCardtoTrash}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
