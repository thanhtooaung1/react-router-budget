//localStorage

//fetch item
export function fetchData(key) {
  return JSON.parse(localStorage.getItem(key));
}

//delete item
export function deleteItem({ key }) {
  localStorage.removeItem(key);
}
