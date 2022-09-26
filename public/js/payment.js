window.addEventListener("load", () => {
  let getCartItems = sessionStorage.getItem("item");
  getCartItems = JSON.parse(getCartItems);
  const pricesList = [];
  let getHTMLcartItem = getCartItems.map((value) => {
    return `<div class="md:w-52 w-64 h-full bg-white shadow-lg rounded-2xl overflow-hidden border border-solid border-[#bbb] ml-4 lg:mb-4 md:mb-4 mb-4">
          <img src=${value.image} class="w-full" />
          <div class="flex justify-between items-center">
              <div class="mb-4 px-2">
                  <p class="text-sm font-semibold flex justify-between mt-1"> <span class="text-zinc-500 line-through"> 
                  &#8377; ${value.orgPrice}/- </span> </p>
                  <p class="text-lg font-extrabold">&#8377; ${value.price}/-</p>
                  <p class="text-md font-medium">${value.title}</p>
              </div>
          </div>
      </div>`;
  });
  let getHTMLpriceList = getCartItems.map((value) => {
    pricesList.push(value.price)
    return `<div><p class="flex justify-between mb-1 pb-1 border-b border-slate-300">
        <span class="text-lg">${value.title}</span>
        <span class="text-lg font-bold">&#8377; ${value.price}/-</span>
      </p><div>`;
  });
  let grandTotal = pricesList.reduce((acc, curr) => {
    return parseInt(acc) + parseInt(curr)
  })
  document.getElementById("grandTotal").innerHTML = `&#8377; ${grandTotal}/-`
  bindHTML(getHTMLcartItem, "cartItem");
  bindHTML(getHTMLpriceList, "priceList");
});

const bindHTML = (htmlString, parentId) => {
  for (let i = 0; i < htmlString.length; i++) {
    const DOM_PARSER = new DOMParser();
    const convertHTML = DOM_PARSER.parseFromString(htmlString[i], "text/html").body;
    document.getElementById(parentId).append(convertHTML.querySelector("div"));
  }
}