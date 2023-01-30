
function getCurrentTimestamp () {
    return new Date()
}

function getRandomPersonId(max) {
    return Math.floor(Math.random() * max)
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = { getCurrentTimestamp, getRandomPersonId, isEmptyObject }