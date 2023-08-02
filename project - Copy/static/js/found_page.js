let items = []; // Declare the 'items' array in the global scope

/* Function to create a new card element based on item data */

function createCard(itemData) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Add data-item-id attribute to store the item ID in the card
    card.setAttribute("data-item-id", itemData.id);
  
    const Img = document.createElement("img");
    Img.src = itemData.image_url;
    Img.alt = itemData.title;

    card.appendChild(Img);
  
    return card;
  }

/* Function to show the overlay when a card is clicked */

function showOverlay(itemData) {

  const overlay = document.createElement("div");
  overlay.classList.add("overlay2");

  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay2-content");

  const overlayImg = document.createElement("img");
  overlayImg.src = itemData.image_url; 
  overlayImg.alt = itemData.title; // Set alt text for accessibility.

  const overlayTitle = document.createElement("h2");
  overlayTitle.textContent = itemData.title;

  const overlayDescription = document.createElement("p");
  overlayDescription.textContent = itemData.description;

  overlayContent.appendChild(overlayImg);
  overlayContent.appendChild(overlayTitle);
  overlayContent.appendChild(overlayDescription);

  overlay.appendChild(overlayContent);

  document.body.appendChild(overlay);

  console.log("all appendings done!!");

  // Close the overlay when clicked outside the content area
  overlay.addEventListener("click", (event) => {
    if (!overlayContent.contains(event.target)) {
      document.body.removeChild(overlay);
    }
  });
}

/* loading all the card on load or refresh */

document.addEventListener("DOMContentLoaded", () => {
  
    // Assuming 'itemsContainer' is the container where you want to add the cards.
    const itemsContainer = document.getElementById("items-container");
  
    // Function to append the new cards from the received data
    function appendCards(items) {
      items.forEach(itemData => {
        const newCard = createCard(itemData);
        itemsContainer.prepend(newCard);
      });
    }
  
    // Fetch all items from the server when the page loads
    fetch("/get_items")
      .then(response => response.json())
      .then(data => {

        // Store the fetched items in the 'items' variable
        items = data;

        // Append the cards for the retrieved items
        appendCards(data);
      })
      .catch(error => console.error("Error fetching items:", error));
  
  });
  



/* overlay on clicking new item button, submissions */

const addOverlay = document.getElementById("addOverlay");
const addItemForm = document.getElementById("addItemForm");
const closeAddOverlayBtn = document.getElementById("closeAddOverlay");
const addItemBtn = document.getElementById("addItemBtn");

// Function to show the "Add new item" overlay
function showAddOverlay() {
    addOverlay.style.display = "block";
}

// Function to hide the "Add new item" overlay
function hideAddOverlay() {
    addOverlay.style.display = "none";
    addItemForm.reset();
}

// Event listener for the "Add new item" button
addItemBtn.addEventListener("click", showAddOverlay);

// Event listener for the "Close" button in the "Add new item" overlay
closeAddOverlayBtn.addEventListener("click", hideAddOverlay);

// Assuming 'itemsContainer' is the container where you want to add the cards.
const itemsContainer = document.getElementById("items-container");


// Event listener for the form submission
addItemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the values from the form
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;


    // Create a new item object
    const newItem = {
        title: title,
        description: description,
    };

    // Call a function to add the new item to the database using Flask
    fetch("/add_item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(newItemData => {
        // Create a new card for the newly added item
        const newCard = createCard(newItemData);

        // Insert the new card at the top of the container
        itemsContainer.prepend(newCard);

        // Clear the form fields
        addItemForm.reset();

        // Hide the "Add new item" overlay
        hideAddOverlay();
    })
    .catch(error => console.error("Error adding item:", error));
});



/* overlay when cards are clicked */
itemsContainer.addEventListener("click", (event) => {

  const card = event.target.closest(".card");
  if (card) {
    // Get the item ID from the data-item-id attribute
    const itemId = parseInt(card.getAttribute("data-item-id"));

    // Find the item data from the 'items' array based on the item ID
    const itemData = items.find(item => item.id === itemId);

    if (itemData) {
      console.log("all good here!!!");
      showOverlay(itemData);
    } else {
      console.log("Item not found in items array.");
    }
  }
});
