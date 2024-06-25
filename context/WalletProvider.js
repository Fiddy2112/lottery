import React, { createContext, useState } from "react";

import { Web3 } from "web3";

import LotteryABI from "../utils/Lottery.json";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState("");

  //#Lottery - 0xc8D06e543879233F4d248095EceBC38d46c36AE0
  const contractAddress = "0xc8D06e543879233F4d248095EceBC38d46c36AE0";

  const contractABI = LotteryABI.abi;

  async function connectWallet() {
    //check metamask is installed
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // instantiate Web3 with the injected provider
        const web3 = new Web3(window.ethereum);
        setWeb3(setWeb3);
        if (window.ethereum) {
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });
        }
        //request user to connect accounts (Metamask will prompt)
        await ethereum.request({
          method: "eth_requestAccounts",
        });

        //get the connected accounts
        const accounts = await web3.eth.getAccounts();

        //show the first connected account in the react page
        setConnectedAccount(accounts[0]);

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log(contract);
        setContract(contract);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please download metamask");
    }
  }

  function disconnectWallet() {
    setConnectedAccount("");
    setContract(null);
  }

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        connectedAccount,
        contract,
        contractAddress,
        web3,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
