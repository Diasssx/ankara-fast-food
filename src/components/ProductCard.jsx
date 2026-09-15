import React from "react";
import { useState } from "react";
import Icon from "./Icon";

export default function ProductCard({ product, addToCart }) {
  const [option, setOption] = useState(product.options?.[0] || null);
  const price = option?.price ?? product.price;
  return (
    <article className="product-card">
      <div className="product-image">
        <div className="food-placeholder">
          <span>ANKARA</span>
          <small>FAST FOOD</small>
        </div>
        <div className="badges">
          {product.isHit && <span className="badge hit"><Icon name="flame" size={13}/> Хит</span>}
          {product.isNew && <span className="badge new">Новинка</span>}
        </div>
        <button className="favorite" aria-label="Добавить в избранное"><Icon name="heart" size={17}/></button>
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        {product.options?.length ? (
          <div className="options">
            <span>Выберите объём</span>
            <div className="option-grid">
              {product.options.map((o) => (
                <button key={o.label} className={option?.label === o.label ? "selected" : ""} onClick={() => setOption(o)}>
                  <b>{o.label}</b><small>{o.price.toLocaleString("ru-RU")} ₸</small>
                </button>
              ))}
            </div>
          </div>
        ) : <div className="option-space" />}

        <div className="product-footer">
          <strong>{price.toLocaleString("ru-RU")} ₸</strong>
          <button className="add-btn" onClick={() => addToCart(product, option)}>
            <Icon name="plus" size={17}/> В корзину
          </button>
        </div>
      </div>
    </article>
  );
}