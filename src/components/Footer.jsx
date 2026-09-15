import React from "react";
import Icon from "./Icon";
export default function Footer() {
  return <footer><div className="footer-brand"><img src="/logo.png" alt="ANKARA FAST FOOD"/><p>ANKARA FAST FOOD · Байконур</p></div><div className="footer-contact"><span><Icon name="map"/> Байконур</span><span><Icon name="phone"/> Доставка и заказ</span></div><small>© 2026 ANKARA FAST FOOD. Все права защищены.</small></footer>;
}