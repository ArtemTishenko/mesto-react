import "../index.css";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

import ImagePopup from "../components/ImagePopup";
import api from "../utils/api";
import React, { useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext"; //импортировали контекст
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" }); //задали текущее значение состония объекту currentUser т.к. при первом монтирование попадается undefined
  const [cardsContext, setCards] = React.useState([]); //задали текущее значение состония переменной cardsContext

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    linkCard: {},
    nameCard: {},
  });

  // подняли стейт для того то бы можно было использовать в других компонентх, а не только в main

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(linkCard, nameCard) {
    setSelectedCard({
      isOpen: true,
      linkCard: { linkCard },
      nameCard: { nameCard },
    });
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, linkCard: {}, nameCard: {} });
  }
  useEffect(() => {
    //получение данных пользователя
    api
      .getInfoProfile()
      .then((dataUser) => {
        setCurrentUser(dataUser); // записали в стейт currentUser принятое значение от сервера
      })
      .catch((err) => {
        console.log(err, "Ошибка при загрузке информации о профиле");
      });
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .addInfoProfile({ name, about })
      .then((dataUser) => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err, "Ошибка при отправке данных пользователя");
      });
  }
  function handleUpdateAvatar(data) {
    api
      .addInfoProfileAvatar(data)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err, "Ошибка при отправке аватара");
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    if (isLiked) {
      api
        .deleteLike(card._id) // Отправляем запрос в API и получаем обновлённые данные карточки
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c));
          });
          console.log("###newCard-delete", newCard);
        })
        .catch((err) => {
          console.log(err, "ошибка из api.deleteLike");
        });
    } else {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c));
          });
        })
        .catch((err) => {
          console.log(err, "ошибка из api.putLike");
        });
    }
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => {
        // устанавливаем новый стейт(с удаленной карточкой) при удалении карточки
        return (state = cardsContext.filter((c, index) => {
          // в стейт записывется новый массив
          if (c._id === card._id) {
            //если мой id и id карточки одинаковые, то
            cardsContext.splice(index, 1); // то из текущего масиива(в стейте) удаляется один элемент с индексом элемент полученным при сравнение idшников
          }
          return cardsContext;
        }));
      });
    });
  }

  useEffect(() => {
    // получение карточек
    api
      .getAllInitialCards()
      .then((dataCards) => {
        setCards(dataCards);
      })
      .catch((err) => {
        console.log(err, "Ошибка при загрузке карточек");
      });
  }, []);

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cardsContext]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err, "Ошибка при отправке новой карточки");
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cardsContext}>
          <div className="root">
            <div className="container">
              <Header />
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cardsContext}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </div>

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

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
