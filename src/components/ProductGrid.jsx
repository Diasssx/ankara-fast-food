import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, addToCart, clearSearch }) {
  if (!products.length) return (
    <div className="empty-state">
      <div className="empty-icon">⌕</div>
      <h2>Ничего не найдено</h2>
      <p>Попробуйте изменить запрос или параметры фильтрации.</p>
      <button className="primary-btn" onClick={clearSearch}>Сбросить поиск</button>
    </div>
  );
  return <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart}/>)}</div>;
}