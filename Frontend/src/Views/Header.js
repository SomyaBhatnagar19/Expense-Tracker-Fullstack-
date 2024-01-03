/* /backend/Views/Header.js */

import React from "react";
import wallet from '../assets/wallet.png';

export default function Header() {
  return (
    <div className="bg-cyan-500 text-white">
      <div className="container mx-auto flex items-center justify-between">
    <div className="flex items-center">
      <img src={wallet} alt="wallet-logo" className="h-20 w-20" />
      <h1 className="text-lg ml-2 font-semibold text-sky-900">Spendzi</h1>
    </div>
    <button className="text-sm">LOGOUT</button>
  </div>
    </div>
  );
}