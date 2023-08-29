import "../index.css";

function Card({ card, onCardClick, onTrashClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div className="element" key={card._id}>
      <button
        type="button"
        aria-label="Удалить"
        onClick={onTrashClick}
        className="element__trash"
      ></button>
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__img"
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__content">
        <button
          type="button"
          aria-label="Нравится"
          className="element__like"
        ></button>
        <p className="element__like-count">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
