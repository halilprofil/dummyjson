const baseURL = "https://dummyjson.com/"

export async function fetchPosts(){
const data = fetch(`${baseURL}/posts`)
return data
}