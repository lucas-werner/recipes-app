import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { eatShape, typeShape } from '../services/APIs/shapes';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './FavoriteIcon.css';
import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  getFavStorage,
} from '../services/APIs/APIlocalStorage';

function FavoriteIcon({ recipe, type }) {
  const [isFavorite, setIsFavorite] = useState(
    getFavStorage().some((favorite) => Number(favorite.id) === Number(recipe.id)),
  );

  const handleFavoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(recipe, type);
    return rmFromFavoriteStorage(recipe.id);
  }, [type, recipe]);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite, setIsFavorite]);

  useEffect(() => { handleFavoriteStorage(isFavorite); }, [isFavorite, handleFavoriteStorage]);

  const src = isFavorite ? blackHeart : whiteHeart;
  const alt = `Item is ${isFavorite ? '' : 'not'} favorited`;

  return (
    <button className="hidden-button" onClick={toggleFavorite}>
      <img
        alt={alt}
        data-testid="favorite-btn"
        src={src}
      />
    </button>
  );
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.shape(eatShape).isRequired,
  type: typeShape.isRequired,
};

export default FavoriteIcon;
