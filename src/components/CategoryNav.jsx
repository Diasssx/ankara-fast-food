import React from "react";
import { useRef } from "react";
import Icon from "./Icon";

export default function CategoryNav({ categories, selected, setSelected }) {
  const ref = useRef(null);
  const scroll = (n) => ref.current?.scrollBy({ left: n, behavior: "smooth" });

  return (
    <section className="category-wrap">
      <button className="round-arrow" onClick={() => scroll(-360)} aria-label="Назад"><Icon name="left" /></button>
      <div className="category-scroll" ref={ref}>
        {categories.map((c) => (
          <button key={c.id} className={`category-pill ${selected === c.id ? "selected" : ""}`} onClick={() => setSelected(c.id)}>
            <Icon name={c.icon} size={17} />
            <span>{c.label}</span>
          </button>
        ))}
      </div>
      <button className="round-arrow" onClick={() => scroll(360)} aria-label="Вперёд"><Icon name="right" /></button>
    </section>
  );
}