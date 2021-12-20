const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}
module.exports = {
    info, error,
}

// täällä on määriteltynä kaksi funktiota erilaisten logien tekemiseen
// on funktio "info" normilogeille ja funktio "error" error logeille
