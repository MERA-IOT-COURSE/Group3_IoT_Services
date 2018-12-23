$(function () {
    $(".modalDeviceAction").on("show.bs.modal", function (event) {
        var deviceIndex = this.id.split("-")[1]
        var actionIndex = this.id.split("-")[2]
        $.ajax({
            type: "GET",
            url: `/device/${deviceIndex}/action/${actionIndex}`,
            success: function (res) {
                $(".modal-body").html(res)
            },
            error: function () {
                alert("Failed")
                window.location.reload()
            }
        })
    })
})