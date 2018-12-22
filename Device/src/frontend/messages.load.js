$("#messagesModalCenter").on("show.bs.modal", function (event) {
    $.ajax({
        type: "GET",
        url: "/messages",
        success: function (res) {
            $(".modal-body").html(res)
        },
        error: function () {
            alert("Failed")
            window.location.reload()
        }
    })
})