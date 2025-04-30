export default function CartEmpty() {
  return (
    <>
      <h2 className="font-bold text-red text-2xl">Your Cart (0)</h2>
      <img src="/illustration-empty-cart.svg" alt="" className="mx-auto mt-8" />
      <p className="text-center pb-7 text-rose500 font-semibold mt-4">
        Your added items will appear hear
      </p>
    </>
  );
}
