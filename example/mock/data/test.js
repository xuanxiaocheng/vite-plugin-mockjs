const params1 = require('./params1.json')
const EMPTY = { success: true, data: {}, message: null, status: 200 }
const config = { params1, params2: EMPTY }
module.exports = function(request, response) {
    const type = request._parsedUrl.query.split('=')[1]
    response.end(JSON.stringify(config[type]))
}