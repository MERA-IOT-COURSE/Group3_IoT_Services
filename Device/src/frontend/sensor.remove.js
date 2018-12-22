$(function () {
    $("button.removeSensor").click(function (event) {
        var sensorIndex = this.id.split("-")[1]
        $.ajax({
            type: "DELETE",
            url: `/profile/sensor/${sensorIndex}`,
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
