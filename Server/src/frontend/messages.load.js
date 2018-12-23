$(function () {
    $("#messagesModalCenter").on("show.bs.modal", function (event) {
        $.ajax({
            type: "GET",
            url: "/messages",
            success: function (res) {
                $("#messagesModalCenter").find(".modal-dialog").find(".modal-content").find(".modal-body").html(res)
            },
            error: function () {
                alert("Failed")
                window.location.reload()
            }
        })
    })
})