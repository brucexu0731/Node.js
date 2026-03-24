import path from "node:path"

export function getContentType(filePath){
    const ext = path.extname(filePath)

    const types = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml"
    }

    return types[ext.toLowerCase()] || 'text/html'
}
