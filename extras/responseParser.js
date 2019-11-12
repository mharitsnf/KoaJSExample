const send = (code, status, data) => {
    return {
        code: code,
        status: status,
        data: data
    }
}

const fail = (code, status, error) => {
    return {
        code: code,
        status: status,
        error: error
    }
}

module.exports = { send, fail }