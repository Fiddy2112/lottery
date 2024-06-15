// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract Lottery {
    address public owner;

    address payable[] public  players;

    uint public lotteryId;

    mapping(uint => address payable) private winnerHistory;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Just owner be used");
        _;
    }


    function buyTicket() public payable {
        // buy ticket be than 1000000000000000 wei
        require(msg.value >= .001 ether, "You must purchase the ticket for an amount greater than 0.001 ether");
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint){
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory){
        return players;
    }

    function getRandom() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner,block.timestamp)));
    }

    function pickWinner() public  onlyOwner {
        uint index = getRandom() % players.length;
        players[index].transfer(address(this).balance);

        winnerHistory[lotteryId] = players[index];

        lotteryId++;

        //reset players
        players = new address payable [](0);
    }

    function getWinnerByHistory(uint _lotteryId) public view returns(address payable ){
       return winnerHistory[_lotteryId];
    }
}