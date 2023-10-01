import {
  ChainNameToIdEnum,
  MonitorCategory,
  Preconditions,
  PredefinedMonitors,
} from './types';

const predefinedMonitors: PredefinedMonitors = [];

// source: https://faucetlink.to/sepolia
predefinedMonitors.push({
  name: 'pk910 PoW',
  from: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '24',
  url: 'https://sepolia-faucet.pk910.de/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'Unitap',
  precondition: Preconditions.BrightID,
  from: '0xb3A97684Eb67182BAa7994b226e6315196D8b364',
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '24',
  url: 'https://unitap.app/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'Infura',
  from: '0x1fc35b79fb11ea7d4532da128dfa9db573c51b09',
  precondition: Preconditions.MainnetBalance,
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '24',
  url: 'https://www.infura.io/faucet/sepolia',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'Alchemy',
  precondition: Preconditions.AlchemyAccount,
  from: '0xEDaf4083F29753753d0Cd6c3C50ACEb08c87b5BD',
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '24',
  url: 'https://sepoliafaucet.com/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'QuickNode',
  from: '0x2CdA41645F2dBffB852a605E92B185501801FC28',
  precondition: Preconditions.MainnetBalance,
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '24',
  url: 'https://faucet.quicknode.com/ethereum/sepolia',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'RockX',
  from: '0x5594F939d67f56AEDBE80Ff1E9bf776Fd691d960',
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '24',
  url: 'https://access.rockx.com/faucet-sepolia',
  category: MonitorCategory.Faucet,
});

// Not active for a month
// predefinedMonitors.push({
//   name: 'Coinbase',
//   from: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
//   network: ChainNameToIdEnum.sepolia,
//   intervalHours: '24',
//   url: 'https://faucet.coinbase.com/',
// category: MonitorCategory.Faucet,
// });

// TODO: get address to add
// predefinedMonitors.push({
//   name: 'Chainstack',
//   from: '',
//   network: ChainNameToIdEnum.sepolia,
//   intervalHours: '24',
//   url: 'https://faucet.chainstack.com/',
// category: MonitorCategory.Faucet,
// });

// source: https://faucetlink.to/goerli
predefinedMonitors.push({
  name: 'pk910 PoW',
  from: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
  network: ChainNameToIdEnum.goerli,
  intervalHours: '24',
  url: 'https://goerli-faucet.pk910.de/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'ENS',
  from: '0x1f31938747f84fc96c94E6cd04589eEDF2Bb98eb',
  precondition: Preconditions.ENS,
  network: ChainNameToIdEnum.goerli,
  intervalHours: '24',
  url: 'https://app.ens.domains/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'Unitap',
  from: '0xb3A97684Eb67182BAa7994b226e6315196D8b364',
  network: ChainNameToIdEnum.goerli,
  intervalHours: '24',
  url: 'https://unitap.app/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'Alchemy',
  from: '0x87c9B02A10eC2CB4dcB3b2e573e26169CF3cd9Bf',
  precondition: Preconditions.AlchemyAccount,
  network: ChainNameToIdEnum.goerli,
  intervalHours: '24',
  url: 'https://goerlifaucet.com/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  name: 'testnet-faucet.com',
  from: '0xBb977B2EE8a111D788B3477D242078d0B837E72b',
  network: ChainNameToIdEnum.goerli,
  intervalHours: '24',
  url: 'https://testnet-faucet.com/',
  category: MonitorCategory.Faucet,
});

// doesn't look like faucet - you can exchange your mainnet ETH for goerli ETH
// predefinedMonitors.push({
//   name: 'LayerZero',
//   from: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
//   network: ChainNameToIdEnum.goerli,
//   intervalHours: '24',
//   url: 'https://testnetbridge.com/',
//   category: MonitorCategory.Bridge,
// });

predefinedMonitors.push({
  name: 'Owlto Finance',
  to: '0x45A318273749d6eb00f5F6cA3bC7cD3De26D642A',
  network: ChainNameToIdEnum.sepolia,
  intervalHours: '48',
  url: 'https://owlto.finance/bridge',
  category: MonitorCategory.Bridge,
});

export default predefinedMonitors;
