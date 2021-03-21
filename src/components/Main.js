//import api from "../utils/api";
import Card from "../components/Card";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext) //подписали на контекст 
  console.log("###currentUser-main-avatar", currentUser.avatar);

  const cards = React.useContext(CardsContext);
  console.log("#cards", cards)  


  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState();
  //const [cards, setCards] = React.useState([]);
  
  // useEffect(() => {
  //   api.getInfoProfile()
  //     .then((dataUser) => {
  //       setUserName(dataUser.name);
  //       setUserDescription(dataUser.about);
  //       setUserAvatar(dataUser.avatar);
  //     })
  //     .catch((err)=>{
  //       console.log(err, "Ошибка при згрузке информации о профиле")
  //     })
  // }, []);

  // useEffect(() => {
  //   api.getAllInitialCards().then((dataCards) => {
  //     setCards(dataCards);
  //   })
  //   .catch((err)=>{
  //     console.log(err, "Ошибка при загрузке карточек")
  //   })
    
  // }, []);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-img button"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>
        <div className="profile__info">
          <div className="profile__info-name-eddit">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button-info-eddit button"
              aria-label="Редктировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
            {cards.map((card) => {
              const isOwn = card.owner._id === currentUser._id;//? Определяем, являемся ли мы владельцем текущей карточки
              console.log(isOwn, card)
              const cardDeleteButtonClassName = ('button'
                                                 //`button ${isOwn 
                                                // ? 'element__delete_visible'
                                                // :'element__delete'  }`
              ); 
              return (
                <Card
                  key={card._id}
                  cardImg={card.link}
                  cardAlt={card.name}
                  cardCaption={card.name}
                  cardLikesCounter={card.likes.length}
                  onCardClick={props.onCardClick}
                  cardDelete={cardDeleteButtonClassName}
                />
              );
            })}
          </section>
    </main>
  );
}
export default Main;


//"element__delete button"