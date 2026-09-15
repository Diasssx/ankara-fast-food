import React from "react";
import {
  Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, SlidersHorizontal,
  ArrowUpDown, Trash2, Plus, Minus, Heart, Flame, Leaf, Coffee, Soup,
  Pizza, Sandwich, Layers3, Utensils, Droplets, CakeSlice, CupSoda, Grid2X2,
  MapPin, Phone, MessageCircle, RotateCcw, Check, Truck, Store, Banknote,
  CreditCard, ChevronDown
} from "lucide-react";

const icons = {
  search: Search, cart: ShoppingCart, menu: Menu, close: X, left: ChevronLeft,
  right: ChevronRight, filters: SlidersHorizontal, sort: ArrowUpDown, trash: Trash2,
  plus: Plus, minus: Minus, heart: Heart, flame: Flame, leaf: Leaf, coffee: Coffee,
  soup: Soup, pizza: Pizza, sandwich: Sandwich, layers: Layers3, utensils: Utensils,
  droplets: Droplets, cake: CakeSlice, cup: CupSoda, grid: Grid2X2, map: MapPin,
  phone: Phone, whatsapp: MessageCircle, reset: RotateCcw, check: Check, truck: Truck,
  store: Store, cash: Banknote, card: CreditCard, down: ChevronDown
};

export default function Icon({ name, size = 18, strokeWidth = 1.9, ...props }) {
  const C = icons[name] || Grid2X2;
  return <C size={size} strokeWidth={strokeWidth} {...props} />;
}