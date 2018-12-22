$(function () {
    $("button#saveDeviceEditForm").click(function (event) {
        var id = $("#deviceID").val()
        var name = $("#deviceName").val()
        var actions = []
        var actionsDeviceCommon = $("#actionsDeviceCommon").val()
        if (actionsDeviceCommon.length > 1) {
            actions = actions.concat(actionsDeviceCommon)
        } else if (actionsDeviceCommon.length == 1) {
            actions.push(actionsDeviceCommon[0])
        }
        var actionsDeviceCustom = $("#actionsDeviceCustom").val()
        if (actionsDeviceCustom.length > 1) {
            actions = actions.concat(actionsDeviceCustom)
        } else if (actionsDeviceCustom.length == 1) {
            actions.push(actionsDeviceCustom[0])
        }
        if (actions.length == 0) {
            actions.push("null")
        }
        var active = $("#activeBox").is(":checked")
        $.ajax({
            type: "PUT",
            url: "/profile",
            data: {
                device: {
                    id: id,
                    name: name,
                    actions: actions
                },
                active: active
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
