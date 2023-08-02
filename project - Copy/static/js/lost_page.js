// Function to create a new card element based on item data

// Assuming 'itemsContainer' is the container where you want to add the cards.
const itemsContainer = document.getElementById("items-container");

function createCard(itemData) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    const titleElement = document.createElement("h3");
    titleElement.textContent = itemData.title;
  
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = itemData.description;
  
    
    card.appendChild(titleElement);
    card.appendChild(descriptionElement);
  
    return card;
  }

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
    fetch("/get_all_items")
      .then(response => response.json())
      .then(data => {
        // Append the cards for the retrieved items
        appendCards(data);
      })
      .catch(error => console.error("Error fetching items:", error));
  
  });

