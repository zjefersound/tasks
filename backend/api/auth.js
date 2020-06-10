const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const signin = async (request, response) => {
        const { email, password } = request.body;
        
        if ( !email || !password ) {
            return response.status(400).send('Dados incompletos');
        }

        const user = await app.db('users')
            .where({ email: email })
            .first();
        
        if ( user ) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if ( err || !isMatch ) {
                    return response.status(401).send();
                }
                
                //Payload é o valor que vai ficar armazenado no token
                const payload = { 
                    id: user.id 
                }
                response.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                });
            });
        } else {
            response.status(400).send('Email ou senha inválidos');
        }     
    }

    return { signin }
}
