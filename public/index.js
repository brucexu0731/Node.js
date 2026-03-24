const priceDisplay = document.getElementById('price-display')
const eventSource = new EventSource('/price/live')
const purchaseForm = document.getElementById("purchase-form")
const purchaseValue = document.getElementById("investment-amount")

console.log("frontend running")

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = data.price
    //console.log(`Price updated: ${price}`)
    priceDisplay.textContent = price
}

eventSource.onerror = () => {
  console.log('Connection failed...')
}

purchaseForm.addEventListener('submit', async function(e){
    e.preventDefault()
    console.log("purchase form submitted")
    const value = purchaseValue.value
    const price = Number(document.getElementById("price-display").textContent)
    const submittedAt = new Date().toISOString()

    const body = { 
        amount: value,
        price: price,
        time: submittedAt 
    }
    console.log(body)
    
    await fetch('/purchase', { 
        method: 'POST',
        headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
})

