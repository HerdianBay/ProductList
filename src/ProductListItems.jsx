export default function ProductListItems({
  id,
  image,
  type,
  name,
  price,
  count,
  thumbnail,
  onClickAdd,
  onClickUpdate,
}) {
  function handleAdd(cart) {
    onClickAdd(cart);
  }

  function handleUpdateReduce() {
    if (count > 1) {
      onClickUpdate({
        id: id,
        count: count - 1,
      });
    }
  }

  function handleUpdateAdd() {
    onClickUpdate({
      id: id,
      count: count + 1,
    });
  }

  return (
    <div className="mt-8 lg:basis-1/3">
      <div className="relative">
        {count > 0 ? (
          <>
            <img
              src={image}
              alt=""
              className="rounded-lg border-3 border-red lg:object-cover lg:object-center lg:h-[200px]"
            />
            <div className="flex rounded-full w-40 items-center justify-between py-2 px-4 font-semibold absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red hover:cursor-pointer text-rose-50 text-sm">
              <button onClick={handleUpdateReduce}>
                <img
                  src="/icon-decrement-quantity.svg"
                  alt=""
                  className="rounded-full border border-rose-50 h-4 w-4 p-0.5"
                />
              </button>
              {count}
              <button onClick={handleUpdateAdd}>
                <img
                  src="/icon-increment-quantity.svg"
                  alt=""
                  className="rounded-full border border-rose-50 h-4 w-4 p-0.5"
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={image}
              alt=""
              className="rounded-lg lg:object-cover lg:object-center lg:h-[200px]"
            />
            <button
              className="flex rounded-full w-40 items-center justify-center py-3 border-2 border-rose300 gap-2 font-semibold absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white hover:cursor-pointer lg:py-2"
              onClick={() =>
                handleAdd({
                  id: id,
                  type: type,
                  name: name,
                  price: price,
                  thumbnail: thumbnail,
                  count: 1,
                })
              }
            >
              <img src="/icon-add-to-cart.svg" alt="" />
              Add to Cart
            </button>
          </>
        )}
      </div>
      <div className="mt-8">
        <p className="text-rose500">{type}</p>
        <h3 className="text-rose900 font-semibold">{name}</h3>
        <h3 className="text-red">${price.toFixed(2)}</h3>
      </div>
    </div>
  );
}
