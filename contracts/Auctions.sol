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
        //Offer[] offers;
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
    uint public auctionCounter;

    constructor() public{
        auctionCounter = 0;
    }

    //add should be changed to msg.sender ! 

    function getAuctionCounter() public view returns (uint retVal) {
        return auctionCounter;
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

    function createAuction(string memory name, uint startDate, uint endDate) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser"); // advertiser exists
        require(bytes(name).length != 0, "Name has to be provided");
        require(startDate <= endDate, "End date must be later than start date");
        Auction storage auction = auctions[auctionCounter];
        auction.auction_name = name;
        auction.advertiser_addr = msg.sender;
        auction.start_date = startDate;
        auction.end_date = endDate;
        auction.status = "open";
        auction.id_winner = -1;
        auction.offersCounter = 0;
        auctionCounter++;
    }

    function setAuctionStatus(string memory auction_name, string memory status) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser"); 
        require(auctionCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (strcmp(auctions[i].auction_name, auction_name)) {
                if(auctions[i].advertiser_addr == msg.sender) {
                    auctions[i].status = status;
                    return;
                }
                else {
                    revert("You are allowed to change only your auctions"); 
                }
            }
        }
        revert("There is no auction with this name");
    }

    function setAuctionWinner(string memory auction_name, address winnerAddr) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser");
        require(auctionCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (strcmp(auctions[i].auction_name, auction_name)) {
                if(auctions[i].advertiser_addr == msg.sender) {
                    for (uint256 j = 0; j < auctions[i].offersCounter; j++)
                    {
                        if(auctions[i].offers[j].offerent_addr == winnerAddr)
                        {
                            auctions[i].id_winner = int(j);
                            auctions[i].status = "settled"; //rozstrzygnięte
                            return;
                        }
                    }
                    revert("Auction has no offer with this offerent");
                }
                else {
                    revert("You are allowed to change only your auctions"); 
                }
            }
        }
        revert("There is no auction with this name");
    }

    function makeOffer(string memory auction_name, uint price) public{
        require(bytes(offerents[msg.sender].offerent_name).length != 0, "You are not registered as an offerent");
        require(auctionCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (strcmp(auctions[i].auction_name, auction_name)) {
                Offer memory newOffer = Offer(msg.sender, price);
                auctions[i].offers[auctions[i].offersCounter] = newOffer;
                auctions[i].offersCounter++;
                return;
            }
        }
        revert("There is no auction with this name");
    }


    function getAuctionOffers(string memory auctionName) public view returns(Offer[] memory) {
        require(auctionCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (strcmp(auctions[i].auction_name, auctionName)) {
                Offer[] memory newOffers = new Offer[](auctions[i].offersCounter);
                for (uint j = 0; j < auctions[i].offersCounter; j++) {
                    newOffers[j] = auctions[i].offers[j];
                }
                return newOffers;
            }
        }
        revert("There is no auction with this name");
    }

    function getAuctionStatus(string memory auctionName) public view returns (string memory){
        require(auctionCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (strcmp(auctions[i].auction_name, auctionName)) {
                return auctions[i].status;
            }
        }
        revert("There is no auction with this name");
    }

    function getAuctionWinner(string memory auctionName) public view returns(address){
        require(auctionCounter > 0, "There is no auction");
        for (uint256 i = 0; i < auctionCounter; i++) {
            if (strcmp(auctions[i].auction_name, auctionName)) {
                if(auctions[i].id_winner >= 0){
                    return auctions[i].offers[uint(auctions[i].id_winner)].offerent_addr;
                }
                else 
                {
                    revert("This auction has no winner");
                }
            }
        }
        revert("There is no auction with this name");
    }

    function memcmp(bytes memory a, bytes memory b) internal pure returns(bool) {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b) internal pure returns(bool) {
        return memcmp(bytes(a), bytes(b));
    }
}