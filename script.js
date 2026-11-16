const questions = [
  { q: "Sayang aku gak? 🥺", sub: "Jawab jujur ya..." },
  { q: "Kangen aku gak?", sub: "Hayo ngaku..." },
  { q: "Mau temenin aku selamanya gak?", sub: "Ini terakhir, janji..." }
];
let questKe = 0;
let gaCount = 0;

const btnYa = document.getElementById('btnYa');
const btnGaPertama = document.getElementById('btnGaPertama');
btnYa.addEventListener('click', klikYa);
btnGaPertama.addEventListener('click', function () { klikGa(this); });

// GELEMBUNG YANG MUNCUL PAS KLIK GAK
const bubbleTexts = [
  "Eh kok gak? 🥺", "Jangan gitu dong 😭", "Plisss 🙏", "Yakin gak? 💔",
  "Aku sedih nih...", "Coba pikir lagi 🥹", "Jangan tinggalin aku", "Huhu 😢"
];
function munculinBubble() {
  const container = document.getElementById('bubbleContainer');
  // Munculin 4 gelembung sekaligus di posisi acak
  for (let i = 0; i < 4; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.innerText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    b.style.left = Math.random() * 70 + 5 + '%';
    b.style.top = Math.random() * 70 + 10 + '%';
    container.appendChild(b);
    setTimeout(() => b.remove(), 2500);
  }
}

function klikGa(btn) {
  btn.remove();
  gaCount++;
  munculinBubble(); // <-- GELEMBUNG MUNCUL DISINI

  const area = document.getElementById('btnArea');
  const baru = document.createElement('button');
  baru.className = 'btnGa';
  baru.innerText = ['GAK', 'GAK AH', 'ENGGAK', 'GAK MAU', 'YAKIN GAK?'][Math.floor(Math.random() * 5)];
  baru.style.left = Math.random() * 70 + '%';
  baru.style.top = Math.random() * 70 + 'px';
  baru.addEventListener('click', function () { klikGa(this); });
  area.appendChild(baru);
  document.getElementById('sub').innerText = 'Eh kok GAK sih? (' + gaCount + 'x nolak) 💔';
}

function klikYa() {
  questKe++;
  if (questKe < questions.length) {
    document.getElementById('pertanyaan').innerText = questions[questKe].q;
    document.getElementById('sub').innerText = questions[questKe].sub;
    document.querySelectorAll('.btnGa').forEach(b => b.remove());
  } else {
    // MASUK KE TAHAP INPUT TEXT
    document.getElementById('pertanyaan').innerText = "Kamu mau menua bersama ku kan? 👴👵";
    document.getElementById('sub').innerText = "Ketik jawaban kamu ya, gak boleh bohong...";
    document.getElementById('emojiArea').innerHTML = '<div style="font-size:70px">🥹</div>';
    document.getElementById('btnArea').style.display = 'none';
    document.getElementById('inputArea').style.display = 'block';
  }
}

// LOGIKA JAWABAN INPUT
document.getElementById('btnKirimJawaban').addEventListener('click', cekJawaban);
document.getElementById('jawabanInput').addEventListener('keypress', function (e) { if (e.key === 'Enter') cekJawaban(); });

function cekJawaban() {
  const input = document.getElementById('jawabanInput');
  const jawab = input.value.toLowerCase().trim();
  const pesan = document.getElementById('pesanError');
  const card = document.querySelector('.card');

  const kataLolos = ['iya', 'mau', 'banget', 'pengen', 'yess', 'yes', 'mauu', 'iya dong', 'tentu', 'pastinya', 'siap'];
  const kataGagal = ['gamau', 'gak', 'ga', 'nggak', 'kagak', 'ogah', 'males', 'tidak', 'no', 'enggak', 'emoh', 'nolak', 'tidak mau'];

  const lolos = kataLolos.some(k => jawab.includes(k));
  const gagal = kataGagal.some(k => jawab.includes(k));

  if (lolos && !gagal) {
    // LOLOS KE FINAL
    document.getElementById('pertanyaan').innerText = "YEEY! Makasih sayang 💍";
    document.getElementById('sub').innerText = "Kita menua bareng ya...";
    document.getElementById('emojiArea').innerHTML = '<div style="font-size:70px">😍</div>';
    document.getElementById('inputArea').style.display = 'none';
    document.getElementById('finalArea').style.display = 'block';
    munculinBubble();
  } else {
    // GAGAL - SURUH ULANG + HATI RETAK
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    document.getElementById('emojiArea').innerHTML = '<div class="broken-heart">💔</div>';
    pesan.innerText = "Huuu... 💔 Jawabannya gak boleh gitu, coba lagi ya... 🥺";
    input.value = '';
    input.placeholder = "Coba ketik 'mau' atau 'iya'...";
    munculinBubble();
  }
}

// PREVIEW PAP + KAMERA
document.getElementById('inputKamera').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = document.getElementById('previewPap');
      img.src = ev.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// HATI BETERBANGAN
setInterval(() => {
  const h = document.createElement('div');
  h.className = 'heart';
  h.innerText = ['💖', '💗', '💕', '❤️'][Math.floor(Math.random() * 4)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.animationDuration = (Math.random() * 2 + 3) + 's';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 800);