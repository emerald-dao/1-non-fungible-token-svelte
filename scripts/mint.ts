require('dotenv').config();
import { serverAuthorization } from './flow/utils/authorization';
import { mutate } from '@onflow/fcl';
import { EXAMPLE_NFT_CONTRACT_ADDRESS, NON_FUNGIBLE_TOKEN_CONTRACT_ADDRESS } from './flow/config';

async function mintScript(recipient: string) {
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
        const transactionId = await mutate({
            cadence: `
            import ExampleNFT from ${EXAMPLE_NFT_CONTRACT_ADDRESS}
            import NonFungibleToken from ${NON_FUNGIBLE_TOKEN_CONTRACT_ADDRESS}

            transaction(names: [String], descriptions: [String], thumbnails: [String], recipient: Address) {
                let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
                
                prepare(signer: AuthAccount) {
                    self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                                .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                                                ?? panic("The recipient has not set up an ExampleNFT Collection yet.")
                }

                execute {
                    var i = 0
                    while i < names.length {
                        let extraMetadata: {String: AnyStruct} = {}
                        ExampleNFT.mintNFT(recipient: self.RecipientCollection, name: names[i], description: descriptions[i], thumbnail: thumbnails[i], extraMetadata: extraMetadata)
                        i = i + 1
                    }
                }
            }
            `,
            args: (arg, t) => [
                arg(names, t.Array(t.String)),
                arg(descriptions, t.Array(t.String)),
                arg(thumbnails, t.Array(t.String)),
                arg(recipient, t.Address)
            ],
            proposer: serverAuthorization,
            payer: serverAuthorization,
            authorizations: [serverAuthorization],
            limit: 999
        });

        console.log({ transactionId })
    } catch (e) {
        console.log(e);
    }
}

mintScript(process.argv.slice(2)[0]);
