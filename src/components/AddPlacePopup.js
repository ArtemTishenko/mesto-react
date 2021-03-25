import React from "react";
import { CardsContext } from "../contexts/CardsContext";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props){
  const [name, setName]= React.useState('')
  const [link, setLink] = React.useState('')
  const cards = React.useContext(CardsContext)
  function onAddPlace(){

  }

  function handleSubmit(e){
    e.preventDefault();
  }
  
  return(
    <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={props.isOpen}
          onClose={props.onClose}

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
  )
}
export default AddPlacePopup