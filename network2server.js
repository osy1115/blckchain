const WebSocket = require('ws')

// 내 자신을 ws 서버로 만들겠다

let Sockets = []

function wsInit(){
    const server = new WebSocket.Server({port:6005})
    server.on("connection",(ws)=>{
      init(ws)
    })
}

function init(ws){
    Sockets.push(ws)
    initMessageHandler(ws)
    initErrorHandler(ws)
}

function initErrorHandler(ws){
    ws.on("close",()=> closeConnection(ws))
    ws.on("error",()=> closeConnection(ws))
}

function closeConnection(ws){
    console.log(`Connection close ${ws.url}`)
    Sockets.splice(Sockets.indexOf(ws),1)
}


const MessageAction = {
    QUERY_LAST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCK:2
}

function initMessageHandler(ws){
    ws.on("message",(data)=>{
        const message = JSON.parse(data)
        switch(message.type){
            case MessageAction.QUERY_LAST:
                console.log(message.data)
                console.log("msg를 출력한다")
            break;
            case MessageAction.QUERY_ALL:
                console.log(message.data)
            break;
            case MessageAction.RESPONSE_BLOCK:
                handleBlockResponse()
            break;
        }
    })
}

function handleBlockResponse(){

}

function write(ws,message){
    ws.send(JSON.stringify(message))
}

wsInit()
module.exports = {
    wsInit,
}


// wsInit()