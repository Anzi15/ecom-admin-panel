import React, { useEffect, useState } from "react";
import emptyCartImg from "../assets/empty-cart.webp";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../modules/firebase-modules/firestore";
import CartItem from "../components/CartItem";
const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Get initial cart items from localStorage
    return JSON.parse(localStorage.getItem('cart-items')) || [];
  });
  const [subTotal, setSubTotal] = useState(null)
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    if (cartItems?.length) {
      const getCartProducts = async (allProducts) => {
        const productsArr = [];
        allProducts.map((product) => {
          const quantity = product.quantity;
          const selectedVariant = product.selectedVariant;
          const id = product.productId;
          console.log(quantity);
          const allData = {
            ...product.data,
            quantity,
            selectedVariant,
            id,
            quantityUpdater: (newQuantity) => {
              if (newQuantity > 0) {
                allData.quantity = newQuantity;
              }
            },
          };

          console.log(allData);
          productsArr.push(allData);
        });
        return productsArr;
      };

      getCartProducts(cartItems).then((products) => {
        let subtotal = 0;
       products.map((product)=>{
        subtotal +=  product.selectedVariant.price * product.quantity;
        console.log( product.selectedVariant.price * product.quantity)
       })
       setSubTotal(subtotal)
        setProducts(products); // Filter out null values
        setProductsLoading(false);
      });
    } else {
      setProductsLoading(false);
    }
  }, [cartItems]);

  return (
    <main className="overflow-x-hidden py-8">
      {cartItems?.length ? (
        <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
            <div className="grid grid-cols-12 md:order--1 order-1">
              <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto order-1 md:order-2">
                <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                    Shopping Cart
                  </h2>
                  <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                    {cartItems.length} Items
                  </h2>
                </div>
                <div className="md:grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200 hidden">
                  <div className="col-span-12 md:col-span-7">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Product Details
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-5">
                      <div className="col-span-3">
                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                          Quantity
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                          Total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {products.length &&
                  products.map((product, i) => {
                    return (
                      <CartItem
                        key={i}
                        product={product}
                        productsLoading={productsLoading}
                        quantity={product.quantity}
                        cartItemsUpdater={setCartItems}
                      />
                    );
                  })}
              </div>

              <div className=" col-span-12 xl:col-span-4 md:bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 md:py-24  md:order-2 order">
                <h2
                  className="font-manrope font-bold md:text-3xl text-2xl leading-10 text-black pb-8 border-b border-gray-300 md:text-center text-left pl-4 flex gap-4 p-3 items-center "
                  onClick={() => {
                    setIsSummaryExpanded(!isSummaryExpanded);
                  }}
                >
                  Order Summary
                  <div
                    className={`"flex md:hidden  ${
                      isSummaryExpanded ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg
                      className="ml-2 my-auto"
                      width={16}
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </h2>
                <div className={`mt-8 md:flex flex-col  ${isSummaryExpanded ? "flex" : "hidden"}`}>
                  <div className="flex items-center justify-between pb-6">
                    <p className="font-normal text-lg leading-8 text-black">
                      3 Items
                    </p>
                    <p className="font-medium text-lg leading-8 text-black">
                      $480.00
                    </p>
                  </div>
                  <form>

                    <div className="flex pb-6">
                      <div className="relative w-full">

                        <div
                          id="dropdown-delivery"
                          aria-labelledby="dropdown-delivery"
                          className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                        >

                        </div>
                      </div>
                    </div>
                    <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                      Promo Code
                    </label>
                    <div className="flex pb-4 w-full">
                      <div className="relative w-full flex">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                        <input
                          type="text"
                          className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                          placeholder="xxxx xxxx xxxx"
                        />
                        <Button
                        
                          id="dropdown-button"
                          data-target="dropdown"
                          className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                          type="button"
                          loading={true}
                        >
                          ✅
                        </Button>
                        <div
                          id="dropdown"
                          className="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdown-button"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Shopping
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Images
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                News
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Finance
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center border-b border-gray-200">
                      <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                        Apply
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-8">
                      <p className="font-medium text-xl leading-8 text-black">
                        Sub Total
                      </p>
                      <p className="font-semibold text-xl leading-8 text-red-800">
                          Rs. {subTotal}
                      </p>
                    </div>
                    <button className="w-full text-center bg-red-800 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-900">
                      Checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex w-screen flex-col items-center justify-center min-h-screen gap-6 max-w-screen ">
          <div className=" h-fit w-fit p-8 rounded-full bg-yellow-50 aspect-square flex items-center justify-center">
            <img src={emptyCartImg} alt="" />
          </div>
          <div>
            <h1 className="font-bold text-lg py-2">Your Cart Is Empty</h1>
            <p>Look like you have added nothing to your cart,</p>
            <p>Go ahead and explore some products.</p>
          </div>
          <Link to={"/products"}>
            <Button>Explore Products</Button>
          </Link>
        </section>
      )}
    </main>
  );
};

export default CartPage;