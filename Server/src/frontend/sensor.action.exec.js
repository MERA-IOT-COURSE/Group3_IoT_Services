$(function () {
    $(".modalSensorAction").on("show.bs.modal", function (event) {
        var deviceIndex = this.id.split("-")[1]
        var sensorIndex = this.id.split("-")[2]
        var actionIndex = this.id.split("-")[3]
        $.ajax({
            type: "GET",
            url: `/device/${deviceIndex}/sensor/${sensorIndex}/action/${actionIndex}`,
            success: function (res) {
                $(`#modalSensorAction-${deviceIndex}-${sensorIndex}-${actionIndex}`).find(".modal-dialog").find(".modal-content").find(".modal-body").html(res)
            },
            error: function () {
                alert("Failed")
                window.location.reload()
            }
        })
    })
})