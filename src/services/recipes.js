const baseURL = "https://dummyjson.com"

export async function fetchAllRecipes(){
const response = await fetch(`${baseURL}/recipes`)
const data = response.json().then(res=>res)

return data
}
export async function fetchRecipeById(id){
const response = await fetch(`${baseURL}/recipes/${id}`)
const data = response.body
return data
}
export async function fetchRecipesByPage(page,limit){
const response = await fetch(`${baseURL}/recipes?limit=${limit}&skip=${page-1 * limit}&select=name,image`)
const data = response.body
return data
}