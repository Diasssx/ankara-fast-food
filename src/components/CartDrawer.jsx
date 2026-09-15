import React from "react";
import Icon from "./Icon";

export default function CartDrawer({ open, cart, total, changeQty, removeItem, onClose, onCheckout }) {
  return (
    <>
      {open && <div className="drawer-overlay" onClick={onClose}/>}
      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="drawer-head"><div><span className="eyebrow">ВАШ ЗАКАЗ</span><h2>Корзина</h2></div><button className="icon-button" onClick={onClose}><Icon name="close"/></button></div>
        {cart.length === 0 ? (
          <div className="cart-empty"><Icon name="cart" size={42}/><h3>Корзина пока пуста</h3><p>Добавьте любимые блюда из меню.</p><button className="primary-btn" onClick={onClose}>Перейти в меню</button></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.key}>
                  <div className="mini-food">A</div>
                  <div className="cart-info"><h4>{item.name}</h4><span>{item.optionLabel || "Стандарт"}</span><b>{item.price.toLocaleString("ru-RU")} ₸</b>
                    <div className="qty"><button onClick={() => changeQty(item.key,-1)}><Icon name="minus" size={14}/></button><strong>{item.qty}</strong><button onClick={() => changeQty(item.key,1)}><Icon name="plus" size={14}/></button></div>
                  </div>
                  <button className="delete-btn" onClick={() => removeItem(item.key)}><Icon name="trash" size={17}/></button>
                </div>
              ))}
            </div>
            <div className="drawer-bottom"><div className="total-row"><span>Итого</span><strong>{total.toLocaleString("ru-RU")} ₸</strong></div><button className="checkout-btn" onClick={onCheckout}>Оформить заказ <Icon name="right" size={18}/></button></div>
          </>
        )}
      </aside>
    </>
  );
}