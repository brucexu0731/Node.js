export async function getRequestData(req) {
    let body = ''

    for await (let chunk of req) {
        body += chunk
    }

    try {
        return JSON.parse(body)
    } catch(err){
        throw new Error(`Invalid JSON format: ${err}`)
    }
}