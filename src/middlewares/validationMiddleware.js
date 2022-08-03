const bodyValidation = (schema) => async (req, res, next) => {

  const body = req.body;

  try {

    await schema.validate(body);

    req.body = body;

    next();

  } catch (error) {

    return res.status(500).json(error)
  }
}

module.exports = bodyValidation
