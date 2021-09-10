function getAll(request, response) {
    response.json({message: "Using controllers"})
}

function create(request, response) {
    const { name } = request.body
    response.json({message: `Using controllers with ${name}`})
}

module.exports = { getAll, create }
