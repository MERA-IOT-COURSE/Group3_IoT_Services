$(function () {
    $("button#saveServerForm").click(function (event) {
        var backendId = $("#serverID").val()
        $.ajax({
            type: "PUT",
            url: "/profile",
            data: {
                backendId: backendId
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
