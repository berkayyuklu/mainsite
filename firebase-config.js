// ==========================================================
// FIREBASE YAPILANDIRMASI
// ==========================================================
// Aşağıdaki değerleri kendi Firebase projenizden alacaksınız:
// Firebase Console -> Project Settings -> General -> "Your apps" -> Web app
//
// Bu dosya public bir static sitede yayınlanacağı için apiKey'in
// "gizli" olması gerekmez (Firebase web apiKey'leri zaten istemci
// tarafında açık olacak şekilde tasarlanmıştır). Gerçek güvenlik,
// Firebase Authentication + (varsa) Firestore Security Rules ile sağlanır.
// ==========================================================

export const firebaseConfig = {
  apiKey: "BURAYA_API_KEY",
  authDomain: "BURAYA_PROJE_ID.firebaseapp.com",
  projectId: "BURAYA_PROJE_ID",
  storageBucket: "BURAYA_PROJE_ID.appspot.com",
  messagingSenderId: "BURAYA_SENDER_ID",
  appId: "BURAYA_APP_ID"
};
