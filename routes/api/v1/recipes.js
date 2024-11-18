const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname, '..', '..', 'public')
function getRecipes(){
    const recipe = require('../../../data/recipes.json')
    return Recipe = recipe;
}

router.get('/api/v1/', async (request, response) => {
   console.log("Found")
   const recipes = await getRecipes()
   
   
   const first = recipes.map(({id, title, image, prepTime, difficulty}) => {
    return {id, title, image, prepTime, difficulty}
     
})
    response.send(first)
   console.log(first)
})

router.post('/api/v1/recipe/add', async(request, response) =>{
    const recipes = await getRecipes()
    const {title, image, ingredients, instructions, prepTime, difficulty} = request.body
    const found = recipes.find(p => p.title.toString() === title.toString())
    const newId = recipes.length + 1
    if (found) response.send({ error: { message: `Recipe: ${title}, already exists`} })
    else recipes.push({ id: newId, title, image, ingredients, instructions, prepTime, difficulty})
})


 router.get('/api/v1/recipe/:id', async (request, response) => {
    const {id} = request.params
    
     const found = await getRecipes().find(p => p.id.toString() === id.toString())
     if (found) response.send(found)
        else response.send({ error: { message: `Could not find pokemon with id: ${id}` }})
 })

module.exports = router