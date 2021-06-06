const fs = require('fs')
const path = require('path')

class DirTreeNode {
    constructor(name) {
        this.name = name
        this.type = undefined
        this.children = []
    }
}

module.exports = {
    getDirTree: (filename) => {
        if (!fs.existsSync(filename)) {
            return null
        }
        
        let rootNode = new DirTreeNode(filename)
        dirTree(rootNode)
        // traverseNode(rootNode)
        return rootNode
    },

    getCurrentDate: () => {
        let dt = new Date();
        return dt.getFullYear()
            + '-' + (dt.getMonth()+1)
            + '-' + (dt.getDate())
            + ' ' + (dt.getHours())
            + ':' + (dt.getMinutes())
            + ':' + (dt.getSeconds())
    }
}

function dirTree(rootNode) {
    
    if (fs.lstatSync(rootNode.name).isDirectory()) {
        rootNode.type = "folder"
        let files = fs.readdirSync(rootNode.name)

        for (let i = 0; i < files.length; i++) {
            rootNode.children.push(new DirTreeNode(rootNode.name + "/" + files[i])) 
        }

        for (let i = 0; i < rootNode.children.length; i++) {
            dirTree(rootNode.children[i])
        }
    } 
    else {
        rootNode.type = "file"
    }
}

// function traverseNode(rootNode) {
//     if (rootNode.type == "file") {
//         console.log('file: ' + rootNode.name)
//         return
//     }
    
//     console.log('folder: ' + rootNode.name)
//     for (let i = 0; i < rootNode.children.length; i++) {
//         traverseNode(rootNode.children[i])
//     }
// }