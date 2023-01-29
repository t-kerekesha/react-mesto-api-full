import { useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Tooltip from './Tooltip';

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [isOpenTooltip, setOpenTooltip] = useState(false);
  const [positionTooltip, setPositionTooltip] = useState(null);
  const [likes, setLikes] = useState([]);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function openTooltip({ likes, top, left }) {
    setOpenTooltip(true);
    setLikes(likes);
    setPositionTooltip({
      top: top,
      left: left
    });
  }

  function closeTooltip() {
    setOpenTooltip(false);
  }

  const isOwn = card.owner._id === currentUser?._id;
  const cardDeleteButtonClassName = (
    `card__delete-button  button ${isOwn && 'card__delete-button_visible'}`
  );

  const isLiked = card.likes.some((user) => {
    return user._id === currentUser?._id;
  });
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && "card__like-button_active"}`
  );

  return (
    <>
      <li className="gallery__list-item">
        <figure className="card">
          <div className="card__aspect-ratio">
            <img src={card.link}
              className="card__image"
              alt={card.name}
              onClick={handleCardClick}
            />
          </div>
          <button className={cardDeleteButtonClassName}
            type="button"
            aria-label="Удалить"
            onClick={handleDeleteClick}>
          </button>
          <figcaption className="card__container-caption">
            <h2 className="card__caption">
              {card.name}
            </h2>
            <button className={cardLikeButtonClassName}
              type="button"
              aria-label="Лайк"
              onClick={handleLikeClick}
              onMouseEnter={(event) => {
                if (card.likes.length > 0) {
                  openTooltip({
                    likes: card.likes,
                    top: event.pageY,
                    left: event.pageX
                  })
                }
              }}
              onMouseLeave={closeTooltip} >
            </button>
            <p className="card__like-counter">
              {likes.length}
            </p>
          </figcaption>
        </figure>
      </li>

      <Tooltip
        isOpen={isOpenTooltip}
        likes={likes}
        position={positionTooltip} />
    </>
  );
}

export default Card;
