import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context';
import { useCart } from '../hooks/useCart';
export const Header = ({ onClickCart }) => {
  const { totalPrice, cartItems } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            width={40}
            height={40}
            src={'img/logo.png'}
            alt="Logo"
          />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p">
          <img
            onClick={onClickCart}
            src={cartItems.length > 0 ? 'img/cart-active.svg' : 'img/cart.svg'}
            alt="Корзина"
          />
          <span>{totalPrice} грн</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img
              src="img/heart.svg"
              alt="Закладки"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              width={18}
              height={18}
              src="img/user.svg"
              alt=""
            />
          </Link>
        </li>
      </ul>
    </header>
  );
};
