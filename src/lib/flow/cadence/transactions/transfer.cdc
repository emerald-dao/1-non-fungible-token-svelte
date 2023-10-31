import ExampleNFT from "../contracts/ExampleNFT.cdc"
import NonFungibleToken from "../contracts/utility/NonFungibleToken.cdc"

transaction(recipient: Address, withdrawID: UInt64) {
  let ProviderCollection: &ExampleNFT.Collection{NonFungibleToken.Provider}
  let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
  
  prepare(signer: AuthAccount) {
    self.ProviderCollection = signer.borrow<&ExampleNFT.Collection{NonFungibleToken.Provider}>(from: ExampleNFT.CollectionStoragePath)
                                ?? panic("The signer does not have an ExampleNFT Collection set up.")

    self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                                ?? panic("The recipient does not have an ExampleNFT Collection set up.")
  }

  execute {
    let nft: @NonFungibleToken.NFT <- self.ProviderCollection.withdraw(withdrawID: withdrawID)
    self.RecipientCollection.deposit(token: <- nft)
  }
}