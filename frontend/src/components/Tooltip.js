import {useEffect, useState, useRef, memo } from 'react';

function Tooltip({ isOpen, likes, position: cursorPosition }) {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    right: 0
  });
  const [coordinates, setCoordinates] = useState(null);
  const tooltip = useRef(null);

  useEffect(() => {
    setPosition({
      top: cursorPosition.top,
      left: cursorPosition.left,
      right: 'auto'
    });
    setCoordinates(tooltip.current.getBoundingClientRect());
  }, [isOpen]);

  useEffect(() => {
    const coords = tooltip.current.getBoundingClientRect();
    if(coords.right > document.documentElement.clientWidth) {
      setPosition({
        top: position.top,
        left: 'auto',
        right: 0
      });
    }
  }, [coordinates]);

  return (
    <div className={`tooltip-likes ${isOpen && 'popup_opened'}`}
      ref={tooltip}
      style={{
            top: position.top,
            left: position.left,
            right: position.right
          }}>
      {likes.map((like, i) => (
        <img key={like._id}
          src={like.avatar}
          className="tooltip-likes__avatar" />
      ))}
    </div>
  );
}

export default memo(Tooltip);
