const castError = (error, req, res, next) => {
    error.name === 'CastError' ?  res.status(400).send({error: 'problemas con el parametro que has enviado'}) : res.status(500).end()
  }

  module.exports = castError;