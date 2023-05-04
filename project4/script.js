import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSetting = {
  databaseURL:
    "https://play-43047-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const clear = function (input) {
  return (input.value = "");
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListinDB = ref(database, "shoppingList");
const shoppingList = document.getElementById("shopping-list");

const btn = document.querySelector(".btn-cart");
const input = document.querySelector(".input-");
btn.addEventListener("click", () => {
  const inputValue = input.value;
  push(shoppingListinDB, inputValue);
  // appendingValues(inputValue);
  // input.value = "";
  clear(input);
  console.log(`${inputValue} is added to the database`);
});
/*
Challenge:
Call the onValue function with
shoppingListInDB as the first argument and
function(snapshot) {} as the second argument
*/
onValue(shoppingListinDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    shoppingList.innerHTML = "";
    for (let i = 0; i < itemsArray.length; i++) {
      // Challenge: Make two let variables:
      // currentItemID and currentItemValue and use currentItem to set both of
      // them equal to the correct values.
      let [currentItemID, currentItemValue] = itemsArray[i];
      appendItemToShoppingListEl(currentItemValue, currentItemID);
    }
  } else {
    shoppingList.innerHTML = "no more item exits";
  }
  // let arrayShopping = Object.values(snapshot.val());
});

function appendItemToShoppingListEl(inputValue, inputID) {
  let newEl = document.createElement("li");
  newEl.textContent = inputValue;
  // Challenge: Attach an event listener to newEl and make it so you console log the id of the item when it's pressed.
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${inputID}`);
    remove(exactLocationOfItemInDB);
  });
  shoppingList.append(newEl);
}

/*Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref
(database, something) where you substitute something with the code that will give you the 
exact location of the item in question.

*/
