import "../index.css";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import React, { useEffect } from "react";
import api from "../utils/api";
import Card from "../components/Card";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState();

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({isOpen:false, linkCard:{},nameCard:{}});
  useEffect(() => {
    api.getInfoProfile().then((dataUser) => {
      //console.log("###data", dataUser);
      setUserName(dataUser.name);
      setUserDescription(dataUser.about);
      setUserAvatar(dataUser.avatar);
    });
    //  console.log("#userName", userName) //? Почему здесь не выводятся данные?
  }, []);

  useEffect(() => {
    api.getAllInitialCards().then((dataCards) => {
      setCards(dataCards);
      //console.log("###dataCards", dataCards);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
//______________________________________________
  function handleCardClick (linkCard, nameCard){
    setSelectedCard({isOpen:true, linkCard:{linkCard},nameCard:{nameCard}});
  }
//______________________________________________
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen:false, linkCard:{}, nameCard:{}});
  }
  
  return (
    <div className="root">
      <div className="container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          name={userName}
          description={userDescription}
          avatar={userAvatar}
        >
          <section className="elements">
            {
              // console.log("###myCards",cards)
              cards.map((card) => {
                return (
                  <Card
                    key={card._id}
                    cardImg={card.link}
                    cardAlt={card.name}
                    cardCaption={card.name}
                    cardLikesCounter={card.likes.length}
                    onCardClick={handleCardClick}
                    
                  />
                );
              })
            }
          </section>
        </Main>

        <Footer />
      </div>
      <PopupWithForm
        name="avatar"
        title="Обновить Аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__field popup__field_type_avatar-link"
          id="popup__field-avatar-link"
          type="url"
          placeholder="Ссылка на картинку"
          aria-label="Ссылка на картинку"
          name="avatar"
          required
          noValidate
          autoComplete="on"
        />
      </PopupWithForm>
      <PopupWithForm
        name="edit-form"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__field popup__field_type_name "
          id="popup__field-eddit-name"
          type="text"
          placeholder="Имя"
          aria-label="Имя"
          name="name"
          required
          minLength="3"
          maxLength="40"
          noValidate
          autoComplete="off"
        />
        <input
          className="popup__field popup__field_type_job"
          id="popup__field-eddit-job"
          type="text"
          placeholder="Профессия"
          aria-label="О себе"
          name="about"
          required
          minLength="2"
          maxLength="200"
          noValidate
          autoComplete="off"
        />
      </PopupWithForm>
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__field popup__field_type_card-name"
          id="popup__field-card-name"
          type="text"
          placeholder="Название"
          aria-label="Название"
          name="name"
          required
          minLength="2"
          maxLength="30"
          noValidate
          autoComplete="off"
        />
        <input
          className="popup__field popup__field_type_card-link"
          id="popup__field-card-link"
          type="url"
          placeholder="Ссылка на картинку"
          aria-label="Ссылка на картинку"
          name="link"
          required
          noValidate
          autoComplete="on"
        />
      </PopupWithForm>
      <PopupWithForm name="card-delete" title="Вы уверены?" />
      <ImagePopup card={selectedCard}
                  onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
