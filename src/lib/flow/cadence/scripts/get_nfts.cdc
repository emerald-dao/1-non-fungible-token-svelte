import "ExampleNFT"
import "MetadataViews"

pub fun main(address: Address): [NFT] {
  let collection = getAccount(address).getCapability(ExampleNFT.CollectionPublicPath)
                    .borrow<&ExampleNFT.Collection{MetadataViews.ResolverCollection}>()
                    ?? panic("Could not borrow a reference to the collection")

  let answer: [NFT] = []

  for id in collection.getIDs() {
    // Get the basic display information for this NFT
    let nft: &{MetadataViews.Resolver} = collection.borrowViewResolver(id: id)
    // Get the basic display information for this NFT
    let view: AnyStruct = nft.resolveView(Type<MetadataViews.Display>())!
    let display: MetadataViews.Display = view as! MetadataViews.Display
    answer.append(
      NFT(
        id: id, 
        name: display.name, 
        description: display.description, 
        thumbnail: display.thumbnail
      )
    )
  }

  return answer
}

pub struct NFT {
  pub let id: UInt64
  pub let name: String 
  pub let description: String 
  pub let thumbnail: AnyStruct{MetadataViews.File}
  
  init(id: UInt64, name: String, description: String, thumbnail: AnyStruct{MetadataViews.File}) {
    self.id = id
    self.name = name 
    self.description = description
    self.thumbnail = thumbnail
  }
}