export function isEmpty(obj) {
    const objValues = Object.values(obj)

    for(let i = 0; i < objValues.length; i++) {
        if(objValues[i] === '') {
            return true
        }
    }

    return false
}

export function validateObj(obj, endpoint) {
    if(endpoint === 'user') {
        if(Object.keys(obj).includes('username') && Object.keys(obj).includes('avatar')) {
            return true
        }

        return false
    } else {
        if(Object.keys(obj).includes('tweet')) {
            return true
        }

        return false
    }
}

export function verifyURL(avatar) {
    const URL_TEST = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi

    if(avatar !== '' && URL_TEST.test(avatar) === true) {
        return true
    }

    return false
}