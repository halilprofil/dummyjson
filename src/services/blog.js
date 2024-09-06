const baseURL = "https://dummyjson.com";

export async function fetchPosts() {
  const data = fetch(`${baseURL}posts`);
  return data;
}
export async function fetchBlogByPage(page, limit) {
  const response = await fetch(`${baseURL}/posts?limit=${limit}&skip=${(page - 1) * limit}`);
  const data = response.json().then((res) => res);
  return data;
}
export async function fetchUsers(){
  const response = await fetch(`${baseURL}/users?limit=${300}&skip=0`);
  const data = response.json().then((res) => res);
  return data;
}

export async function fetchComments(){
  const response = await fetch(`${baseURL}/comments?limit=${300}&skip=0`);
  const data = response.json().then((res) => res);
  return data;
}
