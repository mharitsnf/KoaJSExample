const send = (code, data) => {
    return {
        code: code,
        status: true,
        data: data
    }
}

const fail = (code, error) => {
    return {
        code: code,
        status: false,
        error: error
    }
}

module.exports = { send, fail }