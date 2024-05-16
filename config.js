const PAGE_URL = process.env.NODE_ENV === 'production'
? 'placeholder'
: 'http://localhost:3004'

module.exports = { PAGE_URL };