$("#serverActiveStateButton").change(function () {
    var active = $(this).prop("checked")
    $.ajax({
        type: "PUT",
        url: "/active",
        data: {
            active: active
        },
        error: function () {
            alert("Failed")
            window.location.reload()
        }
    })
})