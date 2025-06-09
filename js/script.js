let isAdmin = localStorage.getItem("isAdmin") === "true";

let makananList = JSON.parse(localStorage.getItem("makananList")) || [];
let minumanList = JSON.parse(localStorage.getItem("minumanList")) || [];
let camilanList = JSON.parse(localStorage.getItem("camilanList")) || [];

function renderAllTables() {
  renderTable("Makanan", makananList, "bodyMakanan", "headerMakanan");
  renderTable("Minuman", minumanList, "bodyMinuman", "headerMinuman");
  renderTable("Camilan", camilanList, "bodyCamilan", "headerCamilan");

  document.getElementById("logoutBtn").classList.toggle("hidden", !isAdmin);
}

function renderTable(type, dataList, tbodyId, headerId) {
  const tbody = document.getElementById(tbodyId);
  const table = tbody.closest("table");
  const thead = document.getElementById(headerId);

  // Toggle border class
  if (isAdmin) {
    table.classList.add("table-bordered");
    table.classList.remove("no-border");
  } else {
    table.classList.remove("table-bordered");
    table.classList.add("no-border");
    if (thead) thead.style.display = "none";
  }

  tbody.innerHTML = "";

  for (let i = 0; i < dataList.length; i += 2) {
    const tr = document.createElement("tr");

    for (let j = 0; j < 2; j++) {
      const item = dataList[i + j];
      if (item) {
        if (isAdmin) {
          tr.innerHTML += `
            <td contenteditable="true" oninput="updateItem('${type}', ${i + j}, 'nama', this.innerText)">${item.nama}</td>
            <td contenteditable="true" oninput="updateItem('${type}', ${i + j}, 'harga', this.innerText)">${item.harga}</td>
            <td><button class="btn-danger" onclick="hapusItem('${type}', ${i + j})">Hapus</button></td>
          `;
        } else {
          tr.innerHTML += `
            <td>${item.nama}</td>
            <td>${item.harga}</td>
            <td class="hidden"></td>
          `;
        }
      } else if (isAdmin) {
        tr.innerHTML += `<td contenteditable="false"></td><td contenteditable="false"></td><td></td>`;
      } else {
        tr.innerHTML += `<td></td><td></td><td class="hidden"></td>`;
      }
    }

    tbody.appendChild(tr);
  }

  // Baris input untuk tambah data baru (admin only)
  if (isAdmin) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 2; j++) {
      tr.innerHTML += `
        <td contenteditable="true" id="newNama-${type}-${j}" onblur="checkNewItem('${type}', ${j})"></td>
        <td contenteditable="true" id="newHarga-${type}-${j}" onblur="checkNewItem('${type}', ${j})"></td>
        <td></td>
      `;
    }
    tbody.appendChild(tr);
  }

  // Tampilkan/hidden kolom aksi
  const header1 = document.getElementById(`${headerId}1`);
  const header2 = document.getElementById(`${headerId}2`);
  const headerRow = document.querySelector(`#${headerId}Row`);

  if (header1) header1.classList.toggle("hidden", !isAdmin);
  if (header2) header2.classList.toggle("hidden", !isAdmin);
  if (headerRow) headerRow.style.display = isAdmin ? "" : "none";
}

function updateItem(type, index, field, value) {
  const list = getList(type);
  list[index][field] = value.trim();
  saveList(type, list);
}

function hapusItem(type, index) {
  const list = getList(type);
  list.splice(index, 1);
  saveList(type, list);
  renderAllTables();
}

function checkNewItem(type, index) {
  const nama = document.getElementById(`newNama-${type}-${index}`)?.innerText.trim();
  const harga = document.getElementById(`newHarga-${type}-${index}`)?.innerText.trim();
  if (nama && harga) {
    const list = getList(type);
    list.push({ nama, harga });
    saveList(type, list);
    renderAllTables();
  }
}

function getList(type) {
  if (type === "Makanan") return makananList;
  if (type === "Minuman") return minumanList;
  return camilanList;
}

function saveList(type, list) {
  if (type === "Makanan") makananList = list;
  if (type === "Minuman") minumanList = list;
  if (type === "Camilan") camilanList = list;

  localStorage.setItem("makananList", JSON.stringify(makananList));
  localStorage.setItem("minumanList", JSON.stringify(minumanList));
  localStorage.setItem("camilanList", JSON.stringify(camilanList));
}

function logout() {
  localStorage.removeItem("isAdmin");
  isAdmin = false;
  renderAllTables();
  checkLoginStatus();
  showLogoutToast();
}

function checkLoginStatus() {
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBtn = document.getElementById("loginBtn");

  const isLoggedIn = localStorage.getItem("isAdmin") === "true";
  logoutBtn.classList.toggle("hidden", !isLoggedIn);
  loginBtn.classList.toggle("hidden", isLoggedIn);

  if (isLoggedIn && !window.notifiedLogin) {
    showAdminToast();
    window.notifiedLogin = true;
  }
}

function showAdminToast() {
  const toast = document.getElementById("adminLoginToast");
  if (!toast) return;

  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 3000);
}

function showLogoutToast() {
  const toast = document.getElementById("adminLogoutToast");
  if (!toast) return;

  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 3000);
}


// Inisialisasi awal
checkLoginStatus();
renderAllTables();




const initCarousel = () => {
    const mainCourse = document.querySelector(".main-course-carousel");
    const drinks = document.querySelector(".drinks-carousel");
    const snacks = document.querySelector(".snacks-carousel");
  
    for (let i = 0; i < 5; i++) {
      const mainCourseCarousel = document
        .querySelector(".main-course-carousel-slide")
        .cloneNode(true);
      const drinksCarousel = document
        .querySelector(".drinks-carousel-slide")
        .cloneNode(true);
      const snacksCarousel = document
        .querySelector(".snacks-carousel-slide")
        .cloneNode(true);
  
      mainCourse.appendChild(mainCourseCarousel);
      drinks.appendChild(drinksCarousel);
      snacks.appendChild(snacksCarousel);
    }
  };
  
  initCarousel();
  
  // Form reservation
  const form = document.querySelector("#reservation-item-form");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const tableName = document.querySelector("#table_name").value;
    const tableSize = document.querySelector("#table_capacity").value;
    const date = document.querySelector("#order_date").value;
    const order = document.querySelector("#order").value;
  
    const orderText = `Halo, saya ingin reservasi meja untuk ${tableSize} orang, atas nama ${tableName} pada tanggal / waktu /${date}
    
    Order : 
    ${order || "*Pesan ditempat*"}
    `;
  
    window.location.replace(`https://wa.me/6281337229212?text=${orderText}`);
  });
  
  // Hamburger icon animation
  const hamburger = document.querySelector("#burger-navigation");
  const mobileNavigation = document.querySelector(".nav-mobile-main");
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNavigation.classList.toggle("menu-active");

    
  });

  