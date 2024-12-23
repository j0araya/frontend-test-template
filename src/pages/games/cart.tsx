import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useCart from "../../hooks/useCart";
import ICON_X from "../../../public/shopping-cart/icon-remove.svg";
import ICON_BACK from "../../../public/shopping-cart/icon-back.svg";
import "../../app/globals.css";
import Button from "@/components/Button";
import Layout from "@/components/Layout";

const CartPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const { cart, removeFromCart } = useCart();
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price,
    0
  );

  useEffect(() => {
    setLoading(false);
  }, [cart]);

  const items = Object.values(cart).length;
  const onClickCheckout = () => {
    setLoadingCheckout(true);
    // simulate checkout
    setTimeout(() => {
      setCheckout(true);
      setLoadingCheckout(false);
    }, 2000);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="py-6 sm:px-32 xs:px-6">
        <button
          className="font-medium flex items-center gap-x-2"
          onClick={() => router.back()}
        >
          <Image src={ICON_BACK} width={12} height={12} alt="back icon" /> Back
          to Catalog
        </button>
      </div>
      <div className="sm:px-32 xs:px-6 grid gap-3">
        <h1 className="text-4xl text-neutral-800 font-bold xs:text-2xl">
          Your Cart
        </h1>
        <h3 className="font-normal text-primary text-2xl xs:text-xl">
          {items} item{items === 1 ? "" : "s"}
        </h3>
      </div>
      <div></div>
      <div className="sm:px-32 xs:px-6 py-12 xs:py-8 grid xs:gap-8 md:grid-cols-2">
        {/* GAMES */}
        <div>
          {Object.values(cart).map((item) => (
            <div
              key={item.id}
              className="last:border-none border-b py-5 flex xs:flex-col sm:flex-row gap-x-6 relative"
            >
              <div className="xs:mr-0 mr-3 xs:justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={256}
                  height={156}
                  className="w-auto xs:w-[259px] xs:h-[136px] sm:h-[156px]"
                />
              </div>
              <div>
                <div className="flex-1 grid gap-2 xs:mt-4 sm:mt-0 sm:mr-4">
                  <p className="uppercase text-neutral-500 font-bold xs:text-sm">
                    {item.genre}
                  </p>
                  <div className="grid gap-1">
                    <h2 className="font-bold text-xl text-gray-medium xs:text-lg">
                      {item.name}
                    </h2>
                    <p className="font-normal text-base text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-6 font-bold text-xl xs:h-[40px] xs:align-bottom xs:text-lg sm:mr-12 sm:mt-2">
                  <span className="mt-auto">${item.price}</span>
                </div>
              </div>
              <button
                className="text-sm p-[2px] top-6 right-6 absolute"
                onClick={() => removeFromCart(item.id)}
              >
                <Image
                  src={ICON_X}
                  alt="remove button"
                  height={12}
                  width={12}
                  style={{ height: "12px", maxHeight: "12px" }}
                />
              </button>
            </div>
          ))}
        </div>
        {/* ORDER SUMMARY */}
        <div className="grid gap-8">
          <div className="border-[0.5px] border-stroke-secondary rounded-lg px-6 py-8 grid gap-8">
            <div className="grid gap-5">
              <h2 className="font-bold text-2xl">Order Summary</h2>
              <p className="font-normal text-lg text-primary">
                {items} item{items === 1 ? "" : "s"}
              </p>
            </div>
            <div className="py-5 grid gap-6">
              <div className="grid gap-3">
                {Object.values(cart).map((product) => (
                  <div className="flex text-primary" key={product.id}>
                    <p className="flex-1 sm:text-xl">{product.name}</p>
                    <span className="sm:text-xl">$ {product.price}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-stroke-secondary h-[1px]" />
              <div>
                <div className="flex font-bold text-primary">
                  <p className="flex flex-1 text-xl">Order Total</p>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={onClickCheckout}
            className="bg-[#585660] font-bold w-full"
            disabled={loadingCheckout}
          >
            {checkout ? "Done!" : " Checkout"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
