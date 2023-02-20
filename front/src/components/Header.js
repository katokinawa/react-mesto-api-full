import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__header">
      {/* Не увидел в чеклисте обязательное условие вставлять logo через import, оставил background-image в css */}
      <div className="logo"></div>
      <Route exact path="/">
        <div className="header__link-wrapper">
          <p className="subtitle header__subtitle">{props.userEmail}</p>
          <Link
            to="/sign-in"
            className="header__link header__link_grey"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>
    </header>
  );
}

export default Header;
