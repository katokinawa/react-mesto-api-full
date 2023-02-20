import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      classNameButton="popup__save-button"
      classNameForm="popup__form-container submit-profile-form-handler-edit"
    >
      <label>
        <input
          onChange={handleChangeName}
          value={name}
          type="text"
          id="username"
          name="name"
          className="username popup__input popup__subtitle name-input"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          id="username-error"
          className="username-error popup__error"
        ></span>
      </label>
      <label>
        <input
          onChange={handleChangeDescription}
          value={description}
          type="text"
          id="job"
          name="about"
          className="job popup__input popup__subtitle popup__subtitle_margin_small job-input"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="job-error"
          className="job-error popup__error popup__error_position_bottom"
        ></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
