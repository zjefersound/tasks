const moment = require('moment');

module.exports = app => {
    const getTasks = (request, response) => {
        const date = request.query.date 
            ? request.query.date 
            : moment().endOf('day').toDate();

        app.db('tasks')
            .where({ userId: request.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then( tasks => response.json(tasks))
            .catch( err => response.status(400).json(err));
    }

    const save = (request, response) => {
        if ( !request.body.desc) {
            return response.status(400).send('Descrição é um campo obrigatório');
        }
        request.body.userId = request.user.id;

        app.db('tasks')
            .insert(request.body)
            .then( _ => response.status(204).send())
            .catch( err => response.status(400).json(err))
    }

    const remove = (request, response) => {
        app.db('tasks')
            .where({ 
                id: request.params.id, 
                userId: request.user.id
            }).del()
            .then( rowsDeleted => {
                if ( rowsDeleted > 0 ) {
                    response.status(204).send()
                } else {
                    const msg = `Não foi encontrada a tarefa com id`;
                    response.status(400).send(msg);
                }
            }).catch( err => response.status(400).json(err));
    }

    const updateTaskDoneAt = (request, response, doneAt) => {
        app.db('tasks')
            .where({ 
                id: request.params.id, 
                userId: request.user.id 
            })
            .update({ doneAt })
            .then( _ => response.status(204).send())
            .catch( err => response.status(400).json(err));     
    }

    const toggleTask = (request, response) => {
        app.db('tasks')
            .where({ 
                id: request.params.id,
                userId: request.user.id
            })
            .first()
            .then( task => {
                if ( !task ) { 
                    const msg = `Task com id ${request.params.id} não existe`;
                    return response.status(400).send(msg);
                }
                const doneAt = task.doneAt 
                    ? null 
                    : new Date(); 
                updateTaskDoneAt( request, response, doneAt );
            })
            .catch( err => response.status(400).json(err)); 
    }

    return { 
        getTasks,
        save,
        remove,
        toggleTask
    }
}
