import { serverAuthorization } from './auth/authorization';
import mintNFTs from '../src/lib/flow/actions/mintNFTs'

async function mintScript(recipient) {
    const names = ['Education', 'Building', 'Governance'];
    const descriptions = [
        'This is the logo of the Education Guild',
        'This is the logo of the Building Guild',
        'This is the logo of the Governance Guild'
    ];
    const thumbnails = [
        'QmYVKNWdm2961QtHz721tdA8dvBT116eT2DtATsX53Kt28',
        'QmPkJbnJSt3ZkHuGAnHyHCAhWVrneRrK6VHMjgu5oPGnoq',
        'QmcpmzEDmZtP37csyNaYaxzhoMQmmUrQsihE3x2XGKsg1Z'
    ];

    try {
        return await mintNFTs(recipient, names, descriptions, thumbnails, serverAuthorization)
    } catch (e) {
        console.log(e);
    }
}

mintScript(process.argv.slice(2)[0]);
