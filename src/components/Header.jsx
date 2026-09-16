import React from "react";
import { useState } from "react";
import Icon from "./Icon";

const INSTAGRAM_URL = "https://www.instagram.com/ankara_baikonur?stkn=ajhvdTkxOWZvMjY4";

export default function Header({ cartCount, search, setSearch, onCart }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const nav = ["Главная", "Меню", "Контакты"];

  const submitSearch = (e) => {
    e?.preventDefault();
    if (search.trim()) {
      document.getElementById("menu-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#" aria-label="ANKARA FAST FOOD">
          <img src="/logo.png" alt="ANKARA FAST FOOD" />
        </a>

        <nav className={`desktop-nav ${open ? "open" : ""}`}>
          {nav.map((item) => (
            <a key={item} className={item === "Меню" ? "active" : ""} href={item === "Меню" ? "#menu" : "#"} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="instagram-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram ANKARA FAST FOOD"
            title="Instagram ANKARA FAST FOOD"
          >
            <Icon name="instagram" size={19} />
            <span>Instagram</span>
          </a>

          <form className="search-box" onSubmit={submitSearch}>
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Поиск блюда..."
              aria-label="Поиск блюда"
            />
          </form>

          <button className="mobile-search-button icon-button" onClick={() => setSearchOpen((v) => !v)} aria-label="Поиск">
            <Icon name="search" size={19} />
          </button>

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

      {searchOpen && (
        <form className="mobile-search-panel" onSubmit={submitSearch}>
          <Icon name="search" size={18} />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти блюдо..."
            aria-label="Поиск блюда"
          />
          {search && (
            <button type="button" className="mobile-search-clear" onClick={() => setSearch("")} aria-label="Очистить поиск">
              <Icon name="close" size={17} />
            </button>
          )}
        </form>
      )}
    </header>
  );
}
