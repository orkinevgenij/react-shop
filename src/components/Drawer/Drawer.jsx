import React from 'react';
import axios from 'axios';

import { Info } from '../Info';
import { useCart } from '../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(false);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://63482d080484786c6e93eb8f.mockapi.io/orders`, {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://63482d080484786c6e93eb8f.mockapi.io/cart/` + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа:(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h3 className="d-flex justify-between  mb-30  ">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h3>
        {items.length > 0 ? (
          <div className="d-flex  flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кросовок...'
            }
            image={isOrderComplete ? '/img/complete.jpg' : '/img/empty-cart.jpg'}
          />
        )}
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <p />
              <b>{totalPrice} грн.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <p />
              <b>{Math.round(totalPrice * 0.05)} грн.</b>
            </li>
          </ul>
          <button
            disabled={isLoading}
            onClick={onClickOrder}
            className="greenButton">
            Оформить заказ
            <img
              src="/img/arrow.svg"
              alt="Arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
