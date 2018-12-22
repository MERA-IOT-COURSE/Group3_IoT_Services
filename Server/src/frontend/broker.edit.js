$(function () {
    $("button#saveBrokerForm").click(function (event) {
        var host = $("#brokerHost").val()
        var port = $("#brokerPort").val()
        $.ajax({
            type: "PUT",
            url: "/profile",
            data: {
                broker: {
                    host: host,
                    port: port
                }
            },
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