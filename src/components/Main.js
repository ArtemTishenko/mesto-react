function Main (props){
  
  // function handleEditAvatarClick(){
  //   document.querySelector('.popup_type_avatar').classList.add('popup_visible')  
  // }
  // function handleEditProfileClick(){
  //   document.querySelector('.popup_type_edit-form').classList.add('popup_visible')
  // }
  // function handleAddPlaceClick(){
  //   document.querySelector('.popup_type_card').classList.add('popup_visible')
  // }
  return(
    <main className="main"> 
    <section className="profile">
      <button type="button" 
              className="profile__avatar-img button" 
              onClick={props.onEditAvatar}> </button>
      <div className="profile__info">
        <div className="profile__info-name-eddit">
          <h1 className="profile__info-name"> Жак Ив-Кусто</h1>
          <button type="button" 
                  className="profile__button-info-eddit button" 
                  aria-label="Редктировать профиль"
                  onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__info-job">Исследователь</p>
      </div>
      <button type="button" 
              className="profile__button-add button" 
              aria-label="Добавить карточку"
              onClick={props.onAddPlace}>        
       </button>
    </section>
    <section className="elements">
    </section>
  </main>
  )
}
export default Main