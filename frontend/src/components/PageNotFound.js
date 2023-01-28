import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__title">Ошибка 404</h2>
      <p className="not-found__text">
        Что-то пошло не так! Страница, которую вы запрашиваете, не существует.
      </p>
      <Link to="/" className="not-found__link link">Перейти на главную</Link>
    </div>
  );
}

export default PageNotFound;
