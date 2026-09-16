import React from "react";
import Icon from "./Icon";

export default function CategoryLanding({ categories, onSelect }) {
  return (
    <section className="category-landing" aria-label="Выбор категории меню">
      <div className="category-landing-head">
        <div>
          <span className="eyebrow">МЕНЮ ANKARA</span>
          <h2>Что будем заказывать?</h2>
          <p>Выберите категорию — сразу покажем все блюда из неё.</p>
        </div>
      </div>
      <div className="category-landing-grid">
        {categories.map((c) => (
          <button key={c.id} className={`category-tile ${c.id === "all" ? "category-tile-all" : ""}`} onClick={() => onSelect(c.id)}>
            <span className="category-tile-icon"><Icon name={c.icon} size={23} /></span>
            <span className="category-tile-text">
              <strong>{c.label}</strong>
              <small>{c.id === "all" ? "Все блюда" : "Смотреть меню"}</small>
            </span>
            <Icon name="right" size={17} />
          </button>
        ))}
      </div>
    </section>
  );
}
