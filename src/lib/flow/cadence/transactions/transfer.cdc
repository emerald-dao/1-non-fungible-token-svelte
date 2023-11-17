import "ExampleNFT"
import "NonFungibleToken"

transaction(recipient: Address, withdrawID: UInt64) {
  let SenderCollection: &ExampleNFT.Collection
  let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
  
  prepare(signer: AuthAccount) {
    self.SenderCollection = signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
                                ?? panic("The signer does not have an ExampleNFT Collection set up.")

    self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                                ?? panic("The recipient does not have an ExampleNFT Collection set up.")
  }

  execute {
    let nft: @NonFungibleToken.NFT <- self.SenderCollection.withdraw(withdrawID: withdrawID)
    self.RecipientCollection.deposit(token: <- nft)
  }
}