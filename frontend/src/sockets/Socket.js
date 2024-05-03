// Import io from socket.io-client
import io from 'socket.io-client';

const url = 'http://localhost:1100'

const socket = io(url, {
    autoConnect: false,
    query: {

    }
})

export default socket