// 初始化：載入資料、建立貼紙卡片
async function init() {
  try {
    const res = await fetch('./data/items.json');
    if (!res.ok) throw new Error('無法載入 data/items.json');
    const items = await res.json();

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // 清空畫面

    // 若資料為空
    if (!items.length) {
      gallery.innerHTML = '<p style="text-align:center;color:#777;">目前沒有貼紙資料喔！</p>';
      return;
    }

    // 建立貼紙卡片
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

    console.log('✅ 貼紙載入完成，共 ' + items.length + ' 張');
  } catch (err) {
    console.error('❌ 載入資料時發生錯誤：', err);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<p style="color:red;">載入資料失敗，請檢查 data/items.json 路徑或格式。</p>';
  }
}

// 打開詳細彈窗
function openModal(item) {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'false');

  document.getElementById('modalImage').src = `assets/images/${item.image}`;
  document.getElementById('modalImage').alt = item.name;
  document.getElementById('modalTitle').textContent = `${item.id} · ${item.name}`;

  // 如果 description 是網址，轉成可點擊連結
  let descHTML = '';
  if (item.description) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    descHTML = item.description.replace(urlPattern, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }
  document.getElementById('modalDesc').innerHTML = descHTML || '(無說明)';
}

// 關閉彈窗
function closeModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('modalImage').src = '';
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

init();
