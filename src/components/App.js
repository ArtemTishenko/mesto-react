//import logo from './logo.svg';
// import './App.css';
import '../index.css';

import Header from '../components/Header';
import Main from '../components/Main'
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import React from 'react';

function App() {
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]  = React.useState(false);
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
 


  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  } 
  return (
    <div className="root">
      <div className="container">
        <Header />
        <Main  onEditAvatar={handleEditAvatarClick}
               onEditProfile={handleEditProfileClick} 
               onAddPlace={handleAddPlaceClick}/>
        <Footer />
      </div> 
      <PopupWithForm name="avatar" 
                     title="Обновить Аватар" 
                     isOpen={isEditAvatarPopupOpen} 
                     onClose={closeAllPopups}>
        <input className="popup__field popup__field_type_avatar-link" id="popup__field-avatar-link" type="url" placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" name="avatar" required noValidate autoComplete="on"/>
      </PopupWithForm> 
      <PopupWithForm name="edit-form" 
                     title="Редактировать профиль" 
                     isOpen={isEditProfilePopupOpen} 
                     onClose={closeAllPopups}>
        <input className="popup__field popup__field_type_name " id="popup__field-eddit-name" type="text" placeholder="Имя" aria-label="Имя" name="name" required minLength="3" maxLength="40"  noValidate autoComplete="off" />
        <input className="popup__field popup__field_type_job" id="popup__field-eddit-job" type="text" placeholder="Профессия" aria-label="О себе" name="about" required minLength="2" maxLength="200" noValidate autoComplete="off"/>
      </PopupWithForm>
      <PopupWithForm name="card"
                     title="Новое место" 
                     isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}>
        <input className="popup__field popup__field_type_card-name" id="popup__field-card-name" type="text" placeholder="Название" aria-label="Название" name="name" required minLength="2" maxLength="30" noValidate autoComplete="off"/>
        <input className="popup__field popup__field_type_card-link" id="popup__field-card-link" type="url" placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" name="link" required noValidate autoComplete="on"/>
      </PopupWithForm>
      <PopupWithForm name="card-delete" title="Вы уверены?" />

      <ImagePopup />
      {/* <div className="popup popup_type_avatar">
        <form className="popup__container popup__container_type_form popup__container_type_avatar" name="eddit-avatar">
          <button type="button" className="popup__button-close popup__button-close_type_avatar button" aria-label="Закрыть"></button>
          <h2 className="popup__caption popup__caption_type_avatar ">Обновить Аватар</h2>
          <fieldset  className="popup__form">
            <input className="popup__field popup__field_type_avatar-link" id="popup__field-avatar-link" type="url" placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" name="avatar" required noValidate autoComplete="on"/>
            <span className="popup__field-error" id="popup__field-avatar-link-error"></span>
          </fieldset>
          <button type="submit" className="popup__button-submit button">Сохранить</button>
        </form>
      </div> 

 
       <div className="popup popup_type_edit-form">
        <form className="popup__container popup__container_type_form popup__container_type_eddit-form" name="eddit-profile" >
          <button type="button" className="popup__button-close popup__button-close_type_eddit-form button" aria-label="Закрыть"></button>
          <h2 className="popup__caption">Редактировать профиль</h2>
          <fieldset className="popup__form">
            <input className="popup__field popup__field_type_name " id="popup__field-eddit-name" type="text" placeholder="Имя" aria-label="Имя" name="name" required minLength="3" maxLength="40"  noValidate autoComplete="off" />
            <span className="popup__field-error" id="popup__field-eddit-name-error"></span>
            <input className="popup__field popup__field_type_job" id="popup__field-eddit-job" type="text" placeholder="Профессия" aria-label="О себе" name="about" required minLength="2" maxLength="200" noValidate autoComplete="off"/>
            <span className="popup__field-error" id="popup__field-eddit-job-error"></span>
          </fieldset>
          <button type="submit" className="popup__button-submit button">Сохранить</button>
        </form>
      </div>   

       <div className="popup popup_type_card" >
        <form className="popup__container popup__container_type_form popup__container_type_card " name="card-add">
         <button type="button" className="popup__button-close popup__button-close_type_card button" aria-label="Закрыть"></button>
          <h2 className="popup__caption popup__caption_type_card ">Новое место</h2>
          <fieldset className="popup__form popup__form_type_card">
            <input className="popup__field popup__field_type_card-name" id="popup__field-card-name" type="text" placeholder="Название" aria-label="Название" name="name" required minLength="2" maxLength="30" noValidate autoComplete="off"/>
            <span className="popup__field-error" id="popup__field-card-name-error"></span>
            <input className="popup__field popup__field_type_card-link" id="popup__field-card-link" type="url" placeholder="Ссылка на картинку" aria-label="Ссылка на картинку" name="link" required noValidate autoComplete="on"/>
            <span className="popup__field-error" id="popup__field-card-link-error"></span>
          </fieldset>
          <button type="submit" className="popup__button-submit popup__button-submit_type_card  button">Cоздать</button>
        </form>
      </div>  */}

      {/* <div className="popup popup_type_img">
        <div className="popup__container popup__container-img" name="popup-picture">
          <button type="button" className="popup__button-close popup__button-close_type_img button" aria-label="Закрыть" id="popup__button-close_img"></button>
          <img className="popup__picture" src=" #" alt =" #"/>
          <p className="popup__picture-caption"></p>
        </div>
      </div> */}
      
      {/* <div className="popup popup_type_card-delete">
        <form className="popup__container_type_card-delete popup__container popup__container_type_form " name = "card-delete">
          <button type="button" className="popup__button-close popup__button-close_type_card-delete button" aria-label="Закрыть"></button>
          <h2 className="popup__caption popup__caption_type_card-delete">Вы уверены?</h2>
          <button type="submit" className="popup__button-submit popup__button-submit_type_card-delete  button">Да</button>
        </form>      
      </div> */}

      {/* <template className="template">
        <div className="element">
          <img className="element__img" src=" #" alt =" #"/>
          <button type="button" className="element__delete button"></button>
          <div className="element__name">
            <h2 className="element__caption"></h2>
            <div className=" element__like-counter">
              <button className="element__like button"></button>
              <div className="element__counter">0</div>
            </div>
          </div>
        </div>
      </template>   */}
    </div>
  );
}

export default App;
