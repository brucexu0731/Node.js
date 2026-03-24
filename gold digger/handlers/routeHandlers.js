import { generateGoldPrice } from "../utils/priceGenerator.js"  
import { getRequestData } from "../utils/getRequestData.js"
const purchaseHistory = []
import fs from "node:fs/promises"
import { writeData } from "../utils/writeData.js"
import { sendResponse } from "../utils/sendResponse.js"

let price = 1800

export function handlePrice(req, res){
    res.statusCode = 200
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
   
        setInterval( () => {
            price = generateGoldPrice(price)
            //console.log(price)
            res.write(
                `data: ${JSON.stringify({event: 'price-updated', price: price})}\n\n`
            )
        }, 2000)
}

export async function handlePurchase(req, res){

    try {
        //console.log("purchase request received")
        const data = await getRequestData(req)
        //console.log("purchase data:", data)
        const purchaseMessage = `${data.time}, amount paid: £${data.amount}, price per Oz: £${data.price}, gold sold: ${(data.amount / data.price).toFixed(4)} oz`
        console.log(purchaseMessage)
        purchaseHistory.push(purchaseMessage)
        console.log(purchaseHistory)
        await writeData(purchaseHistory)
        sendResponse(res, 201, 'application/json', JSON.stringify(purchaseMessage))
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    } 

}


