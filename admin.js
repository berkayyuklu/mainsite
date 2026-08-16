// ==========================================================
// Admin Girişi — Firebase Authentication (E-posta / Şifre)
// ==========================================================
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- DOM referansları ---------- */
const authView = document.getElementById("authView");
const dashboardView = document.getElementById("dashboardView");
const dashboardEmail = document.getElementById("dashboardEmail");
const authMessage = document.getElementById("authMessage");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const tabButtons = document.querySelectorAll(".tab-btn");
const logoutBtn = document.getElementById("logoutBtn");

/* ---------- Sekme geçişi (Giriş / Kayıt) ---------- */
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    clearMessage();

    const isLogin = btn.dataset.tab === "login";
    loginForm.hidden = !isLogin;
    registerForm.hidden = isLogin;
  });
});

/* ---------- Mesaj yardımcıları ---------- */
function showMessage(text, type) {
  authMessage.textContent = text;
  authMessage.classList.remove("is-error", "is-success");
  if (type) authMessage.classList.add(type);
}
function clearMessage() {
  authMessage.textContent = "";
  authMessage.classList.remove("is-error", "is-success");
}

/* ---------- Firebase hata mesajlarını Türkçeleştir ---------- */
function translateError(code) {
  const map = {
    "auth/invalid-email": "Geçersiz e-posta adresi.",
    "auth/user-not-found": "Bu e-postaya kayıtlı bir hesap bulunamadı.",
    "auth/wrong-password": "Şifre hatalı.",
    "auth/invalid-credential": "E-posta veya şifre hatalı.",
    "auth/email-already-in-use": "Bu e-posta ile zaten bir hesap var. Giriş yapmayı deneyin.",
    "auth/weak-password": "Şifre en az 6 karakter olmalı.",
    "auth/too-many-requests": "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin."
  };
  return map[code] || "Bir hata oluştu. Lütfen tekrar deneyin.";
}

/* ---------- Giriş Yap ---------- */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    showMessage(translateError(err.code), "is-error");
  }
});

/* ---------- Admin Kaydı Oluştur ---------- */
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();

  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showMessage("Admin hesabı oluşturuldu. Giriş yapılıyor…", "is-success");
  } catch (err) {
    showMessage(translateError(err.code), "is-error");
  }
});

/* ---------- Çıkış Yap ---------- */
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

/* ---------- Oturum durumu izleyici ---------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    authView.hidden = true;
    dashboardView.hidden = false;
    dashboardEmail.textContent = user.email + " olarak giriş yaptınız.";
  } else {
    authView.hidden = false;
    dashboardView.hidden = true;
  }
});
