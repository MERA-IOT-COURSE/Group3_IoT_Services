$(function () {
    $("button#saveServerForm").click(function (event) {
        var backendId = $("#serverID").val()
        var active = $("#activeBox").is(":checked")
        $.ajax({
            type: "PUT",
            url: "/profile",
            data: {
                backendId: backendId,
                active: active
            },
            success: function () {
                window.location.reload()
            },
            error: function () {
                alert("Failed")
            }
        })
    })
})