const baseURL = "https://dummyjson.com/";

export async function fetchPosts() {
  const data = fetch(`${baseURL}posts`);
  return data;
}
export async function fetchProductsByPage(page, limit) {
  const response = await fetch(`${baseURL}/posts?limit=${limit}&skip=${(page - 1) * limit}`);
  const data = response.json().then((res) => res);
  return data;
}
