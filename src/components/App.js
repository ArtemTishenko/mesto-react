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
