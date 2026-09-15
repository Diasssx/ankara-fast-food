import React from "react";
import { useState } from "react";
import Icon from "./Icon";

export default function Header({ cartCount, search, setSearch, onCart }) {
  const [open, setOpen] = useState(false);
  const nav = ["Главная", "Меню", "Акции", "О нас", "Контакты"];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#" aria-label="ANKARA FAST FOOD">
          <img src="/logo.png" alt="ANKARA FAST FOOD" />
        </a>

        <nav className={`desktop-nav ${open ? "open" : ""}`}>
          {nav.map((item) => (
            <a key={item} className={item === "Меню" ? "active" : ""} href={item === "Меню" ? "#menu" : "#"}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <Icon name="search" size={18} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск блюда..." />
          </label>
          <button className="cart-button" onClick={onCart}>
            <Icon name="cart" size={19} />
            <span>Корзина</span>
            <b>{cartCount}</b>
          </button>
          <button className="icon-button mobile-only" onClick={() => setOpen(!open)} aria-label="Меню">
            <Icon name={open ? "close" : "menu"} size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}