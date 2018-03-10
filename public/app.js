$(document).ready(function () {
    $(".saveBtn").on("click", function() {
        var headlineId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/saved/" + headlineId,
        })
        .then(function(data) {
            console.log(data);
        });
    });

    $(".removeBtn").on("click", function() {
        var headlineId = $(this).attr("data-id");
        console.log(headlineId);
        $.ajax({
            method: "POST",
            url: "/removed/" + headlineId,
        })
        .then(function(data) {
            location.reload();
        });
    });

    $(".modalBtn").on("click", function() {
        var headlineId = $(this).attr("data-target");
        $("#userCmnt" + headlineId).empty();
        $.ajax({
            method: "GET",
            url: "/api/headline/" + headlineId
        })
        .then(function(data) {
            console.log(data);
        if (data.note) {
            for (var i = 0; i < data.note.length; i++) {
                var createNoteDiv = $('<div class="card"><div class="card-body"><p>' 
                    + data.note[i].body + '</p><button id="' + data.note[i]._id 
                    +'" class="btn btn-outline-danger btn-sm deleteBtn float-right" type="submit">Delete Note</button></div></div><br />');
                $("#userCmnt" + headlineId).append(createNoteDiv);
                $("#" + data.note[i]._id).on("click", function() {
                    var deleteNoteId = $(this).attr("id");
                    $.ajax({
                        type: "DELETE",
                        url: "/api/note/" + deleteNoteId
                    })
                    .then(function(data) {
                        location.reload();
                    });
                });
            }         
        }
        });
    });

    $(".newComment").on("click", function() {
        var headlineId = $(this).attr("data-id");
        $.ajax({
            type: "POST",
            url: "/api/headline/" + headlineId,
            data: {
                body: $("#noteInput" + headlineId).val().trim()
            }
        })
        .then(function(data) {
            location.reload();
        });
    });
});