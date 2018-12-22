$(function () {
    $("button#removeDevice").click(function (event) {
        var host = $("#brokerHost").val()
        var port = $("#brokerPort").val()
        $.ajax({
            type: "DELETE",
            url: "/profile/device",
            success: function () {
                window.location.reload()
            },
            error: function () {
                alert("Failed")
                window.location.reload()
            }
        })
    })
})
