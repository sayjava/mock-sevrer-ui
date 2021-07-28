const axios = require('axios')

const BASE_URL = `http://localhost:1080`

const randomMethod = () => {
    const METHODS = ['GET', 'POST', 'DELETE', 'PUT']
    const randIndex = Math.floor(Math.random() * (METHODS.length - 1))
    return METHODS[randIndex]
}

const randomFaang = () => {
    const FAANG = ['google', 'facebook', 'twitter', 'apple']
    const randIndex = Math.floor(Math.random() * (FAANG.length - 1))
    return FAANG[randIndex]
}


const randomDevice = () => {
    const DEVICES = ['iphone', 'motorola', 'nokia', 'pixel', 'samsung']
    const randIndex = Math.floor(Math.random() * (DEVICES.length - 1))
    return DEVICES[randIndex]
}

const randomBody = () => {
    return {
        [randomFaang()]: Math.floor(Math.random() * 100),
        [randomFaang()]: Math.floor(Math.random() * 100),
        [randomFaang()]: Math.floor(Math.random() * 100),
        [randomFaang()]: Math.floor(Math.random() * 100),
    }
}

const fillHellos = async (max = 20) => {
    for (var i = 0; i <= max; i++) {
        const url = i % 2 === 0 ? `${BASE_URL}/hello/${i}` : `${BASE_URL}/hello`
        try {
            await axios(
                url, { method: randomMethod(), data: randomBody() }
            )
        } catch (e) {
            console.error(url, e.message)
        }
    }
}

const fillUsers = async (max = 20) => {
    for (var i = 0; i <= max; i++) {
        const url = `${BASE_URL}/users/sayjava?faang=${randomFaang()}&device=${randomDevice()}`
        try {
            await axios(
                url, {
                method: randomMethod(),
                headers: {
                    cookie: `Token=${Math.random() * 100};`,
                    'x-customer': randomFaang(),
                },
                data: randomBody()
            }
            )
        } catch (e) {
            console.error(url, e.message)
        }
    }
}

const fillCustomer = async (max = 20) => {
    for (var i = 0; i <= max; i++) {
        const url = `${BASE_URL}/customer/${i}?device=${randomDevice()}`
        try {
            await axios(
                url, {
                method: randomMethod(),
                headers: {
                    cookie: `Token=${Math.random() * 100};`,
                    'x-customer': randomFaang(),
                },
                data: randomBody()
            }
            )
        } catch (e) {
            console.error(url, e.message)
        }
    }
}

// fillUsers()
fillHellos()
fillCustomer()
