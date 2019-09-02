const moment = require('moment')
const math = require('mathjs');
let date = moment();
var generateMessage = function(from,text)
{
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
var generateLocationMessage = function(from,latitude,longitude)
{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}
var mathOperations = function(expression)
{
    try
    {
      
        return math.evaluate(expression);
    }
    catch(err)
    {
        return ("invalid input make sure you have entered correct values for maths operations")
    }
}
module.exports={generateMessage,generateLocationMessage,mathOperations}