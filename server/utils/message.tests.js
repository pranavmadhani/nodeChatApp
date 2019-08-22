var expect = require('expect')
var{generateMessage} = require("./mesage")

describe('generateMessage',()=>{

    it('should generate correct message object',()=>{

        var from ='pranav';
        var text = 'some text';
        var message = generateMessage(from,text);
        expect(message.createdAt).toBeTruthy()
        expect(message.from).toHaveProperty({

            from,text
        })
        


        

    })


})