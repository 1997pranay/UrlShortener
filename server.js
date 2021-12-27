const express = require('express');
const app = express();
const ShortUrl = require('./models/shortUrl');
const logger = require('./config/logger');
const httpLogger = require('./middlewares/httpLogger');
const helmet = require('helmet');
const port = process.env.PORT || 5000;

require("./config/dbConnection");

app.set('view engine', 'ejs');
app.use(httpLogger);
app.use(express.urlencoded({ extended: false }));
app.use(helmet());


app.get('/', async (req, res) => {
    try {
        const shortUrls = await ShortUrl.find();
        res.render('index', { shortUrls: shortUrls });
    } catch (err) {
        logger.error(err);
    }
});

app.post('/shortUrls', async (req, res) => {
    try {
        const full = req.body.fullUrl;
        const newUrl = new ShortUrl({
            full
        });

        await newUrl.save();

        res.redirect('/')
    } catch (err) {
        logger.error(err);
    }
});

app.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrls = await ShortUrl.findOne({ short: req.params.shortUrl });

        if (shortUrls === null)
            return res.status(404);

        shortUrls.clicks++;
        shortUrls.save();
        res.redirect(shortUrls.full);
    } catch (err) {
        logger.error(err);
    }
});


app.listen(port, err => {
    if (err) {
        logger.info(`Unable to run server \n${err}`);
        return;
    }
    logger.info(`Server is up and running on http://localhost:${port}`);
});