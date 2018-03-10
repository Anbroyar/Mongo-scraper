module.exports = function (app) {
	app.get("/api/headline", function(req, res) {
    db.Headline.find({})
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        return res.json(err);
    });
});

app.get("/api/headline/:id", function(req, res) {
    db.Headline.findOne({ _id: req.params.id }).populate("note")
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        return res.json(err);
    });
});

app.post("/api/headline/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        db.Headline.update({ _id: req.params.id}, { $push: { note: dbNote._id }});
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        return res.json(err);
    });
});

app.get("/api/note", function(req, res) {
    db.Note.find({})
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        return res.json(err);
    });
});

app.delete("/api/note/:id", function(req, res) {
    db.Note.findByIdAndRemove({ _id: req.params.id })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        return res.json(err);
    });
});
};