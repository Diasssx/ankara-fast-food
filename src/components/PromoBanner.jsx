import React from "react";
import Icon from "./Icon";
export default function PromoBanner() {
  return <section className="promo"><div><span className="eyebrow">ANKARA FAST FOOD</span><h2>Насладись вкусом вместе с Ankara</h2><p>Горячий чай, любимые блюда и тёплые встречи — всегда хорошая идея.</p><a href="#menu">Смотреть всё меню <Icon name="right" size={17}/></a></div><div className="promo-points"><span><Icon name="leaf"/> Натуральные ингредиенты</span><span><Icon name="heart"/> Любимые вкусы</span><span><Icon name="coffee"/> Для тёплых встреч</span></div></section>;
}