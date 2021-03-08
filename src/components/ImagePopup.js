function ImagePopup(){
  return(
    <div className="popup popup_type_img">
    <div className="popup__container popup__container-img" name="popup-picture">
      <button type="button" className="popup__button-close popup__button-close_type_img button" aria-label="Закрыть" id="popup__button-close_img"></button>
      <img className="popup__picture" src=" #" alt =" #"/>
      <p className="popup__picture-caption"></p>
    </div>
  </div> 
  )
}

export default ImagePopup