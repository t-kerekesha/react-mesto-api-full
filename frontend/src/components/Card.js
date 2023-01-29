import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Tooltip from './Tooltip';

class Card extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
    this.card = this.props.card;
    this.onCardLike = this.props.onCardLike;
    this.onCardDelete = this.props.onCardDelete;
    this.onCardClick = this.props.onCardClick;
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.openTooltip = this.openTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
    this.state = {
      like: false,
      isOpenTooltip: false,
      likes: [],
      positionTooltip: {}
    };
  }

  handleCardClick() {
    this.props.onCardClick(this.card);
  }

  handleLikeClick() {
    this.props.onCardLike(this.card);
  }

  handleDeleteClick() {
    this.props.onCardDelete(this.card);
  }

  openTooltip({ likes, top, left }) {
    this.setState({
      isOpenTooltip: true,
      likes: likes,
      positionTooltip: {
        top: top,
        left: left
      }
    });
  }

  closeTooltip() {
    this.setState({ isOpenTooltip: false });
  }

  componentDidUpdate() {
    this.card = this.props.card;
  }

  render() {
    const isOwn = this.props.card.owner._id === this.context?._id;
    const cardDeleteButtonClassName = (
      `card__delete-button  button ${isOwn && 'card__delete-button_visible'}`
    );

    const isLiked = this.props.card.likes.some((user) => {
      return user._id === this.context?._id;
    });
    const cardLikeButtonClassName = (
      `card__like-button ${isLiked && "card__like-button_active"}`
    );

    return (
      <>
        <li className="gallery__list-item">
          <figure className="card">
            <div className="card__aspect-ratio">
              <img src={this.props.card.link}
                className="card__image"
                alt={this.props.card.name}
                onClick={this.handleCardClick}
              />
            </div>
            <button className={cardDeleteButtonClassName}
              type="button"
              aria-label="Удалить"
              onClick={this.handleDeleteClick}>
            </button>
            <figcaption className="card__container-caption">
              <h2 className="card__caption">
                {this.props.card.name}
              </h2>
              <button className={cardLikeButtonClassName}
                type="button"
                aria-label="Лайк"
                onClick={this.handleLikeClick}
                onMouseEnter={(event) => {
                  if(this.props.card.likes.length > 0) {
                    this.openTooltip({
                      likes: this.props.card.likes,
                      top: event.pageY,
                      left: event.pageX
                    })
                  }
                }}
                onMouseLeave={this.closeTooltip} >
              </button>
              <p className="card__like-counter">
                {this.props.card.likes.length}
              </p>
            </figcaption>
          </figure>
        </li>

      <Tooltip
        isOpen={this.state.isOpenTooltip}
        likes={this.state.likes}
        position={this.state.positionTooltip} />
    </>
    );
  }
}

export default Card;
