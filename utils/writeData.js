import fs from "node:fs/promises"

export async function writeData(data){
    const fileText = JSON.stringify(data, null, 2)
    await fs.writeFile("./data/data.json", fileText, "utf8")
}