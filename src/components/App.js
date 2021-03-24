import "../index.css";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import api from "../utils/api";
import React, { useEffect } from "react";
//import { Route } from "react-router";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; //импортировали контекст 
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";




function App() {
  const [currentUser, setCurrentUser] = React.useState({name:'', about:''});//задали текущее значение состония объекту currentUser т.к. при первом монтирование попадается undefined 
  const [cardsContext, setCards] =React.useState([])//задали текущее значение состония переменной cardsContext 

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    linkCard: {},
    nameCard: {},
  });

  

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
   // подняли стейт для того то бы можно было использовать в других компонентх, а не только main
  useEffect(()=>{ // используем useEffект 
    api.getInfoProfile()
      .then((dataUser)=>{
        setCurrentUser(dataUser);// записали в стейт currentUser принятое значение от сервера  
      })
      .catch((err)=>{
        console.log(err, "Ошибка при загрузке информации о профиле")
      })   
  },[]);
  
  useEffect(()=>{
    api.getAllInitialCards()
    .then((dataCards)=>{
      setCards(dataCards);
    })
    .catch((err)=>{
      console.log(err, "Ошибка при загрузке карточек")
    })
  },[])


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
    api.deleteCard(card._id)
    .then(()=>{
      setCards((state)=>{ // устанавливаем новый стейт(с удаленной карточкой) при удалении карточки
        return state=cardsContext.filter((c,index)=>{// в стейт записывется новый массив
          if (c._id===card._id){//если мой id и id карточки одинаковые, то 
            cardsContext.splice(index, 1)// то из текущего масиива(в стейте) удаляется один элемент с индексом элемент полученным при сравнение idшников
          }
          return cardsContext
        })
      }
         
      ) 
      console.log("cardsContext-delete", cardsContext)
    })
  }

  function handleUpdateUser({name, about}){
    api
      .addInfoProfile({name, about})
      .then((dataUser)=>{
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      // .catch((err)=>{err, "ошибка handleUpdateUser"})
  }
  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cardsContext}>
        {/* // <Route exact path='/'> */}
        <div className="root">
        <div className="container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onLikeClick={handleCardLike}
            onDeleteClick={handleCardDelete}
          />
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
          <span className="popup__field-error" id="popup__field-avatar-link-error"></span>
        </PopupWithForm>
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}

          > 

        </EditProfilePopup>
        {/* <PopupWithForm
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
          <span className="popup__field-error" id="popup__field-eddit-name-error"></span>
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
          <span className="popup__field-error" id="popup__field-eddit-job-error"></span>
        </PopupWithForm> */}
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
          <span className="popup__field-error" id="popup__field-card-name-error"></span>
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
          <span className="popup__field-error" id="popup__field-card-link-error"></span>
        </PopupWithForm>
        <PopupWithForm name="card-delete" title="Вы уверены?" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
        {/* // </Route> */}
      </CardsContext.Provider>
    </CurrentUserContext.Provider> 
   </>
    
  );
    
}

export default App;
