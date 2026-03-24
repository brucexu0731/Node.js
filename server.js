import http from "node:http"
import { serveStatic } from './utils/serveStatic.js'
import { handlePrice } from "./handlers/routeHandlers.js"
import { handlePurchase } from "./handlers/routeHandlers.js"

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

    if (req.url === '/price/live'){
        await handlePrice(req, res)
    } else if (req.url === '/purchase' && req.method === 'POST') {
        //console.log("purchase route hit")
        await handlePurchase(req, res)
    } else {
        await serveStatic(req, res, __dirname)
    }

})


server.listen(PORT, () => {console.log(`Server connected on port: ${PORT}`)})