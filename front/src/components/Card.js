import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "photo-flex__trash" : "photo-flex__trash_hidden"
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-flex__like-button ${
    isLiked ? "photo-flex__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <section id="photo-template">
      <li id="container" className="photo-flex__item">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="photo-flex__image"
          onClick={handleClick}
        />
        <button
          id="like"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <div className="photo-flex__like-count">{props.card.likes.length}</div>
        <h2 id="nametemplate" className="title photo-flex__title">
          {props.card.name}
        </h2>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
      </li>
    </section>
  );
}

export default Card;
