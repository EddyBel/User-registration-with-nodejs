window.addEventListener("DOMContentLoaded", () => {
  fetch(`${API}/user`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "x-access-token": TOCKEN,
    },
  })
    .then((response) => response.json())
    .then((response) => response);
});
