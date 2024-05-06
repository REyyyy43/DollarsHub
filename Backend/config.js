const PAGE_URL = process.env.NODE_ENV === 'production'
? 'https://barber-shop-q3y0.onrender.com'
: 'http://localhost:3003'

const MONGO_URI = process.env.NODE_ENV === 'production'
? process.env.MONGO_URI_PROD
: process.env.MONGO_URI_TEST


module.exports = { PAGE_URL, MONGO_URI };