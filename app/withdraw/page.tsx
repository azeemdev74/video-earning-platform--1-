"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const paymentMethods = [
  {
    name: "WhatsApp Payout",
    description:
      "Join our WhatsApp group to receive payout updates, get support, and stay informed about the latest payment methods and announcements.",
    img: "/img/payout/whatsapp-payout.png",
    isWhatsApp: true,
    whatsappLink: "https://wa.me/+923426015759", // Replace with your WhatsApp number
  },
  {
    name: "PayPal",
    description: "Get paid by direct transfer into your PayPal account.",
    img: "/img/payout/paypal-payout.png",
  },
  {
    name: "JazzCash",
    description: "Get paid by direct transfer into your JazzCash wallet.",
    img: "/img/payout/jazzcash-payout.png",
  },
  {
    name: "Binance",
    description: "Get paid by direct transfer into your Binance wallet.",
    img: "/img/payout/binance-payout.png",
  },
  {
    name: "Bank Transfer",
    description: "Get paid by direct transfer into your Bank account.",
    img: "/img/payout/bank-payout.png",
  },
];

const WithdrawPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Center
        </h1>
        <p className="text-xl font-semibold text-green-600 mb-8">
          $5.59 <span className="text-gray-500 text-base">Account Balance</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start"
          >
            <h2 className="text-xl font-semibold mb-2">{method.name}</h2>
            <div className="mb-3">
              <Image
                src={method.img}
                alt={method.name}
                width={100}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 mb-4">{method.description}</p>
            {method.isWhatsApp ? (
              <Link
                href={method.whatsappLink}
                target="_blank"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Join on WhatsApp
              </Link>
            ) : (
              <button className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition">
                Coming Soon...
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawPage;
