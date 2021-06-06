$("#case-id-search").keyup(function(e) {

    console.log("a")
    if(e.which === 13) {
        let caseId = $('#case-id-search').val()

        $.ajax({
            url: baseURL + `/case/casebyid?id=${caseId}`,
            method: 'get',
            dataType: 'json',
            success: function(res) {
                
                if ($.isEmptyObject(res)) {
                    showToast("warning", "Case not found!")
                    return
                }

                $.ajax({
                    url: baseURL + `/case/currentcase`,
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(res),
                    success: function(res) {
                        if (res === 'done') {
                            window.location.href = window.location.href
                        }
                    },
                    error: function(err) {
                        console.log(err)
                    }
                })
            },
            error: function(error) {
                console.log(error)
            }
        })
    }
});

function dbDateTimeToBrowserDate(dbDateTime) {
    let d = new Date(dbDateTime)
    var day = ("0" + d.getDate()).slice(-2)
    var month = ("0" + (d.getMonth() + 1)).slice(-2)
    d = d.getFullYear() + "-" + month + "-" + day
    return d
}

function dbDateTimeToBrowserTime(dbDateTime) {
    let d = new Date(dbDateTime)
    d = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
    return d
}

function showToast(type, message) {

    if (type != "success" && type != "warning" && type != "error") {
        return;
    }

    $("#toast-container>.toast").removeClass("toast-success")
    $("#toast-container>.toast").removeClass("toast-warning")
    $("#toast-container>.toast").removeClass("toast-error")

    $("#toast-container>.toast").addClass(`toast-${type}`)
    $(".toast-message").html(message)
    $("#toast-container").fadeIn()

    setTimeout(() => {
        $("#toast-container").fadeOut()
    }, 3000)
}

$("#close-toast-btn").click(function() {
    $("#toast-container").fadeOut()
})

$("#header-logout-btn").click(function() {
    $.ajax({
        url: baseURL + '/endsession',
        method: 'get',
        success: function(res) {
            window.location.href = baseURL
        }
    })
})

$(function() {
    $(".app-container").append(`<div id="toast-container" class="toast-top-right">
                                    <div class="toast toast-success" aria-live="polite" style="">
                                        <button type="button" class="toast-close-button" role="button" id="close-toast-btn">×</button>
                                        <div class="toast-message"></div>
                                    </div>
                                </div>`)
})


function getBaseName(path) {
    let parts = path.split('/')
    return parts[parts.length - 1]
}
