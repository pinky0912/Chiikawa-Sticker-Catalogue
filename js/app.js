// 讀取 data/items.json 並建立圖鑑
async function init() {
  const res = await fetch('data/items.json');
  const items = await res.json();

  const gallery = document.getElementById('gallery');

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img loading="lazy" src="assets/images/${item.thumb}" alt="${item.name}">
      <h3>${item.id} · ${item.name}</h3>
      <small>${item.category || ''}</small>
    `;
    card.addEventListener('click', () => openModal(item));
    gallery.appendChild(card);
  });
}

function openModal(item) {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('modalImage').src = `assets/images/${item.image}`;
  document.getElementById('modalImage').alt = item.name;
  document.getElementById('modalTitle').textContent = `${item.id} · ${item.name}`;
  document.getElementById('modalDesc').textContent = item.description || '';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('modalImage').src = '';
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

init().catch(err => console.error(err));
