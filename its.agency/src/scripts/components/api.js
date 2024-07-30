export async function getProducts() {
  let data;

  await fetch("https://66a50aef5dc27a3c190a7f88.mockapi.io/products", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((tasks) => {
      data = tasks;
    });

  return data;
}
