// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(
        uint256 minimum,
        string calldata name,
        string calldata description,
        string calldata image,
        uint256 target,
        string calldata deadline
    ) public {
        Campaign newCampaign = new Campaign(
            minimum,
            msg.sender,
            name,
            description,
            image,
            target,
            deadline
        );
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    string public CampaignName;
    string public CampaignDescription;
    string public campaignDeadline;
    string public imageUrl;
    uint256 public targetToAchieve;
    uint256 private isCampaignActive = 1;

    address[] public contributers;
    mapping(address => uint256) public contributersMap;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the manager can call this function"
        );
        _;
    }

    constructor(
        uint256 minimum,
        address creator,
        string memory name,
        string memory description,
        string memory image,
        uint256 target,
        string memory deadline
    ) {
        manager = creator;
        minimumContribution = minimum;
        CampaignName = name;
        CampaignDescription = description;
        imageUrl = image;
        targetToAchieve = target;
        campaignDeadline = deadline;
    }

    uint256 numRequests;
    mapping(uint256 => Request) public requests;

    function contibute() public payable {
        require(
            msg.value >= minimumContribution,
            "Contribution is less than minimum"
        );

        // check if the sender is already a contributor
        for (uint256 i = 0; i < contributers.length; i++) {
            if (msg.sender == contributers[i]) {
                contributersMap[msg.sender] =
                    contributersMap[msg.sender] +
                    msg.value;

                return;
            }
        }

        contributers.push(msg.sender);
        contributersMap[msg.sender] = msg.value;

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public onlyManager {
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        require(
            approvers[msg.sender],
            "You are not an approver! Only contributors can approve a specific payment request"
        );
        require(
            !request.approvals[msg.sender],
            "You have already approved this request"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public onlyManager {
        Request storage request = requests[index];
        require(
            request.approvalCount >= (approversCount / 2),
            "Not enough approvals"
        );
        require(!(request.complete), "Request already finalized");

        // request.recipient.transfer(request.value);
        (bool success, ) = request.recipient.call{value: request.value}("");
        if (success) {
            request.complete = true;
        }
        // request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager,
            CampaignName,
            CampaignDescription,
            imageUrl,
            targetToAchieve,
            campaignDeadline,
            isCampaignActive
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return numRequests;
    }

    function claimFunds() public payable onlyManager returns (bool) {
        require(
            address(this).balance >= targetToAchieve,
            "target not achieved"
        ); // funding goal met

        // transfer all funds to the campaign manager
        // payable(manager).transfer(address(this).balance);
        (bool success, ) = payable(manager).call{value: address(this).balance}(
            ""
        );
        if (success) {
            isCampaignActive = 0;
        }
        return success;
    }

    function getCampaignIsActive() public view returns (uint256) {
        return isCampaignActive;
    }

    function setCampaignIsActive() public returns (uint256) {
        isCampaignActive = 0;
        return isCampaignActive;
    }

    function getMyAmount(address sender) public view returns (uint256) {
        return contributersMap[sender];
    }

    function getRefundAmount() public payable returns (bool) {
        require(contributersMap[msg.sender] > 0);
        require(isCampaignActive == 0);

        uint256 senderContribution = contributersMap[msg.sender];
        uint256 totalContributions = 0;

        for (uint256 i = 0; i < contributers.length; i++) {
            totalContributions += contributersMap[contributers[i]];
        }
        uint256 senderRatio = (senderContribution * 100) / totalContributions;
        uint256 refundAmount = (address(this).balance * senderRatio) / 100;

        // payable(msg.sender).transfer(refundAmount);
        (bool success, ) = msg.sender.call{value: refundAmount}("");
        require(success, "Transfer failed.");

        if (success) {
            contributersMap[msg.sender] = 0;
        }
        if (address(this).balance == 0) {
            isCampaignActive = 0;
        }

        return success;
    }
}
