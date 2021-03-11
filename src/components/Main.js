import api from "../utils/api";
import Card from "../components/Card";
import React, { useEffect } from "react";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState();

  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api.getInfoProfile()
      .then((dataUser) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
      })
      .catch((err)=>{
        console.log(err, "Ошибка при згрузке информации о профиле")
      })
  }, []);

  useEffect(() => {
    api.getAllInitialCards().then((dataCards) => {
      setCards(dataCards);
    })
    .catch((err)=>{
      console.log(err, "Ошибка при загрузке карточек")
    })
    
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-img button"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></button>
        <div className="profile__info">
          <div className="profile__info-name-eddit">
            <h1 className="profile__info-name">{userName}</h1>
            <button
              type="button"
              className="profile__button-info-eddit button"
              aria-label="Редктировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__info-job">{userDescription}</p>
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
              return (
                <Card
                  key={card._id}
                  cardImg={card.link}
                  cardAlt={card.name}
                  cardCaption={card.name}
                  cardLikesCounter={card.likes.length}
                  onCardClick={props.onCardClick}
                />
              );
            })}
          </section>
    </main>
  );
}
export default Main;
