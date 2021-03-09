function Main(props) {
  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-img button"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${props.avatar})` }}
        ></button>
        <div className="profile__info">
          <div className="profile__info-name-eddit">
            <h1 className="profile__info-name">{props.name}</h1>
            <button
              type="button"
              className="profile__button-info-eddit button"
              aria-label="Редктировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__info-job">{props.description}</p>
        </div>
        <button
          type="button"
          className="profile__button-add button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>

      {props.children}
    </main>
  );
}
export default Main;
