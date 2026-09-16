import React from "react";
import { useState } from "react";
import Icon from "./Icon";

const WHATSAPP_NUMBER = "ВСТАВЬ_НОМЕР";

export default function CheckoutModal({ open, cart, total, onClose }) {
  const [form, setForm] = useState({name:"", phone:"", receive:"delivery", address:"", payment:"kaspi", comment:""});
  if (!open) return null;
  const set = (key, value) => setForm(f => ({...f,[key]:value}));

  const order = () => {
    const lines = cart.map(i => `• ${i.name}${i.optionLabel ? ` ${i.optionLabel}` : ""} × ${i.qty} — ${(i.price*i.qty).toLocaleString("ru-RU")} ₸`).join("\n");
    const text = `Здравствуйте! Хочу сделать заказ в Ankara Fast Food — Байконур.\n\nИмя: ${form.name}\nТелефон: ${form.phone}\nПолучение: ${form.receive === "delivery" ? "Доставка" : "С собой"}\n${form.receive === "delivery" ? `Адрес: ${form.address}\n` : ""}Оплата: ${form.payment === "kaspi" ? "Kaspi" : "Наличные"}\n\nЗаказ:\n${lines}\n\nИтого: ${total.toLocaleString("ru-RU")} ₸\nКомментарий: ${form.comment || "—"}`;
    if (WHATSAPP_NUMBER === "ВСТАВЬ_НОМЕР") {
      alert("Укажите номер WhatsApp в src/components/CheckoutModal.jsx");
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return <div className="modal-overlay" onClick={onClose}>
    <div className="checkout-modal" onClick={e=>e.stopPropagation()}>
      <div className="modal-head"><div><span className="eyebrow">ANKARA FAST FOOD · БАЙКОНУР</span><h2>Оформление заказа</h2></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div>
      <div className="form-grid">
        <label>Имя<input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Ваше имя"/></label>
        <label>Телефон<input value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+7 7XX XXX XX XX"/></label>
      </div>
      <div className="form-label">Получение заказа</div>
      <div className="radio-row">
        <button className={form.receive==="delivery"?"chosen":""} onClick={()=>set("receive","delivery")}><Icon name="truck"/> Доставка</button>
        <button className={form.receive==="pickup"?"chosen":""} onClick={()=>set("receive","pickup")}><Icon name="store"/> С собой</button>
      </div>
      {form.receive==="delivery" && <label>Адрес<input value={form.address} onChange={e=>set("address",e.target.value)} placeholder="Улица, дом, квартира"/></label>}
      <div className="form-label">Способ оплаты</div>
      <div className="radio-row">
        <button className={form.payment==="kaspi"?"chosen":""} onClick={()=>set("payment","kaspi")}><Icon name="card"/> Kaspi</button>
        <button className={form.payment==="cash"?"chosen":""} onClick={()=>set("payment","cash")}><Icon name="cash"/> Наличные</button>
      </div>
      <label>Комментарий<textarea value={form.comment} onChange={e=>set("comment",e.target.value)} placeholder="Например: без лука..."/></label>
      <button className="checkout-btn full" onClick={order}>Заказать через WhatsApp <Icon name="whatsapp" size={18}/></button>
    </div>
  </div>;
}