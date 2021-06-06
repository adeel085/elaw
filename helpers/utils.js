let path = require('path')
let fs = require('fs')

renameFileWithUniqueName = (previousName) => {
    let dots = previousName.split('.')
    let dt = new Date();
    let newFileName = ''
    for(let i = 0; i < dots.length - 1; i++) {
        newFileName += dots[i]
    }
    newFileName += '_' + dt.getFullYear()
        + '_' + (dt.getMonth()+1)
        + '_' + (dt.getDate())
        + '_' + (dt.getHours())
        + '_' + (dt.getMinutes())
        + '_' + (dt.getSeconds())
    newFileName += '.' + dots[dots.length - 1]
    return newFileName
}

module.exports = {
    getCurrentDate: () => {
        let dt = new Date();
        return dt.getFullYear()
            + '-' + (dt.getMonth()+1)
            + '-' + (dt.getDate())
            + ' ' + (dt.getHours())
            + ':' + (dt.getMinutes())
            + ':' + (dt.getSeconds())
    },

    uploadFiles: async (req) => {
        let filePaths = []
        for (const file of Object.entries(req.files)) {

            let fileObject = file[1]
            let uploadPath = path.join(__dirname, '../','public', 'uploads', 'cases-documents', 'case-' + req.session.currentCase.id, fileObject.name)

            let newName = renameFileWithUniqueName(fileObject.name)
            let newPath = path.join(__dirname, '../','public', 'uploads', 'cases-documents', 'case-' + req.session.currentCase.id, newName)

            let DBPath = path.join('uploads', 'cases-documents', 'case-' + req.session.currentCase.id, newName)
            filePaths.push(DBPath)

            await fileObject.mv(uploadPath, function(err) {
                if (err)
                    console.log(err)
                else
                    fs.renameSync(uploadPath, newPath)
            })

        }
        return filePaths
    }
}