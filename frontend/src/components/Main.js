import React, {useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ cards, onCardLike, onCardDelete, onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar}
          alt="Аватар"
          className="profile__avatar"/>
        <div className="profile__avatar-overlay"
          onClick={onEditAvatar}>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">
            {currentUser.name}
          </h1>
          <button className="profile__edit-button button"
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать">
          </button>
          <p className="profile__about">
            {currentUser.about}
          </p>
        </div>
        <button className="profile__add-button button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить картинку">
        </button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
