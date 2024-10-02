const mongoose = require('mongoose')

mongoose.connect(
    'mongodb://127.0.0.1:27017/mobigik_test',
    {}
  ).then(() => console.log('mongodb connected!'))
  .catch((err) => console.error('error in '+err))

mongoose.Promise = global.Promise

module.exports = {
    User:require('./user.schema'),
    Media:require('./media.schema')
}
