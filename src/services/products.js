const baseURL = "https://dummyjson.com/";

export async function fetchPosts() {
  const data = fetch(`${baseURL}/products`);
  return data;
}
export async function fetchProductsByPage(page, limit) {
  const response = await fetch(`${baseURL}/products?limit=${limit}&skip=${(page - 1) * limit}`);
  const data = response.json().then((res) => res);
  return data;
}
