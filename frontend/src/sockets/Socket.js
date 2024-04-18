// Import io from socket.io-client
import io from 'socket.io-client';

const url = 'http://localhost:1100'
const auth = window.localStorage.getItem("_auth")

const socket = io(url, {
    autoConnect: false,
    query:{
        auth
    }
})

export default socket