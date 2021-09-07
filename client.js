const WebSocket = require('ws')

const ws = new WebSocket("ws://localhost:6005") // 연결은 여기서 끝남

// 연결이 완료되었고, 최초로 실행하는 코드 'open'
ws.on('open',() =>{
    write(ws,queryBlockMsg())
    write(ws,queryAllMsg())
})

const MessageAction = {
    QUERY_LAST : 0,
    QUERY_ALL : 1,
    RESPONSE_BLOCK: 2
}

function queryAllMsg(){
    return{
        type:MessageAction.QUERY_ALL,
        data:null,
    }
}

function queryBlockMsg(){
    return{
        type:MessageAction.RESPONSE_BLOCK,
        data:null,
    }
}

function write(ws,message){
    ws.send(JSON.stringify(message))
}

ws.on('error',()=>{
    console.log('err 발생')
})

ws.on('message',(message) => {
    console.log(`received: ${message}`)
})