const {
  getCollectionType,
  getCollectionDetails,
  writeFile
} = require("./functions/utils")

getCollectionType().then(async ({ collection }) => {
  const metadata = await getCollectionDetails(collection)
  writeFile(collection, metadata)
    .then(path => console.log(`New file created [${path}]`))
    .catch(err => console.error(`ERROR: Cannot create file. \n${err}`))
}) 