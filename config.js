// ============================================================
//  CONFIGURACIÓN DE FIREBASE — La Clase del Gamer
//  Mientras esto diga null, la app funciona igual, pero sin
//  "Nota de la comunidad" (cada usuario ve solo su propia nota).
//
//  Para activarla: reemplaza null por el bloque que te da Firebase
//  (Configuración del proyecto → Tus apps → Configuración del SDK → Config).
//  Debe quedar así (con TUS datos):
//
//  window.LCG_FIREBASE = {
//    apiKey: "AIza...",
//    authDomain: "tu-proyecto.firebaseapp.com",
//    projectId: "tu-proyecto",
//    storageBucket: "tu-proyecto.appspot.com",
//    messagingSenderId: "123456789",
//    appId: "1:123456789:web:abc123"
//  };
//
//  Estos datos NO son secretos: Firebase está hecho para que vayan en la app.
//  La seguridad la ponen las reglas (archivo firestore.rules).
// ============================================================
window.LCG_FIREBASE = {
  apiKey: "AIzaSyBlJSFiDMy4C_tXpC-M5ABZhkAIRjGkpcw",
  authDomain: "clase-del-gamer.firebaseapp.com",
  projectId: "clase-del-gamer",
  storageBucket: "clase-del-gamer.firebasestorage.app",
  messagingSenderId: "977213134367",
  appId: "1:977213134367:web:c24c5da4490b6c4622e72a"
};
