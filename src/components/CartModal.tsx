import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface CartModalPropsType {
  cartState: boolean;
  closeCart: () => void;
}

interface CartItemProps {
  imageUrl: string;
  name: string;
  price: number;
  initialQuantity?: number;
}

function CartItem({
  imageUrl,
  name,
  price,
  initialQuantity = 1,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Image
        src={imageUrl}
        alt={name}
        width={80}
        height={80}
        className="rounded-xl object-cover"
      />

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-base text-gray-500">Rs. {price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="min-w-[20px] text-center">{quantity}</span>

        <button
          onClick={increment}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div>
        <Trash2 />
      </div>
    </div>
  );
}

const CartModal = (props: CartModalPropsType) => {
  const { cartState, closeCart } = props;
  console.log(props);
  return (
    <div
      className={`absolute h-[100dvh] right-0 top-20 overflow-hidden box-border backdrop-blur-3xl bg-rose-100 bg-opacity-10 transition-all duration-300  shadow-2xl max-w-screen ${
        cartState ? "w-auto" : "w-0"
      }`}
    >
      <div className="flex flex-col px-5">
        <div className="w-full justify-end">
          <button className="p-2 text-gray-600" onClick={closeCart}>
            <X />
          </button>
        </div>
        <div className="w-full">
          <h4 className="text-center font-bold text-rose-500 text-3xl mb-6">
            Cart
          </h4>
          <ul>
            <li>
              <CartItem
                imageUrl="https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg"
                name="Delicious Burger"
                price={10}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
