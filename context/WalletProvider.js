import React, { createContext, useState } from "react";

import { Web3 } from "web3";

import LotteryABI from "../utils/Lottery.json";

export const walletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("null");

  //#Lottery - 0xc8D06e543879233F4d248095EceBC38d46c36AE0
  const contractAddress = "0xc8D06e543879233F4d248095EceBC38d46c36AE0";

  const contractABI = LotteryABI.abi;

  async function connectWallet() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  function disconnectWallet() {
    setConnectedAccount(null);
  }

  return (
    <walletContext.Provider
      value={{ connectWallet, disconnectWallet, connectedAccount }}
    >
      {children}
    </walletContext.Provider>
  );
};
