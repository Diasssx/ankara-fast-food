import React from "react";
import Icon from "./Icon";

export default function FilterBar({ filters, setFilters, reset }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  return (
    <section className="filter-bar">
      <div className="filter-title"><Icon name="filters" /> <span>Фильтры</span></div>
      <select value={filters.sort} onChange={(e) => update("sort", e.target.value)}>
        <option value="popular">По популярности</option>
        <option value="cheap">Сначала дешевле</option>
        <option value="expensive">Сначала дороже</option>
      </select>
      <select value={filters.price} onChange={(e) => update("price", e.target.value)}>
        <option value="any">Любая цена</option>
        <option value="under1000">До 1000 ₸</option>
        <option value="1000-2000">1000–2000 ₸</option>
        <option value="2000-3000">2000–3000 ₸</option>
        <option value="3000">3000+ ₸</option>
      </select>
      <div className="quick-filters">
        {[["hit","Хит","flame"],["new","Новинка","spark"],["vegetarian","Вегетарианское","leaf"],["spicy","Острое","flame"]].map(([key,label,icon]) => (
          <button key={key} className={filters[key] ? "active" : ""} onClick={() => update(key, !filters[key])}>
            <Icon name={icon === "spark" ? "heart" : icon} size={15} /> {label}
          </button>
        ))}
      </div>
      <button className="reset-btn" onClick={reset}><Icon name="reset" size={16}/> Сбросить</button>
    </section>
  );
}