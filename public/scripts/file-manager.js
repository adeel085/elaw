var currentFolderFileManager = undefined

$(document).on("click", ".dir-btn", function() {
    var nextElement = $(this).next();

    // If the clicked directory further contains some other directories
    if($(nextElement).is('.dirs-list')) {
        
        if($(this).attr("data-selected") == "false") {

            $(".dir-btn").removeClass("selected");
            $(".dir-btn").attr("data-selected", "false");

            $(this).addClass("selected");
            $(this).attr("data-selected", "true");
               
            $(this).children(".arrow-icon").removeClass("fa-caret-right");
            $(this).children(".arrow-icon").addClass("fa-caret-down");

            $(nextElement).slideDown();
            
            showDirectoryContent(nextElement);
        }
        else if($(this).attr("data-selected") == "true") {

            // $(".dir-btn").addClass("selected");
            // $(".dir-btn").attr("data-selected", "true");

            $(this).removeClass("selected");
            $(this).attr("data-selected", "false");

            $(this).children(".arrow-icon").removeClass("fa-caret-down");
            $(this).children(".arrow-icon").addClass("fa-caret-right");

            $(nextElement).slideUp();
        }

    }
    // If the clicked directory does not contain any other directories
    else {
        $(".dir-btn").removeClass("selected");
        $(".dir-btn").attr("data-selected", "false");
        $(this).addClass("selected");

        showDirectoryContent(nextElement);
    }

    // Code to update the selected directory path in #current-dir-path-view div
    var path = $(this).attr("data-dir-path");
    currentFolderFileManager = path;
    var dirs = path.split("/");

    $("#current-dir-path-view").empty();
    var nodes = "";
    for(var i = 0; i < dirs.length; i++) {
        nodes += "<div class='path-indiv-dir'>"+
            "<i class='fa fa-folder'></i>&nbsp;&nbsp;" + dirs[i] +
        "</div>";
    }
    $("#current-dir-path-view").append(nodes);
});

$(document).on('click', '.dir-table-cell.name-cell', function() {
    let type = $(this).attr("data-type")

    if (type == 'file') {
        
        return
    }

    let path = $(this).attr('data-dir-path')
    $(".dirs-list").find(".dir-btn").each(function() {
        if ($(this).attr("data-dir-path") == path) {
            $(this).click()
            return false
        }
    })
})



// Code to show the directory content in dir-contents-area
function showDirectoryContent(dirsList) {
    $("#contents-view").empty()

    $(dirsList).children().each(function() {
        let path = $(this).find(".dir-btn").first().attr("data-dir-path")
        let type = $(this).find(".dir-btn").first().attr("data-type")
        let baseName = getBaseNameFileManager(path)
        
        $("#contents-view").append(`<div class="dir-table-data-row dir-table-row pt-1 pb-1">
                                        <div class="dir-table-cell chk-bx-cell">
                                            <input type="checkbox"/>
                                        </div>
                                        <div class="dir-table-cell name-cell" data-dir-path="${path}" data-type="${type}">
                                            <i class="fa fa-${type}"></i>&nbsp;
                                            <span>${baseName}</span>
                                        </div>
                                        <div class="dir-table-cell modified-cell">
                                            2018-04-03
                                        </div>
                                    </div>`)    
    })
}

function getBaseNameFileManager(path) {
    let parts = path.split('/')
    return parts[parts.length - 1]
}
