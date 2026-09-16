import React from "react";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryNav from "./components/CategoryNav";
import CategoryLanding from "./components/CategoryLanding";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import Icon from "./components/Icon";
import { categories, products } from "./data/menu";

const CART_KEY = "ankara-cart-v2";
const savedCart = () => {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value.filter(item =>
      item && typeof item.key === "string" && Number(item.qty) > 0 && Number.isFinite(Number(item.price))
    ) : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({sort:"popular",price:"any",hit:false,new:false,vegetarian:false,spicy:false});
  const [cart, setCart] = useState(savedCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => { if(toast) { const t=setTimeout(()=>setToast(""),2200); return ()=>clearTimeout(t); } }, [toast]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter(p => {
      const cat = category === null || category === "all" || p.category === category;
      const hay = `${p.name} ${p.description} ${categories.find(c=>c.id===p.category)?.label || ""}`.toLowerCase();
      const found = !q || hay.includes(q);
      const price = p.options?.length ? Math.min(...p.options.map(o=>o.price)) : p.price;
      const priceOk = filters.price==="any" ||
        (filters.price==="under1000" && price<1000) ||
        (filters.price==="1000-2000" && price>=1000 && price<=2000) ||
        (filters.price==="2000-3000" && price>2000 && price<=3000) ||
        (filters.price==="3000" && price>=3000);
      return cat && found && priceOk &&
        (!filters.hit || p.isHit) && (!filters.new || p.isNew) &&
        (!filters.vegetarian || p.isVegetarian) && (!filters.spicy || p.isSpicy);
    });
    if(filters.sort==="cheap") list.sort((a,b)=>(a.options?.[0]?.price??a.price)-(b.options?.[0]?.price??b.price));
    if(filters.sort==="expensive") list.sort((a,b)=>(b.options?.[0]?.price??b.price)-(a.options?.[0]?.price??a.price));
    if(filters.sort==="popular") list.sort((a,b)=>(Number(b.isHit)-Number(a.isHit)) || (Number(b.isNew)-Number(a.isNew)));
    return list;
  }, [category, search, filters]);

  const addToCart = (product, option) => {
    const optionLabel = option?.label || "";
    const price = option?.price ?? product.price;
    const key = `${product.id}-${optionLabel || "default"}`;
    setCart(prev => {
      const exists = prev.find(i=>i.key===key);
      return exists ? prev.map(i=>i.key===key ? {...i,qty:i.qty+1} : i) : [...prev,{key,id:product.id,name:product.name,optionLabel,price,qty:1}];
    });
    setToast("Добавлено в корзину");
    setCartOpen(true);
  };
  const changeQty = (key, delta) => setCart(c=>c.map(i=>i.key===key?{...i,qty:i.qty+delta}:i).filter(i=>i.qty>0));
  const removeItem = key => setCart(c=>c.filter(i=>i.key!==key));
  const reset = () => { setFilters({sort:"popular",price:"any",hit:false,new:false,vegetarian:false,spicy:false}); setSearch(""); setCategory(null); };
  const selectCategory = (id) => {
    setSearch("");
    setCategory(id);
    setTimeout(() => document.getElementById("menu-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  return <>
    <Header cartCount={cartCount} search={search} setSearch={setSearch} onCart={()=>setCartOpen(true)}/>
    <main>
      <Hero/>
      <div className="content" id="menu">
        {category === null && !search.trim() ? (
          <CategoryLanding categories={categories} onSelect={selectCategory}/>
        ) : (
          <>
            <CategoryNav categories={categories} selected={category || "all"} setSelected={selectCategory}/>
            <div id="menu-results">
              <FilterBar filters={filters} setFilters={setFilters} reset={reset}/>
              <div className="results-head"><div><span className="eyebrow">МЕНЮ</span><h2>{categories.find(c=>c.id===category)?.label || "Все блюда"}</h2></div><span>{filtered.length} позиций</span></div>
              <ProductGrid products={filtered} addToCart={addToCart} clearSearch={reset}/>
            </div>
            <PromoBanner/>
          </>
        )}
      </div>
    </main>
    <Footer/>
    <CartDrawer open={cartOpen} cart={cart} total={total} changeQty={changeQty} removeItem={removeItem} onClose={()=>setCartOpen(false)} onCheckout={()=>{setCartOpen(false);setCheckout(true)}}/>
    <CheckoutModal open={checkout} cart={cart} total={total} onClose={()=>setCheckout(false)}/>
    {cartCount > 0 && <button className="mobile-cart-bar" onClick={()=>setCartOpen(true)}>
      <span><Icon name="cart" size={18}/> Корзина <b>{cartCount}</b></span>
      <strong>{total.toLocaleString("ru-RU")} ₸</strong>
    </button>}
    {toast && <div className="toast"><span><Icon name="check" size={16}/></span>{toast}<button onClick={()=>setCartOpen(true)}>Открыть корзину</button></div>}
  </>;
}