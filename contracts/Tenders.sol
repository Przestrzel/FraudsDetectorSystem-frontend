pragma solidity   >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Tenders {

    struct Tender {
        string tender_name; 
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

    mapping(uint => Tender) public tenders;

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

    function createTender(uint id, string memory name, uint startDate, uint endDate) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser"); // advertiser exists
        require(bytes(name).length != 0, "Name has to be provided");
        require(startDate <= endDate, "End date must be later than start date");
        Tender storage tender = tenders[id];
        tender.tender_name = name;
        tender.advertiser_addr = msg.sender;
        tender.start_date = startDate;
        tender.end_date = endDate;
        tender.status = "open";
        tender.id_winner = -1;
        tender.offersCounter = 0;
    }

    function setTenderStatus(uint tender_id, string memory tender_name, string memory status) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser"); 
        if (strcmp(tenders[tender_id].tender_name, tender_name)) {
            if(tenders[tender_id].advertiser_addr == msg.sender) {
                tenders[tender_id].status = status;
                return;
            }
            else {
                revert("You are allowed to change only your tenders"); 
            }
        }
        revert("There is no tender with this id");
    }

    function setTenderWinner(uint tender_id, string memory tender_name, address winnerAddr) public {
        require(bytes(advertisers[msg.sender].advertiser_name).length != 0, "You are not registered as an advertiser");
        if (strcmp(tenders[tender_id].tender_name, tender_name)) {
            if(tenders[tender_id].advertiser_addr == msg.sender) {
                    for (uint256 j = 0; j < tenders[tender_id].offersCounter; j++)
                    {
                        if(tenders[tender_id].offers[j].offerent_addr == winnerAddr)
                        {
                            tenders[tender_id].id_winner = int(j);
                            tenders[tender_id].status = "settled"; //rozstrzygnięte
                            return;
                        }
                    }
                    revert("Tender has no offer with this offerent");
                }
                else {
                    revert("You are allowed to change only your tenders"); 
                }
        }
        revert("There is no tender with this id");
    }

    function makeOffer(uint tender_id, string memory tender_name, uint price) public{
        require(bytes(offerents[msg.sender].offerent_name).length != 0, "You are not registered as an offerent");
         if (strcmp(tenders[tender_id].tender_name, tender_name)) {
            Offer memory newOffer = Offer(msg.sender, price);
            tenders[tender_id].offers[tenders[tender_id].offersCounter] = newOffer;
            tenders[tender_id].offersCounter++;
            return;
         }
        revert("There is no tender with this id");
    }

/*
    function getTenderOffers(string memory tenderName) public view returns(Offer[] memory) {
        require(tendersCounter > 0, "There is no tender");
        for (uint256 i = 0; i < tendersCounter; i++) {
            if (strcmp(tenders[i].tender_name, tenderName)) {
                Offer[] memory newOffers = new Offer[](tenders[i].offersCounter);
                for (uint j = 0; j < tenders[i].offersCounter; j++) {
                    newOffers[j] = tenders[i].offers[j];
                }
                return newOffers;
            }
        }
        revert("There is no tender with this name");
    }*/

    function getTenderStatus(uint tender_id, string memory tender_name) public view returns (string memory){
        if (strcmp(tenders[tender_id].tender_name, tender_name)) {
            return tenders[tender_id].status;
        }
        revert("There is no tender with this id");
    }

    function getTenderWinner(uint tender_id, string memory tender_name) public view returns(address){
        if (strcmp(tenders[tender_id].tender_name, tender_name)) {
             if(tenders[tender_id].id_winner >= 0){
                    return tenders[tender_id].offers[uint(tenders[tender_id].id_winner)].offerent_addr;
                }
                else 
                {
                    revert("This tender has no winner");
                }
        }
        revert("There is no tender with this id");
    }

    function memcmp(bytes memory a, bytes memory b) internal pure returns(bool) {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b) internal pure returns(bool) {
        return memcmp(bytes(a), bytes(b));
    }
}