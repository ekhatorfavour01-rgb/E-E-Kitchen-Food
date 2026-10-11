const WHATSAPP_NUMBER = "+79006416993"; // <-- CHANGE THIS TO YOUR WHATSAPP NUMBER

// 1. CHAT LIST TO STORE SELECTED ITEMS
let chatList = [];

// 2. YOUR FULL MENU DATA
const menuCategories = [
  {
    category: "Soups",
    items: [
      {name: "Egusi Soup", description: "Melon seed soup. Served with any swallow.", image: "https://i.pinimg.com/control1/1200x/0f/5b/d2/0f5bd267d61559281921fe0c64bc56f5.jpg"},
      {name: "Ogbono Soup", description: "Wild mango seed draw soup. Thick and delicious.", image: "https://i.pinimg.com/1200x/5a/eb/6f/5aeb6fd5d1935713db1b137e33947623.jpg"},
      {name: "Afang Soup", description: "Vegetable soup from Cross River. Rich and tasty.", image: "https://i.pinimg.com/control1/1200x/3c/5a/4e/3c5a4ed89e99d359ff4baec4c1843474.jpg"},
      {name: "Banga Soup", description: "Palm nut soup. Edo/Delta special.", image: "https://i.pinimg.com/736x/54/b0/12/54b012ff6486c2bf8973699166894db2.jpg"},
      {name: "Pepper Soup", description: "Spicy catfish/goat meat pepper soup.", image: "https://i.pinimg.com/736x/1b/d9/4b/1bd94bb3acf919a94bc4d2738b5ff06e.jpg"}
    ]
  },
  {
    category: "Swallows",
    items: [
      {name: "Pounded Yam", description: "Smooth and soft. Served with any soup.", image: "https://i.pinimg.com/1200x/94/ff/8f/94ff8f9c5b437648957e36d31790c8d6.jpg"},
      {name: "Amala", description: "Yam flour swallow. Perfect with Ewedu and Gbegiri.", image: "https://i.pinimg.com/1200x/8a/60/42/8a6042f0638ef2767ae75feed2fa6718.jpg"},
      {name: "Eba", description: "Garri swallow. Classic.", image: "https://i.pinimg.com/236x/38/b4/18/38b41896c869bfacd0e2a6506209094a.jpg"},
      {name: "Fufu", description: "Cassava swallow.", image: "https://i.pinimg.com/736x/69/82/b2/6982b2182c6881592d98111d90d93d73.jpg"}
    ]
  },
  {
    category: "Rice Dishes",
    items: [
      {name: "Jollof Rice", description: "Party style jollof rice.", image: "https://i.pinimg.com/736x/37/82/a8/3782a8185660a88cceb45415634561a9.jpg"},
      {name: "Fried Rice", description: "Vegetable fried rice.", image: "https://i.pinimg.com/1200x/4c/c7/9f/4cc79f76b53e00505c9facf01811f952.jpg"},
      {name: "Coconut Rice", description: "Sweet and creamy coconut rice.", image: "https://i.pinimg.com/736x/ef/24/e1/ef24e199465de63fb79e6052a136e4ae.jpg"},
      {name: "Ofada Rice", description: "Local rice with Ayamase or stew.", image: "https://i.pinimg.com/736x/72/4b/42/724b42d4ccf21bfab8035172b1a59c63.jpg"}
    ]
  },
  {
    category: "Small Chops & Others",
    items: [
      {name: "Puff-puff", description: "Soft fried dough balls.", image: "https://i.pinimg.com/736x/40/53/87/4053875fbbd067c8ecde97c103c5bd98.jpg"},
      {name: "Akara", description: "Bean cakes. Fried to perfection.", image: "https://i.pinimg.com/736x/30/00/06/3000061bae9abc84b5cfb77f8b79e190.jpg"},
      {name: "Suya", description: "Spicy grilled meat skewers.", image: "https://i.pinimg.com/736x/f6/ee/0a/f6ee0a7eedaea903507aed732d97315c.jpg"}
    ]
  },
  {
    category: "Drinks",
    items: [
      {name: "Zobo", description: "Hibiscus drink. Iced and refreshing.", image: "https://i.pinimg.com/736x/69/fd/96/69fd9663c3c1abef4aaa7db95ec0bc8b.jpg"}
    ]
  }
];

// 3. RUN WHEN PAGE LOADS
document.addEventListener('DOMContentLoaded', function() {
  showMenu(); // SHOW MENU ON LOAD
  setupWhatsAppButton(); // SETUP WHATSAPP BUTTONS ON LOAD
});

// 4. FUNCTION: ADD TO CHAT
function addToChat(foodName, btn){
  if(!chatList.includes(foodName)){
    chatList.push(foodName);
    btn.innerText = "✓ Added to Chat";
    btn.style.background = "var(--gold)";
    btn.style.color = "var(--black)";
    showToast(`Added ${foodName} to chat`); // SHOW TOAST
    updateChatButton(); // UPDATE BUTTON COUNT
  } else {
    showToast(`You have already added ${foodName} to chat`); // SHOW TOAST IF DUPLICATE
  }
}

// 5. FUNCTION: SHOW TOAST NOTIFICATION - POPUP
function showToast(message){
  const old = document.getElementById('toast');
  if(old) old.remove();
  const toast = document.createElement('div');
  toast.id = 'toast'; // <-- THIS IS THE ID I CREATE WITH JS. NOT IN HTML
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed; bottom: 100px; right: 20px; background: var(--emerald); color: white;
    padding: 14px 22px; border-radius: 10px; font-weight: bold; z-index: 9999;
    animation: fadeUp 0.4s ease-out; box-shadow: 0 4px 15px rgba(4,106,56,0.4);
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500); // REMOVE AFTER 2.5 SECONDS
}

// 6. FUNCTION: UPDATE MAIN ORDER BUTTON TEXT
function updateChatButton(){
  const btn = document.getElementById('orderAllBtn');
  if(btn){
    btn.innerText = `🛒 Order All on WhatsApp (${chatList.length})`;
  }
}

// 7. FUNCTION: SETUP WHATSAPP BUTTONS
function setupWhatsAppButton(){
  // MAIN ORDER BUTTON
  const btn = document.getElementById('orderAllBtn');
  if(btn){
    btn.addEventListener('click', function(){
      if(chatList.length === 0){
        showToast("Please add at least 1 item to chat first");
        return;
      }
      let message = "Hi E&E Kitchen! I would like to order:\n\n";
      for(let i = 0; i < chatList.length; i++){
        message += `${i+1}. ${chatList[i]}\n`;
      }
      message += "\nPlease send me price and delivery details. Thank you!";
      const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    });
  }

  // UPDATED: FLOATING WHATSAPP LINK
  const floatBtn = document.getElementById('floatingWhatsapp');
  if(floatBtn){
    floatBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`; // <-- I ADDED THIS BACK
  }
}

// 8. FUNCTION: SHOW MENU - BUILDS ALL FOOD CARDS
function showMenu(itemsToShow = menuCategories){
  const menuDiv = document.getElementById('menuList'); // <-- TARGETS YOUR <div id="menuList">
  if(!menuDiv) return; // SAFETY CHECK

  let html = "";
  for(let i = 0; i < itemsToShow.length; i++){
    const cat = itemsToShow[i];
    html += `<h3 style="grid-column: 1 / -1; color: var(--gold); font-size: 28px; margin-top:20px;">${cat.category}</h3>`;
    for(let j = 0; j < cat.items.length; j++){
      const food = cat.items[j];
      html += `
        <div class="food-card">
          <img src="${food.image}" alt="${food.name}" loading="lazy">
          <div class="food-info">
            <h3>${food.name}</h3>
            <p>${food.description}</p>
            <p class="price-tag">Price: Call to Order</p>
            <button onclick="addToChat('${food.name}', this)" class="btn-whatsapp">Add to Chat</button>
          </div>
        </div>
      `;
    }
  }
  menuDiv.innerHTML = html; // PUT EVERYTHING INSIDE menuList
}

// 9. FUNCTION: SEARCH FOOD - FILTERS MENU
function searchFood(){
  const query = document.getElementById('searchInput').value.toLowerCase(); // <-- TARGETS YOUR <input id="searchInput">
  const filtered = menuCategories.map(category => {
    return {category: category.category, items: category.items.filter(food => food.name.toLowerCase().includes(query))}
  }).filter(category => category.items.length > 0);
  showMenu(filtered); // REBUILD MENU WITH FILTERED RESULTS
}

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', function(){
  navbar.classList.toggle('active');
});
