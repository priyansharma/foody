const BASE_URL = "http://localhost:5000";
const formValidation = (formType) => {
  let elements = document.querySelectorAll("input");
  for (let i = 0; i <= elements.length; i++) {
    if (i === elements.length) {
      if (formType === "signup") {
        createAccountHandler();
      } else {
        loginHandler();
      }
      break;
    }
    if (elements[i].value == "") {
      alert(`You Missed ${elements[i].name}`);
      elements[i].focus();
      break;
    }
  }
};

const createAccountHandler = async () => {
  try {
    let createUserID = document
      .getElementById("signup-Fname")
      ?.value?.substring(0, 2)
      .toUpperCase();
    var randomNumber = Math.floor(1000 + Math.random() * 9000);
    const createAccountRequest = {
      userID: createUserID + randomNumber,
      firstName: document.getElementById("signup-Fname").value,
      lastName: document.getElementById("signup-Lname").value,
      email: document.getElementById("signup-email").value,
      mobileNumber: document.getElementById("signup-phone").value,
      userPassword: document.getElementById("signup-password").value,
    };
    const getJson = await fetch(`${BASE_URL}/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createAccountRequest),
    });
    if (getJson.statusText === "OK") {
      alert("Your Account is created");
      window.location.href = "/login";
    }
  } catch (error) {
    console.log("Create Account Error", error);
  }
};

const loginHandler = async () => {
  try {
    const LOGIN_REQUEST = {
      email: document.getElementById("login-Email").value,
      password: document.getElementById("login-Password").value,
    };
    const getJson = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LOGIN_REQUEST),
    });
    let getData = await getJson.json();
    if (getData.code == 0) {
      localStorage.setItem('islogin', JSON.stringify(getData));
      window.location.href = '/';
    }else{
      alert(getData.message);
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};