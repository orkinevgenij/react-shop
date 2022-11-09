import React from 'react';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../context';

import styles from './Card.module.scss';
export const Card = ({
  id,
  title,
  imgUrl,
  price,
  onAddToCart,
  onFavorite,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imgUrl, price };
  const onClickPlus = () => {
    onAddToCart(obj);
  };
  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <circle
            cx="554"
            cy="519"
            r="97"
          />
          <circle
            cx="554"
            cy="519"
            r="97"
          />{' '}
          <circle
            cx="554"
            cy="519"
            r="97"
          />{' '}
          <circle
            cx="554"
            cy="519"
            r="97"
          />
          <rect
            x="0"
            y="0"
            rx="10"
            ry="10"
            width="150"
            height="91"
          />
          <rect
            x="0"
            y="106"
            rx="5"
            ry="5"
            width="150"
            height="15"
          />
          <rect
            x="0"
            y="127"
            rx="5"
            ry="5"
            width="93"
            height="15"
          />
          <rect
            x="0"
            y="165"
            rx="10"
            ry="10"
            width="80"
            height="24"
          />
          <rect
            x="113"
            y="161"
            rx="5"
            ry="5"
            width="32"
            height="32"
          />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div
              className={styles.favorite}
              onClick={onClickFavorite}>
              <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} />
            </div>
          )}
          <img
            width={133}
            heigh={112}
            src={imgUrl}
            alt=""
          />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column mt-15">
              <span>Цена:</span>
              <b>{price} грн.</b>
            </div>
            {onAddToCart && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
