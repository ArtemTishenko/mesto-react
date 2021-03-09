function Card({cardImg, cardAlt, cardCaption, cardLikesCounter }){
  return(
      <div className="element">
        <img className="element__img" src={cardImg} alt ={cardAlt}/>
        <button type="button" className="element__delete button"></button>
          <div className="element__name">
            <h2 className="element__caption">{cardCaption}</h2>
            <div className=" element__like-counter">
              <button className="element__like button"></button>
            <div className="element__counter">{cardLikesCounter}</div>
          </div>
        </div>
      </div>
  )
}
export default Card

