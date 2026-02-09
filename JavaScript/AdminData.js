import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore, doc, setDoc, onSnapshot} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuyjDSlEMVdYepyCUVNu2_8AfcmH-uU9E",
    authDomain: "mywebadmin-e7995.firebaseapp.com",
    projectId: "mywebadmin-e7995",
    storageBucket: "mywebadmin-e7995.firebasestorage.app",
    messagingSenderId: "71391515039",
    appId: "1:71391515039:web:363a0e8e0009512673edaa",
    measurementId: "G-NC878C2C8K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.login = async function() {
    const email = document.getElementById('adminEmail').value;
    const pass = document.getElementById('adminPassword').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};

window.logout = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
    const loginUI = document.getElementById('login-container');
    const adminUI = document.getElementById('admin-content');

    if (user) {
        if (loginUI) loginUI.style.display = "none";
        if (adminUI) adminUI.style.display = "flex";
        loadNotepad();
    } else {
        if (loginUI) loginUI.style.display = "flex";
        if (adminUI) adminUI.style.display = "none";
    }
});

function loadNotepad() {
    const inputField = document.getElementById('textInput');
    onSnapshot(doc(db, "content", "siteText"), (docSnap) => {
        if (docSnap.exists() && inputField) {
            inputField.value = docSnap.data().message;
        }
    });
}

window.updateData = async function() {
    const newText = document.getElementById('textInput').value;
    await setDoc(doc(db, "content", "siteText"), { message: newText });
    alert("Saved!");
};

//for toggle menu
window.toggleMenu = function() {
    const dropdown = document.getElementById("navDropdown");
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
};
window.changeLanguage = function(lang) {
    console.log("Language changed to: " + lang);
};

//save status
window.updateData = async function() {
    const newText = document.getElementById('textInput').value;
    const status = document.getElementById('save-status');
    try {
        await setDoc(doc(db, "content", "siteText"), { message: newText });
        status.style.opacity = "1";
        setTimeout(() => {
            status.style.opacity = "0";
        }, 2000);
    } catch (error) {
        console.error("Save failed: ", error);
        status.innerText = "Error!";
        status.style.color = "red";
        status.style.opacity = "1";
    }
};
