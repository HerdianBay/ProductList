import ProductListItems from "./ProductListItems";
import { useImmerReducer } from "use-immer";
import CartEmpty from "./CartEmpty";
import CartFull from "./CartFull";
import { useMemo, useState } from "react";

const dummyData = [
  {
    image: "/image-waffle-mobile.jpg",
    type: "Waffle",
    name: "Waffle with Berries",
    price: 6.5,
    thumbnail: "/image-waffle-thumbnail.jpg",
  },
  {
    image: "/image-creme-brulee-mobile.jpg",
    type: "Creme Brulee",
    name: "Vanilla Bean Creme Brulee",
    price: 7.0,
    thumbnail: "/image-creme-brulee-thumbnail.jpg",
  },
  {
    image: "/image-macaron-mobile.jpg",
    type: "Macaron",
    name: "Macaron Mix of Five",
    price: 8.0,
    thumbnail: "/image-macaron-thumbnail.jpg",
  },
  {
    image: "/image-tiramisu-mobile.jpg",
    type: "Tiramisu",
    name: "Classic Tiramisu",
    price: 5.5,
    thumbnail: "/image-tiramisu-thumbnail.jpg",
  },
  {
    image: "/image-baklava-mobile.jpg",
    type: "Baklava",
    name: "Pistachio Baklava",
    price: 4.0,
    thumbnail: "/image-baklava-thumbnail.jpg",
  },
  {
    image: "/image-meringue-mobile.jpg",
    type: "Pie",
    name: "Lemon Meringue Pie",
    price: 5.0,
    thumbnail: "/image-meringue-thumbnail.jpg",
  },
  {
    image: "/image-cake-mobile.jpg",
    type: "Cake",
    name: "Red Velvet Cake",
    price: 4.5,
    thumbnail: "/image-cake-thumbnail.jpg",
  },
  {
    image: "/image-brownie-mobile.jpg",
    type: "Brownie",
    name: "Salted Caramel Brownie",
    price: 5.5,
    thumbnail: "/image-brownie-thumbnail.jpg",
  },
  {
    image: "/image-panna-cotta-mobile.jpg",
    type: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    price: 6.5,
    thumbnail: "/image-panna-cotta-thumbnail.jpg",
  },
];

function cartReducer(draft, action) {
  if (action.type == "ADD_CART") {
    draft.push({
      id: action.id,
      name: action.name,
      count: action.count,
      price: action.price,
      thumbnail: action.thumbnail,
    });
  } else if (action.type == "UPDATE_CART") {
    const indexItem = draft.findIndex((item) => item.id == action.id);
    draft[indexItem].count = action.count;
  } else if (action.type == "DELETE_CART") {
    const indexItem = draft.findIndex((item) => item.id == action.id);
    draft.splice(indexItem, 1);
  }
}

export default function ProductListCart() {
  const [cartData, dispatch] = useImmerReducer(cartReducer, []);
  const [isClicked, setIsClicked] = useState(false);
  const totalPrice = useMemo(() => {
    return cartData.reduce((total, item) => total + item.count * item.price, 0);
  }, [cartData]);

  function handleAddCart(cart) {
    dispatch({
      type: "ADD_CART",
      id: cart.id,
      name: cart.name,
      count: cart.count,
      price: cart.price,
      thumbnail: cart.thumbnail,
    });
  }

  function handleUpdateCart(cart) {
    dispatch({
      type: "UPDATE_CART",
      id: cart.id,
      count: cart.count,
    });
  }

  function handleDeleteCart(id) {
    dispatch({
      type: "DELETE_CART",
      id: id,
    });
  }

  function handleConfirmClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div className="container mx-auto p-6 relative z-0 lg:max-w-screen-xl lg:p-16 lg:flex lg:gap-8">
      <div className="lg:w-2/3">
        <h1 className="font-bold text-4xl text-rose900">Desserts</h1>
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          {dummyData.map((data, index) => (
            <ProductListItems
              key={index}
              id={index}
              image={data.image}
              type={data.type}
              name={data.name}
              price={data.price}
              thumbnail={data.thumbnail}
              count={cartData.find((item) => item.id == index)?.count || 0}
              onClickAdd={handleAddCart}
              onClickUpdate={handleUpdateCart}
            />
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-white mt-8 p-5 lg:mt-0 lg:w-1/3 lg:max-h-fit">
        {(() => {
          if (cartData.length == 0) {
            return <CartEmpty />;
          } else {
            return (
              <>
                <CartFull
                  cart={cartData}
                  onClickDelete={handleDeleteCart}
                  onClickConfirmed={handleConfirmClick}
                  totalPrice={totalPrice}
                />
              </>
            );
          }
        })()}
      </div>
      {isClicked && (
        <div className="fixed inset-0 z-5 backdrop-brightness-40 bg-white/10"></div>
      )}
      {isClicked && (
        <div className="absolute z-10 w-full bottom-0 left-0 bg-white px-6 lg:max-w-[500px] lg:bottom-1/2 lg:left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img src="/icon-order-confirmed.svg" alt="" className="mt-10" />
          <div className="mt-6">
            <h2 className="text-4xl text-rose900 font-bold max-w-[30px]">
              Order Confirmed
            </h2>
            <p className="text-rose400 text-sm mt-2">
              We hope you enjoy your food!
            </p>
          </div>
          <div className="rounded-md bg-rose50 p-6 mt-8">
            {cartData.map((item) => (
              <div>
                <div className="flex flex-row justify-between items-center">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="w-14 h-14 rounded-md"
                  />
                  <div className="text-sm w-36">
                    <h5 className="font-bold text-rose900 truncate">
                      {item.name}
                    </h5>
                    <div className="flex flex-row mt-1">
                      <h5 className="text-red font-semibold">{item.count}x </h5>
                      <p className="ml-2 text-rose400">
                        @ ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <h5 className="font-bold text-rose900">
                    ${(item.count * item.price).toFixed(2)}
                  </h5>
                </div>
                <hr className="border border-rose100 mt-4 mb-4" />
              </div>
            ))}
            <div className="flex items-center justify-between">
              <p className="text-rose500 text-sm">Order Total</p>
              <h3 className="text-rose900 font-bold text-2xl">${totalPrice}</h3>
            </div>
          </div>
          <button
            className="text-white bg-red rounded-full w-full py-3 mt-8 mb-4"
            onClick={() => window.location.reload()}
          >
            Start New Order
          </button>
        </div>
      )}
    </div>
  );
}
