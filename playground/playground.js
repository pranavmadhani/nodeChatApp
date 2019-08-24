let moment = require('moment')
let date = moment();

console.log(date.format("ddd-DD:MM:YYYY"))
console.log(date.format("    HH:mm:ss"))

let x = moment().valueOf()
console.log(x)