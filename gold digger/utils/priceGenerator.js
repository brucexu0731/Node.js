export function generateGoldPrice(curPrice) {
    let val = Math.random()
    let num = Math.random() * 10
    let nextPrice = val < 0.53 ? num + curPrice : curPrice - num
    return Number(nextPrice.toFixed(2))
}