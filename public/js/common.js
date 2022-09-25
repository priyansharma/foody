const BASE_URL = "http://localhost:5000";
const getQueryString = new URLSearchParams(window.location.search);
const DOM_PARSER = new DOMParser();
const CART_ITEMS = [];
window.addEventListener("load", async () => {
  bindUserProfile();
  bindProducts();
});

const formValidation = (formType) => {
  let elements = document.querySelectorAll("input");
  for (let i = 0; i <= elements.length; i++) {
    if (i === elements.length) {
      if (formType === "signup") {
        createAccountHandler();
      } else if(formType === "payment"){
        paymentHandler();
      } else {
        loginHandler();
      }
      break;
    }
    if (elements[i].value == "") {
      alert(`You missed ${elements[i].name}`);
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
      localStorage.setItem("islogin", JSON.stringify(getData));
      window.location.href = "/";
    } else {
      alert(getData.message);
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

const paymentHandler = () => {
  alert("payment Hit")
}

const logoutHandler = () => {
  localStorage.clear();
  window.location.href = "/";
};

const bindUserProfile = async () => {
  const getUserId = getQueryString.get("user");
  if (getUserId) {
    const getJSON = await fetch(`${BASE_URL}/getprofile?userID=${getUserId}`);
    const getData = await getJSON.json();
    if (getData.code == 1 || getData.length <= 0) {
      document.getElementById("userName").innerHTML = `${getData.message}`;
    } else {
      document.getElementById(
        "userName"
      ).innerHTML = `${getData[0].firstName} ${getData[0].lastName}`;
      document.getElementById(
        "userEmail"
      ).innerHTML = `Email- ${getData[0].email}`;
      document.getElementById(
        "userPhone"
      ).innerHTML = `Phone- ${getData[0].mobileNumber}`;
    }
  }
};

const cartHandler = (event, id, price, orgPrice, title, image) => {
  event.setAttribute("disabled", "true");
  event.innerHTML = "Item Added";
  event.style.backgroundColor = "#bbb";
  ++document.getElementsByClassName("cartNumber")[0].innerHTML;
  let itemObject = {
    id: id,
    price: price,
    orgPrice: orgPrice,
    title: title,
    image: image,
  };
  CART_ITEMS.push(itemObject);
  sessionStorage.setItem("item", JSON.stringify(CART_ITEMS));
};

const validateCart = (element) => {
  if (element.children[1].innerHTML == 0) {
    alert("Please add at-least one item to cart");
    return;
  }
  element.setAttribute("href", "/cart");
};

const bindProducts = async () => {
  const getCategoryId = getQueryString.get("category");
  if (getCategoryId) {
    const getJson = await fetch(
      `${BASE_URL}/getproducts?categoryID=${getCategoryId}`
    );
    const getData = await getJson.json();
    if (getData && getData.length > 0) {
      const getHTML = getData.map((value) => {
        return `<div class="w-80 bg-white shadow-lg rounded-2xl overflow-hidden border border-solid border-[#bbb] md:m-8 mb-8">
          <img src=${value.image} class="w-full" />
          <div class="flex flex-col">
            <div class="mb-4 px-2">
              <p class="text-lg font-semibold flex justify-between"> <span class="text-zinc-600 line-through"> &#8377;${value.originalPrice}/- </span> <span class="text-[#FF5733]">Rating: ${value.rating}</span> </p>
              <p class="text-2xl font-extrabold mb-1">&#8377; ${value.price}/-</p>
              <p class="text-xl font-medium -mt-1">${value.title}</p>
            </div>
            <div class="text-right mx-5 mb-3">
              <button class="bg-black text-white rounded-full px-3 py-2 text-sm" onclick="cartHandler(this,'${value.productID}', '${value.price}', '${value.originalPrice}', '${value.title}', '${value.image}')">Add To Cart</button>
            </div>
          </div>
        </div>`;
      });
      for (let i = 0; i < getHTML.length; i++) {
        const convertHTML = DOM_PARSER.parseFromString(
          getHTML[i],
          "text/html"
        ).body;
        document.getElementById("productsList").append(convertHTML);
      }
    }
  }
};
