import { Link } from "react-router-dom";
import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister({ email, password });
  };

  return (
    <div className="authorization">
      <h2 className="title authorization__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="authorization__form" noValidate>
        <label htmlFor="email"></label>
        <input
          id="email"
          value={email}
          onChange={handleSetEmail}
          type="text"
          name="email"
          className="email authorization__input email-input"
          placeholder="Email"
          required
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          value={password}
          onChange={handleSetPassword}
          type="password"
          name="password"
          className="password authorization__input password-input"
          placeholder="Пароль"
          required
        />
        <button name="register" type="submit" className="authorization__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="authorization__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
