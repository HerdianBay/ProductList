export default function CartFull({
  cart,
  onClickDelete,
  onClickConfirmed,
  totalPrice,
}) {
  function handleDeleteClick(id) {
    onClickDelete(id);
  }

  return (
    <>
      <h2 className="font-bold text-red text-2xl">Your Cart ({cart.length})</h2>
      {cart.map((data) => (
        <div className="mt-7" key={data.id}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col">
              <h4 className="font-semibold text-rose900">{data.name}</h4>
              <div className="flex mt-2 gap-4">
                <h5 className="text-red">{data.count}x</h5>
                <p className="text-rose400">@{data.price.toFixed(2)}</p>
                <p className="text-rose500 font-semibold">
                  ${(data.count * data.price).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              className="rounded-full p-1 border border-rose400"
              onClick={() => handleDeleteClick(data.id)}
            >
              <img src="/icon-remove-item.svg" alt="" />
            </button>
          </div>
          <hr className="border border-rose100" />
        </div>
      ))}
      <div className="flex justify-between items-center mt-7">
        <p>Order Total</p>
        <h3 className="font-bold text-xl text-rose900">
          Total ${totalPrice.toFixed(2)}
        </h3>
      </div>
      <div className="flex mt-7 rounded-lg bg-rose100 items-center justify-center py-3">
        <img src="/icon-carbon-neutral.svg" alt="" />
        <p>
          This is a{" "}
          <span className="font-semibold text-sm">carbon-neutral</span> delivery
        </p>
      </div>
      <button
        className="bg-red rounded-full w-full text-white py-3 mt-6"
        onClick={onClickConfirmed}
      >
        Confirm Order
      </button>
    </>
  );
}
