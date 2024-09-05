let elUsersList = document.querySelector(".users-list");
// get info from api
function getRequest() {
  axios.get("https://dummyjson.com/products").then((res) => {
    res.data.products.map((item) => {
      let elItem = document.createElement("li");
      elItem.className = "w-[240px]  rounded-[30px] bg-blue-200 p-3";
      elItem.innerHTML = `
         <img src="${item.images[0]}" class="object-contain h-[200px] bg-white rounded-[30px]" alt="product" width="95%" />
        <h2 class="text-center font-bold mb-5">${item.title}</h2>
        <p class="text-center line-clamp-3">${item.description}</p>
        <button onclick="handleSendMassage(${item.id})" class="bg-blue-400 text-white w-[95%] mt-5 py-2 rounded-[30px] font-semibold">Add product</button>`;
      elUsersList.appendChild(elItem);
    });
  });
}
getRequest();
// send info to tg
const token = "7443326573:AAHvKNbdo_4HYJhZLPlcZS6Q5FVVzrJ02T8";
const CHAT_ID = "-1002197796769";
const HTTP = `https://api.telegram.org/bot${token}/sendPhoto`;

function handleSendMassage(id) {
  axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
    let message = ` <b class="block text-center">Products info</b>\n`;
    message += `<b>Name: ${res.data.title}</b>\n`;
    message += `<b>Description: <b class="font-normal">${res.data.description}</b></b>\n`;

    axios.post(HTTP, {
      chat_id: CHAT_ID,
      photo: res.data.images[0],
      parse_mode: "html",
      caption: message,
    });
  });
}
