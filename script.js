const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';


let apiData = fetch(apiUrl).then(response => {
  if (!response) {
    throw new Error("Network response it not OK")
  }
  return response.json();
}).then(data => {
  menCategory(data.categories[0])
  womenCategory(data.categories[1])
  kidsCategory(data.categories[2])
  return data
}).catch(error => {
  console.error("Error: ", error);
})

function menCategory(menData) {

  productData = menData.category_products;

  let productList = document.querySelectorAll(`#${menData.category_name}>.card`);

  dataFitting(productData, productList);

}


function womenCategory(womenData) {

  productData = womenData.category_products;

  let productList = document.querySelectorAll(`#${womenData.category_name}>.card`);

  dataFitting(productData, productList);

}

function kidsCategory(kidsData) {

  productData = kidsData.category_products;

  let productList = document.querySelectorAll(`#${kidsData.category_name}>.card`);

  dataFitting(productData, productList);

}

function caculateDiscount(sellingPrice, originalPrice) {
  let discount = (((originalPrice - sellingPrice) / originalPrice) * 100).toString().split('.')[0];
  return discount + '%';
}

function dataFitting(productData, productList) {
  for (let i = 0; i < productList.length; i++) {
    const card = productList[i];

    let productImage = card.querySelector(".product-Image");
    productImage.setAttribute("src", `${productData[i].image}`)
    productImage.setAttribute("alt", `${productData[i].title}`)

    let badge = card.querySelector(".badge");
    if (!productData[i].badge_text) {
      badge.style.display = "none";
    }
    badge.innerHTML = productData[i].badge_text;

    let productName = card.querySelector(".product-Name");
    productName.innerHTML = productData[i].title;

    let companyName = card.querySelector(".product-Company");
    companyName.innerHTML = productData[i].vendor;

    let actualPrice = card.querySelector(".actual-Price");
    actualPrice.innerHTML = productData[i].price;

    let originalPrice = card.querySelector(".original-Price");
    originalPrice.innerHTML = productData[i].compare_at_price;

    let discount = card.querySelector(".discount");
    discount.innerHTML = caculateDiscount(productData[i].price, productData[i].compare_at_price);

  }
}

function showList(event, category) {

  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tablinks[i].style.backgroundColor = "#f2f2f2";
    tablinks[i].style.color = "#000000";
    tablinks[i].querySelector(".gender-icons").style.display = "none";

  }
  document.getElementById(category).style.display = "flex";

  setActiveStyles(event)

}

function setActiveStyles(event) {
  event.currentTarget.className += " active";
  event.currentTarget.style.backgroundColor = "#000000";
  event.currentTarget.style.color = "#ffffff";
  event.currentTarget.style.borderRadius = "4px";
  event.currentTarget.querySelector(".gender-icons").style.display = "flex";
}

function addToCart() {
  alert("Your Product is added")
}