import {
  ChainNameToIdEnum,
  MonitorCategory,
  Preconditions,
  PredefinedMonitors,
} from './types';

const predefinedMonitors: PredefinedMonitors = [];

// source: https://faucetlink.to/sepolia
predefinedMonitors.push({
  id: '1c8f9052-df2c-406c-89e5-85c02435b62b',
  name: 'pk910 PoW',
  from: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '24',
  url: 'https://sepolia-faucet.pk910.de/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: '2695cf5d-b665-4637-9e71-c46340f639ca',
  name: 'Unitap',
  precondition: Preconditions.BrightID,
  from: '0xb3A97684Eb67182BAa7994b226e6315196D8b364',
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '24',
  url: 'https://unitap.app/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: '4101bafc-f8ef-4ba7-91b9-68de118fe85f',
  name: 'Infura',
  from: '0x1fc35b79fb11ea7d4532da128dfa9db573c51b09',
  precondition: Preconditions.MainnetBalance,
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '24',
  url: 'https://www.infura.io/faucet/sepolia',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: 'ec350639-2345-402c-9712-f5d4387b5add',
  name: 'Alchemy',
  precondition: Preconditions.AlchemyAccount,
  from: '0xEDaf4083F29753753d0Cd6c3C50ACEb08c87b5BD',
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '24',
  url: 'https://sepoliafaucet.com/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: '87e894e4-5593-4b03-9514-0e8f01dd8233',
  name: 'QuickNode',
  from: '0x2CdA41645F2dBffB852a605E92B185501801FC28',
  precondition: Preconditions.MainnetBalance,
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '24',
  url: 'https://faucet.quicknode.com/ethereum/sepolia',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: '11f270ed-7ba0-4790-a836-57677bb0886e',
  name: 'RockX',
  from: '0x5594F939d67f56AEDBE80Ff1E9bf776Fd691d960',
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '24',
  url: 'https://access.rockx.com/faucet-sepolia',
  category: MonitorCategory.Faucet,
});

// Not active for a month
// predefinedMonitors.push({
//   name: 'Coinbase',
//   from: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
//   network: ChainNameToIdEnum.Sepolia,
//   intervalHours: '24',
//   url: 'https://faucet.coinbase.com/',
// category: MonitorCategory.Faucet,
// });

// TODO: get address to add
// predefinedMonitors.push({
//   name: 'Chainstack',
//   from: '',
//   network: ChainNameToIdEnum.Sepolia,
//   intervalHours: '24',
//   url: 'https://faucet.chainstack.com/',
// category: MonitorCategory.Faucet,
// });

// source: https://faucetlink.to/goerli
predefinedMonitors.push({
  id: '845fcc51-9a4d-4024-a8f1-20fd31a077da',
  name: 'pk910 PoW',
  from: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
  network: ChainNameToIdEnum.Goerli,
  intervalHours: '24',
  url: 'https://goerli-faucet.pk910.de/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: 'f0ed84c1-ea33-49da-a534-b49f10725142',
  name: 'ENS',
  from: '0x1f31938747f84fc96c94E6cd04589eEDF2Bb98eb',
  precondition: Preconditions.ENS,
  network: ChainNameToIdEnum.Goerli,
  intervalHours: '24',
  url: 'https://app.ens.domains/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: '6f09a837-35fa-4df6-bc29-8cd837ace370',
  name: 'Unitap',
  from: '0xb3A97684Eb67182BAa7994b226e6315196D8b364',
  network: ChainNameToIdEnum.Goerli,
  intervalHours: '24',
  url: 'https://unitap.app/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: '0d9a28a4-707d-4c3e-b36e-f0709b5668ca',
  name: 'Alchemy',
  from: '0x87c9B02A10eC2CB4dcB3b2e573e26169CF3cd9Bf',
  precondition: Preconditions.AlchemyAccount,
  network: ChainNameToIdEnum.Goerli,
  intervalHours: '24',
  url: 'https://goerlifaucet.com/',
  category: MonitorCategory.Faucet,
});

predefinedMonitors.push({
  id: 'b6af9320-6650-48e6-bc3b-cc2641469d88',
  name: 'testnet-faucet.com',
  from: '0xBb977B2EE8a111D788B3477D242078d0B837E72b',
  network: ChainNameToIdEnum.Goerli,
  intervalHours: '24',
  url: 'https://testnet-faucet.com/',
  category: MonitorCategory.Faucet,
});

// doesn't look like faucet - you can exchange your mainnet ETH for goerli ETH
// predefinedMonitors.push({
//   name: 'LayerZero',
//   from: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
//   network: ChainNameToIdEnum.Goerli,
//   intervalHours: '24',
//   url: 'https://testnetbridge.com/',
//   category: MonitorCategory.Bridge,
// });

predefinedMonitors.push({
  id: '4b9b59e1-72da-4427-aacc-60782f2c75c0',
  name: 'Owlto Finance',
  to: '0x45A318273749d6eb00f5F6cA3bC7cD3De26D642A',
  network: ChainNameToIdEnum.Sepolia,
  intervalHours: '48',
  url: 'https://owlto.finance/bridge',
  category: MonitorCategory.Bridge,
});

export default predefinedMonitors;
