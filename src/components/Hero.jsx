import React from "react";
export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="breadcrumbs"><span>Главная</span><i>/</i><b>Меню</b></div>
        <span className="eyebrow">ANKARA FAST FOOD · БАЙКОНУР</span>
        <h1>Меню</h1>
        <p>Любимые блюда, горячие напитки и вкусные моменты — всё в одном меню.</p>
      </div>
      <div className="hero-orb" aria-hidden="true">
        <span>ANKARA</span>
        <small>FAST FOOD</small>
      </div>
    </section>
  );
}