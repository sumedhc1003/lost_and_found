// show tabs
function showTab(tabName) {
  // Hide all tab contents
  var tabContents = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }

  // Deactivate all tabs
  var tabs = document.getElementsByClassName('tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }

  // Show selected tab content and activate the tab
  document.getElementById(tabName + 'Items').classList.add('active');
  event.currentTarget.classList.add('active');
}

// add items
window.onload = function() {
  var addItemButtons = document.getElementsByClassName('add-item-button');
  for (var i = 0; i < addItemButtons.length; i++) {
    addItemButtons[i].addEventListener('click', addNewItem);
  }
};

function addNewItem(event) {
  console.log("addNewItem function called");
  
  var gridContainer = event.target.nextElementSibling;
  if (!gridContainer.classList.contains('grid-container')) {
    gridContainer = gridContainer.nextElementSibling;
  }

  // Create a new card element
  var newCard = document.createElement('div');
  newCard.classList.add('card');

  // Create the card content
  var cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  var cardTitle = document.createElement('h2');
  cardTitle.textContent = 'New Item';

  var cardDescription = document.createElement('p');
  cardDescription.textContent = 'This is a new item.';

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardDescription);

  newCard.appendChild(cardContent);

  // Insert the new card into the grid container
  gridContainer.appendChild(newCard);
}
