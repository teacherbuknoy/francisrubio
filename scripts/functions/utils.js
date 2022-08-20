const prompts = require('prompts')
const fs = require("fs")
const path = require("path")
const yaml = require('json-to-pretty-yaml')
const slug = require('slug')
const metadata = getMetadata()

async function getCollectionType() {
  const collectionTypes = Object.keys(metadata.types)
  const formattedList = collectionTypes.toString().replace(/,/g, ', ')
  return prompts({
    type: 'select',
    name: 'collection',
    message: `What type of post is this?`,
    choices: collectionTypes.map(type => ({
      title: type[0].toUpperCase() + type.substring(1),
      value: type
    }))
  })
}

function getMetadata() {
  const dir = path.resolve(__dirname, '../metadata.json')
  const strMetadata = fs.readFileSync(dir, 'utf-8')
  const metadata = JSON.parse(strMetadata)
  metadata.authors = getAuthors()

  return metadata
}

async function getCollectionDetails(collectionType) {
  const collectionSchema = metadata.types[collectionType]

  const questions = Object.keys(collectionSchema).map(key => {
    const question = {
      type: collectionSchema[key],
      name: key,
      message: `${key}`
    }

    if (key === 'author') {
      const authors = metadata.authors
      question.choices = Object.keys(authors).map(author => ({
        title: authors[author].name,
        value: author
      }))
    }

    return question
  })

  const response = await prompts(questions)
  response.seo = {
    twitter: { src: '' },
    og: { src: '' },
  }

  const postData = {
    ...response,
    seo: {
      twitter: { src: '', is_prefixed: false },
      og: { src: '', is_prefixed: false }
    },
    eleventyExcludeFromCollections: false
  }

  return postData
}

function getAuthors() {
  const authorPath = path.resolve(__dirname, '../../src/data/authors.json')
  const strAuthors = fs.readFileSync(authorPath, 'utf-8')
  return JSON.parse(strAuthors)
}

async function writeFile(collection, postMetadata) {
  const date = new Date()
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(2, "0")}-${(date.getDate() + "").padStart(2, "0")}`

  const filename = `${formattedDate}-${slug(postMetadata.title)}.md`
  const header = `---\n` + yaml.stringify(postMetadata) + `---\n`
  const filepath = path.resolve(__dirname, "../../src/collections", collection, filename)

  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, header, (err) => {
      if (err) reject(err)
      else resolve(filepath)
    })
  })
}

module.exports = {
  getCollectionType,
  getMetadata,
  getCollectionDetails,
  getAuthors,
  writeFile
}