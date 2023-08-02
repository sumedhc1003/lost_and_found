const openBtn1 = document.getElementById('openOverlay1');
const openBtn2 = document.getElementById('openOverlay2');
const closeBtn = document.getElementById('closeOverlay');
const overlay = document.getElementById('overlay');

openBtn1.addEventListener('click', function() {
  overlay.style.display = 'block';
});

openBtn2.addEventListener('click', function() {
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  overlay.style.display = 'none';
});
