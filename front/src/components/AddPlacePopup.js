import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(name, link);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="photo-item-popup"
      title="Новое место"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      classNameButton="popup__create-button"
      classNameTitle="popup__title_item-form"
      classNameForm="submit-profile-form-handler-add"
    >
      <label>
        <input
          value={name}
          onChange={handleChangeName}
          id="name"
          type="text"
          name="name"
          className="name popup__input popup__subtitle item-name-input"
          placeholder="Название"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-error" className="name-error popup__error"></span>
      </label>
      <label>
        <input
          value={link}
          onChange={handleChangeLink}
          id="link"
          type="url"
          name="link"
          className="link popup__input popup__subtitle popup__subtitle_margin_small item-link-input"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          id="link-error"
          className="link-error popup__error popup__error_position_bottom"
        ></span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
