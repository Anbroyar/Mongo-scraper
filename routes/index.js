module.exports = function (app) {
	app.get("/", function (req, res) {
    db.Headline.find().sort({createdAt: -1})
    .then(function(data) {
        object = { headline: data };
        res.render("home", object);
    })
    .catch(function(err) {
        return res.json(err);
    });
});
app.get("/scrape", function(req, res) {
     request("http://www.latimes.com/").then(function(error, response, html) {
        var $ = cheerio.load(html);
        $("div.flex-container-column").each(function(i, element) {
            var result = {};
            result.title = $(element).children("h5").text();
            result.link = $(element).children("a").attr("href");
            result.summary = $(element).children("p.preview-text").text();
            db.Headline.create(result)
            .then(function() {
                res.json("Scrape Complete");
            })
            .catch(function(err) {
                return res.json(err);
            });
        });
    });
});

};