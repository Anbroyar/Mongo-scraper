module.exports = function (app) {
app.get("/saved", function(req, res) {
    db.Headline.find({saved: true})
    .then(function(data) {
        object = { headline: data };
        res.render("saved", object);
    })
    .catch(function(err) {
        return res.json(err);
    });
});

app.post("/saved/:id", function(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id}, { $set: {saved: true}})
    .then(function(saved) {
        res.json(saved);
    })
    .catch(function(err) {
        return res.json(err);
    });
});

app.post("/removed/:id", function(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id}, { $set: { saved: false }})
    .then(function(removed) {
        res.json(removed);
    })
    .catch(function(err) {
        return res.json(err);
    });
});
};