window.addEventListener("DOMContentLoaded", () => {
  let inputEmail = document.getElementById("email");
  let inputPassword = document.getElementById("password");
  let buttonSend = document.getElementById("send-login");
  let errorEmail = document.getElementById("error-email");
  let errorPassword = document.getElementById("error-password");

  const resetValues = () => {
    errorPassword.innerHTML = "";
    errorEmail.innerHTML = "";
  };

  buttonSend.addEventListener("click", (event) => {
    event.preventDefault();
    let email = inputEmail.value;
    let password = inputPassword.value;
    resetValues();

    if ((email === "") | (email === null))
      return (errorEmail.innerHTML = "Write an email");
    else if ((password === "") | (password === null))
      return (errorPassword.innerHTML = "Write an password");

    const user = {
      email: email,
      password: password,
    };

    fetch(`${API}/test`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Powered-By": "Express",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then((response) => {
        TOCKEN = response.tocken;
        return response;
      })
      .catch((err) => console.log(err));

    console.log(user);
  });
});
