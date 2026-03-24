export function sendResponse(res, code, type, content){
    res.writeHead(code, {'Content-Type': type})
    res.end(content)
}