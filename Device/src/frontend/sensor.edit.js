$(function () {
    $("button.saveSensorEditForm").click(function (event) {
        var sensorIndex = this.id.split("-")[1]
        var sensorId = $(`#sensorID-${sensorIndex}`).val()
        var sensorType = $(`#sensorType-${sensorIndex}`).val()
        var actions = []
        var actionsSensorCommon = $(`#actionsSensorCommon-${sensorIndex}`).val()
        if (actionsSensorCommon.length > 1) {
            actions = actions.concat(actionsSensorCommon)
        } else if (actionsSensorCommon.length == 1) {
            actions.push(actionsSensorCommon[0])
        }
        var actionsSensorCustom = $(`#actionsSensorCustom-${sensorIndex}`).val()
        if (actionsSensorCustom.length > 1) {
            actions = actions.concat(actionsSensorCustom)
        } else if (actionsSensorCustom.length == 1) {
            actions.push(actionsSensorCustom[0])
        }
        if (actions.length == 0) {
            actions.push("null")
        }
        $.ajax({
            type: "PUT",
            url: "/profile",
            data: {
                sensor: {
                    index: sensorIndex,
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
