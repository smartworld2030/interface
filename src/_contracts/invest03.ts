const invest = {
  address: {
    56: '0xeB2F87B4fF2C35bf1a56B97bAd9bd8Bbf06768bA',
    97: '0x3A71847482373Bb14f93422f474F8359e5B38E5C',
  },
  abi: [
    'event UpdateUser(address indexed user, uint256 value)',
    'event WithdrawInterest(address indexed user, uint256 hourly, uint256 referrals)',
    'event RegisterUser(address indexed user, address indexed referrer, uint256 value)',
    'function users(address) public view returns (address referrer,uint256 refEndTime,uint256 refAmounts,uint256 refPercent,uint256 totalAmount,uint256 latestWithdraw)',
    'function FEE() public view returns (uint256)',
    'function MINIMUM_INVEST() public view returns (uint256)',
    'function totalReward(uint256 value) public view returns (uint256)',
    'function rewardPercent(uint256 value) public view returns (uint256)',
    'function monthlyReward(uint256 value) public view returns (uint256)',
    'function hourlyReward(uint256 value) public view returns (uint256)',
    'function rewardPeriod(uint256 value) public view returns (uint256)',
    'function blacklist(address user) public view returns (bool)',
    'function rewardInfo(uint256 value) public view returns (uint256 period,uint256 reward,uint256 endTime)',
    'function USDToBnb(uint256 value) public view returns (uint256)',
    'function bnbToUSD(uint256 value) public view returns (uint256)',
    'function bnbToUSDPrice() public view returns (uint256)',
    'function referralInfo(address user, uint256 value)public view returns (uint256 totalAmount, uint256 refPercent)',
    'function invest(address referrer) public payable returns (bool)',
    'function migrateByUser() public returns (bool)',
    'function migrateAndWithdrawInterest() public returns (bool)',
    'function withdrawInterest() public returns (bool)',
    'function calculateInterest(address sender) public view returns (uint256 hourly,uint256 referral,uint256 requestTime)',
    'function calculateHourly(address sender, uint256 time) public view returns (uint256 hourly)',
    'function userDepositNumber(address user) public view returns (uint256)',
    'function userDepositDetails(address user, uint256 index) public view returns (uint256 amount,uint256 period,uint256 reward,uint256 startTime,uint256 endTime)',
    'function userExpired(address user) public view returns (bool)',
  ],
}

export default invest
