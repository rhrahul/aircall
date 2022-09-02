export async function getDataFromAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postDataToAPI(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return responseJson;
}
