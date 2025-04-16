// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenMaster is ERC721 {
    address public owner;
    uint256 public totalOccasions;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    struct TicketSale {
        address seller;
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => Occasion) occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;

    mapping(uint256 => TicketSale) public ticketsForSale;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier onlyTicketOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id != 0, "Invalid ID");
        require(_id <= totalOccasions, "Occasion does not exist");
        require(msg.value >= occasions[_id].cost, "Insufficient ETH");
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Seat out of range");

        occasions[_id].tickets -= 1;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);

        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function createTicket(
        uint256 _id,
        uint256 _seat,
        address _recipient
    ) public onlyOwner {
        require(_id != 0 && _id <= totalOccasions, "Invalid occasion ID");
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Invalid seat number");
        require(occasions[_id].tickets > 0, "No tickets left");

        occasions[_id].tickets -= 1;
        hasBought[_id][_recipient] = true;
        seatTaken[_id][_seat] = _recipient;
        seatsTaken[_id].push(_seat);

        totalSupply++;
        _safeMint(_recipient, totalSupply);
    }

    // 🆕 Sell a ticket on secondary market
    function sellTicket(uint256 tokenId, uint256 price) public onlyTicketOwner(tokenId) {
        require(price > 0, "Price must be greater than 0");

        ticketsForSale[tokenId] = TicketSale({
            seller: msg.sender,
            price: price,
            isListed: true
        });
    }

    // 🆕 Buy a listed ticket
    function buyTicket(uint256 tokenId) public payable {
        TicketSale memory sale = ticketsForSale[tokenId];

        require(sale.isListed, "Ticket not listed for sale");
        require(msg.value >= sale.price, "Insufficient payment");

        // Clear listing
        delete ticketsForSale[tokenId];

        // Transfer funds to seller
        payable(sale.seller).transfer(sale.price);

        // Transfer NFT to buyer
        _transfer(sale.seller, msg.sender, tokenId);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}