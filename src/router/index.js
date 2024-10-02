const userRoute = require('./user.route')
const mediaRoute = require('./media.route')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello world!')
    })
    app.use('/users',userRoute)
    app.use('/media',mediaRoute)
}