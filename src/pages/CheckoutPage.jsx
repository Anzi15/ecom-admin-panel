import React, { useState } from "react";
import InputField from "../components/InputField";
import { IoCheckmarkSharp } from "react-icons/io5";
import PromoCodeForm from "../components/PromoCodeForm";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const paymentMethods = [
  {
    name: "Cash on Delivery",
    context: "Purchase goods, pay when they arrive",
    identifier: "COD",
  },
  {
    name: "JazzCash",
    context: "Send your payment to: ",
    identifier: "JZC",
  },
  {
    name: "EasyPaisa",
    context: "Send your payment to: ",
    identifier: "EZP",
  },
  {
    name: "Bank Transfer",
    context: "Send your payment to: ",
    identifier: "BT",
  },
];

const CheckoutPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  return (
    <>
      <header className="bg-[#F9FAFB] py-8">
        <h1 className="text-4xl">Quick Checkout</h1>
      </header>
      <main className="w-full bg-[#F9FAFB] py-10 flex md:flex-row flex-col">
        <section className="md:w-1/2 px-8 w-full">
          <h3 className="text-xl text-left my-9">Contact information</h3>
          <form action="">
            <div className="border-b pb-8 ">
              <InputField
                inputAutoComplete={"email"}
                inputName={"Email"}
                valueReturner={setEmail}
                inputValue={email}
                requiredInput={true}
              />
            </div>

            <div className="flex flex-col gap-4 border-b pb-8">
              <h3 className="text-xl text-left my-5 Shipping information">
                Shipping Information
              </h3>

              <div className="flex gap-4 flex-wrap ">
                <InputField
                  inputAutoComplete={"given-name"}
                  requiredInput={true}
                  inputValue={firstName}
                  valueReturner={setFirstName}
                  inputName="First Name"
                />
                <InputField
                  requiredInput={true}
                  inputAutoComplete={"family-name"}
                  inputValue={lastName}
                  valueReturner={setLastName}
                  inputName="Last Name"
                />
              </div>
              <InputField
                requiredInput={true}
                inputAutoComplete={"street-address"}
                inputValue={address}
                valueReturner={setAddress}
                inputName="Street Address"
              />
              <InputField
                inputAutoComplete={"address-line2"}
                inputName="Apartment, Suite, etc. (optional)"
                inputValue={extraAddress}
                valueReturner={setExtraAddress}
              />
              <div className="flex gap-4 flex-wrap" >
                <InputField
                  requiredInput={true}
                  inputAutoComplete={"address-level2"}
                  inputName="City"
                  inputValue={city}
                  valueReturner={setCity}
                />
                <InputField
                  inputAutoComplete={"address-level1"}
                  inputName="Province"
                  inputValue={state}
                  valueReturner={setState}
                />
              </div>
              <InputField
                inputAutoComplete={"tel"}
                inputType="tel"
                inputName="Phone Number"
                inputValue={phoneNumber}
                valueReturner={setPhoneNumber}
              />
            </div>
            <div className="w-full flex flex-col gap-4 border-b pb-8">
              <h3 className="text-xl text-left my-5 Shipping information">
                Payment Methods
              </h3>
              <div className="flex flex-wrap md:gap-4 justify-between gap-2">
                {paymentMethods.map((method, i) => {
                  return (
                    <div
                      className={`md:w-[48%] w-full transition-all duration-300 rounded-xl text-left gap-4  px-3 py-5 relative border-2 items-start cursor-pointer flex flex-col ${
                        method.identifier == paymentMethod && "border-brandRed"
                      } justify-start`}
                      key={i}
                      onClick={(e) => {
                        setPaymentMethod(method.identifier);
                      }}
                    >
                      <div>
                        <h3>{method.name}</h3>
                        <p className="text-sm text-gray-500">
                          {method.context}
                        </p>
                      </div>

                      <div
                        className={`bg-brandRed w-fit  p-1 rounded-full absolute top-0 right-0 translate-x-2 -translate-y-2 ${
                          paymentMethod == method.identifier ? "flex" : "hidden"
                        }`}
                      >
                        <IoCheckmarkSharp className="text-white" />
                      </div>
                    </div>
                  );
                })}
                <button className="w-full bg-black py-3 rounded-xl text-white text-xl flex items-center justify-center gap-2 group my-3">
                  Confirm Order
                  <MdOutlineKeyboardArrowRight className="group-hover:translate-x-2 transition-all duration-200" />
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="md:w-1/2 w-full px-8 md:sticky top-4">
        <div className="flex w-full justify-between">

          <h3 className="text-xl text-left my-9">Order summary</h3>
          <h3 className="text-xl text-left my-9">3 Items</h3>
        </div>

          <div className="products flex flex-wrap px-4 md:flex-row flex-col gap-y-4">

            <div className="flex text-left  gap-4 md:w-1/2 w-full">
              <div>
                <img
                  src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                  className="w-[7rem]"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>Micro Backpack</h3>
                <h4 className="text-gray-600">$70.00</h4>
                <h5 className="text-gray-400">5L</h5>
              </div>
            </div>
            <div className="flex text-left  gap-4 md:w-1/2 w-full">
              <div>
                <img
                  src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                  className="w-[7rem]"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>Micro Backpack</h3>
                <h4 className="text-gray-600">$70.00</h4>
                <h5 className="text-gray-400">5L</h5>
              </div>
            </div>
            <div className="flex text-left  gap-4 md:w-1/2 w-full">
              <div>
                <img
                  src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                  className="w-[7rem]"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>Micro Backpack</h3>
                <h4 className="text-gray-600">$70.00</h4>
                <h5 className="text-gray-400">5L</h5>
              </div>
            </div>
          </div>
          <div className="py-8 flex flex-col gap-4 ">
            <div>
              <div className="flex items-center justify-between ">
                <p className="font-medium text-md leading-8 text-gray-800">
                  Sub Total
                </p>
                <p className="font-semibold text-md leading-8 text-red-800">
                  Rs.200
                </p>
              </div>

              {/* 
                   {discountValue > 0 && <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Coupon Discount:
                      </p>
                      <p className="font-semibold text-md leading-8 text-red-800">
                          - Rs. discountValue
                      </p>
                    </div>} */}
            </div>
            <div>
              <div className="flex items-center justify-between ">
                <p className="font-medium text-md leading-8 text-gray-800">
                  Shipping
                </p>
                <p className="font-semibold text-md leading-8 text-red-800">
                  Rs.200
                </p>
              </div>

            </div>
            <div>
              <div className="flex items-center justify-between ">
                <p className="font-medium text-xl leading-8 text-gray-800">
                  Total
                </p>
                <p className="font-semibold text-2xl leading-8 text-red-800">
                  Rs.200
                </p>
              </div>

              {/* 
                   {discountValue > 0 && <div className="flex items-center justify-between ">
                      <p className="font-medium text-md leading-8 text-gray-800">
                        Coupon Discount:
                      </p>
                      <p className="font-semibold text-md leading-8 text-red-800">
                          - Rs. discountValue
                      </p>
                    </div>} */}
            </div>
          </div>
          <div className="py-8">
            <PromoCodeForm />
          </div>
        </section>
      </main>
    </>
  );
};

export default CheckoutPage;