const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const getHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash( password, salt, null, (err, hash) => callback(hash) );
        });
    }

    const save = (request, response) => {
        getHash(request.body.password, hash => {
            const password = hash;
            const { name, email } = request.body;
            app.db('users')
                .insert({
                    name,
                    email,
                    password,
                })
                .then( _ => response.status(204).send())
                .catch( err => response.status(400).json(err));
        });
    }

    return { save };
}