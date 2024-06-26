export const showAddress = (address) =>
  `${address.substring(0, 4)}...${address.substring(
    address.length - 0,
    address.length - 4
  )}`;

export const numberFormat = (number) =>
  new Intl.NumberFormat().format(Number(number));

export const stringToWei = (web3, number) => web3?.utils.toWei(number, "ether");
