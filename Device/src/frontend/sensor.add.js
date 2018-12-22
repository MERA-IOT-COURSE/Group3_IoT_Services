$(function () {
    $("button#saveSensorAddForm").click(function (event) {
        var sensorId = $("#sensorID").val()
        var sensorType = $("#sensorType").val()
        var actions = []
        var actionsSensorCommon = $("#actionsSensorCommon").val()
        if (actionsSensorCommon.length > 1) {
            actions = actions.concat(actionsSensorCommon)
        } else if (actionsSensorCommon.length == 1) {
            actions.push(actionsSensorCommon[0])
        }
        var actionsSensorCustom = $("#actionsSensorCustom").val()
        if (actionsSensorCustom.length > 1) {
            actions = actions.concat(actionsSensorCustom)
        } else if (actionsSensorCustom.length == 1) {
            actions.push(actionsSensorCustom[0])
        }
        if (actions.length == 0) {
            actions.push("null")
        }
        $.ajax({
            type: "POST",
            url: "/profile/sensor",
            data: {
                sensor: {
                    id: sensorId,
                    type: sensorType,
                    actions: actions
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
