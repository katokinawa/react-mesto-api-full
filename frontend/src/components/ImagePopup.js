function ImagePopup(props) {
  return (
    <section
      className={`popup photo-fullscreen-popup ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <div className=" popup__container-image">
        <img
          className="popup__image"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <h2 className="popup__title-image title">{props.card?.name}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
