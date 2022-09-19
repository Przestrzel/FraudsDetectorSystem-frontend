pragma solidity   >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Auctions {

    struct Auction {
        string auction_name; 
        address advertiser_addr; 
        uint start_date; 
        uint end_date;
        string status;
        int id_winner;
        uint offersCounter; 
        mapping(uint => Offer) offers; 
    }


    struct Advertiser {
        string advertiser_name;
        string city;
    }

    struct Offerent {
        string offerent_name;
        uint NIP;
        string owner; // in offerents or diff place?
    }
    
     struct Offer {
        address offerent_addr;
        uint price; // price in gr, no float type
    }


    mapping(address => Advertiser) public advertisers;
    mapping(address => Offerent) public offerents;

    mapping(uint => Auction) public auctions;

    constructor() public{    
    }


    //should be called each time an advertiser creates account
    function registerAdvertiser(string memory name, string memory city) public {
        require(bytes(name).length != 0, "Name has to be provided");
        require(bytes(city).length != 0, "City has to be provided");
        require(bytes(advertisers[msg.sender].advertiser_name).length == 0, "Advertiser with this account is already registered");
        Advertiser memory newAdvertiser = Advertiser(name, city);
        advertisers[msg.sender] = newAdvertiser;
    }

    //should be called each time an offerent creates account
    function registerOfferent(string memory name, uint NIP, string memory owner) public {
        require(bytes(name).length != 0, "Name has to be provided");
        require(bytes(owner).length != 0, "Owner has to be provided");
        require(NIP >= 1000000000 && NIP <= 9999999999, "NIP has to be 10 digits long"); //easiest way to require 10 digits
        require(bytes(offerents[msg.sender].offerent_name).length == 0, "Offerent with this account is already registered");
        Offerent memory newOfferent = Offerent(name, NIP, owner);
        offerents[msg.sender] = newOfferent;
    }

    function createAuction(uint id, string memory name, uint startDate, uint endDate) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser"); // advertiser exists
        require(bytes(name).length != 0, "Name has to be provided");
        require(startDate <= endDate, "End date must be later than start date");
        Auction storage auction = auctions[id];
        auction.auction_name = name;
        auction.advertiser_addr = msg.sender;
        auction.start_date = startDate;
        auction.end_date = endDate;
        auction.status = "open";
        auction.id_winner = -1;
        auction.offersCounter = 0;
    }

    function setAuctionStatus(uint auction_id, string memory auction_name, string memory status) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser"); 
        if (strcmp(auctions[auction_id].auction_name, auction_name)) {
            if(auctions[auction_id].advertiser_addr == msg.sender) {
                auctions[auction_id].status = status;
                return;
            }
            else {
                revert("You are allowed to change only your auctions"); 
            }
        }
        revert("There is no auction with this id");
    }

    function setAuctionWinner(uint auction_id, string memory auction_name, address winnerAddr) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser");
        if (strcmp(auctions[auction_id].auction_name, auction_name)) {
            if(auctions[auction_id].advertiser_addr == msg.sender) {
                    for (uint256 j = 0; j < auctions[auction_id].offersCounter; j++)
                    {
                        if(auctions[auction_id].offers[j].offerent_addr == winnerAddr)
                        {
                            auctions[auction_id].id_winner = int(j);
                            auctions[auction_id].status = "settled"; //rozstrzygnięte
                            return;
                        }
                    }
                    revert("Auction has no offer with this offerent");
                }
                else {
                    revert("You are allowed to change only your auctions"); 
                }
        }
        revert("There is no auction with this id");
    }

    function makeOffer(uint auction_id, string memory auction_name, uint price) public{
        require(bytes(offerents[msg.sender].offerent_name).length != 0, "You are not registered as an offerent");
         if (strcmp(auctions[auction_id].auction_name, auction_name)) {
            Offer memory newOffer = Offer(msg.sender, price);
            auctions[auction_id].offers[auctions[auction_id].offersCounter] = newOffer;
            auctions[auction_id].offersCounter++;
            return;
         }
        revert("There is no auction with this id");
    }

/*
    function getAuctionOffers(string memory auctionName) public view returns(Offer[] memory) {
        require(auctionsCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionsCounter; i++) {
            if (strcmp(auctions[i].auction_name, auctionName)) {
                Offer[] memory newOffers = new Offer[](auctions[i].offersCounter);
                for (uint j = 0; j < auctions[i].offersCounter; j++) {
                    newOffers[j] = auctions[i].offers[j];
                }
                return newOffers;
            }
        }
        revert("There is no auction with this name");
    }*/

    function getAuctionStatus(uint auction_id, string memory auction_name) public view returns (string memory){
        if (strcmp(auctions[auction_id].auction_name, auction_name)) {
            return auctions[auction_id].status;
        }
        revert("There is no auction with this id");
    }

    function getAuctionWinner(uint auction_id, string memory auction_name) public view returns(address){
        if (strcmp(auctions[auction_id].auction_name, auction_name)) {
             if(auctions[auction_id].id_winner >= 0){
                    return auctions[auction_id].offers[uint(auctions[auction_id].id_winner)].offerent_addr;
                }
                else 
                {
                    revert("This auction has no winner");
                }
        }
        revert("There is no auction with this id");
    }

    function memcmp(bytes memory a, bytes memory b) internal pure returns(bool) {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b) internal pure returns(bool) {
        return memcmp(bytes(a), bytes(b));
    }
}