import EventEmmiter from 'lesson-01/events';

const emmiter = new EventEmmiter()

const RequestTypes = [
    {
        type: 'send',
        payload: 'to send a document'
    },
    {
        type: 'receive',
        payload: 'to receive a document'
    },
    {
        type: 'sign',
        payload: 'to sign a document'
    }
]

class Customer {
    constructor({ type, payload }) {
        this.type = type;
        this.payload = payload;
    }
}

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateNewCustomer = () => {
    const randomCustomer = RequestTypes[generateIntInRange(0,RequestTypes.length - 1)]
    return new Customer(randomCustomer)
}

class Handler {
    static  send(payload) {
        console.log('Send request: ', payload)
    }
    static  receive(payload) {
        console.log('Receive request: ', payload)
    }
    static  sign(payload) {
        console.log('Sign request: ', payload)
    }
}

//подписываемся на события
emmiter.on('send', Handler.send)
emmiter.on('receive', Handler.receive)
emmiter.on('sign', Handler.sign)


//вызываем событие
// emmiter.emit('send', 'payload')

const run = async () => {
    const {type, payload} = generateNewCustomer()
    emmiter.emit(type, payload)

    await new Promise(resolve => setTimeout(resolve, generateIntInRange(1000, 5000)))

    await run()
}

run()