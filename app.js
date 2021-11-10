const mongoose = require("mongoose")
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');

app.use(cors());
app.options('=', cors())


require('dotenv/config');
const api = process.env.API_URL;
const productsRouter = require('./routers/products')
const categoryRouter = require('./routers/categories')

//middleware
app.use(express.json())
app.use(morgan('tiny'))

//import router
app.use(`${api}/products`, productsRouter);
app.use(`${api}/category`, categoryRouter);


mongoose.connect(process.env.CONNECTION_STRING,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: `eshop-database`
})
    .then(() => {
        console.log('Database is ready to use...')
    }).catch((error) => {
        console.log(error)
    });

app.listen(3000, () => {
    console.log('Server is running....')
    console.log(api)
})