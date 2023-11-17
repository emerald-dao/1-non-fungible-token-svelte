import { config } from '@onflow/fcl';
import flowJSON from '../../flow.json';

export const network: 'mainnet' | 'testnet' | 'emulator' = process.env.PUBLIC_FLOW_NETWORK as
    | 'mainnet'
    | 'testnet'
    | 'emulator' || 'emulator';

export const EXAMPLE_NFT_CONTRACT_ADDRESS = flowJSON.contracts.ExampleNFT.aliases[network];

const fclConfigInfo = {
    emulator: {
        accessNode: 'http://127.0.0.1:8888'
    },
    testnet: {
        accessNode: 'https://rest-testnet.onflow.org'
    },
    mainnet: {
        accessNode: 'https://rest-mainnet.onflow.org'
    }
};

config({
    'flow.network': network,
    'accessNode.api': fclConfigInfo[network].accessNode
}).load({ flowJSON });
