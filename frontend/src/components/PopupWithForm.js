function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className={`popup__container ${props.classNameContainer}`}>
        <h2 className={`title popup__title ${props.classNameTitle}`}>
          {props.title}
        </h2>
        <form
          onSubmit={props.onSubmit}
          name={`${props.name}`}
          className={`popup__form popup__form-container ${props.classNameForm}`}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            name={`${props.name}`}
            className={`popup__button ${props.classNameButton}`}
          >{`${props.button}`}</button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
