import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  addDoc,
  collection,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDThWHfN565ykMCxdcC2obFK3WV24MyDRs",
  authDomain: "brunner-baby-shower.firebaseapp.com",
  projectId: "brunner-baby-shower",
  storageBucket: "brunner-baby-shower.firebasestorage.app",
  messagingSenderId: "692984673922",
  appId: "1:692984673922:web:266e5316b0e82c0b02269b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function submitRSVP() {
  if (validate()) {
    try {
      await addDoc(collection(db, "guests"), getGuestRSVP());
      resetForm();
      createToast("RSVP submitted successfully!", "success");
    } catch (e) {
      console.error("Error adding document: ", e);
      createToast("There was an error submitting your RSVP.", "error");
    }
  }
}

function getGuestRSVP() {
  let guest = {};
  guest.firstName = document.getElementById("firstNameInput").value;
  guest.lastName = document.getElementById("lastNameInput").value;
  guest.willAttend =
    document.querySelector('input[name="rsvp-selection"]:checked').value ==
    "true"
      ? true
      : false;
  return guest;
}

function validate() {
  const forms = document.querySelectorAll(".needs-validation");
  let formValid = true;
  Array.from(forms).forEach((form) => {
    if (!form.checkValidity()) {
      formValid = false;
    }
    form.classList.add("was-validated");
  });
  return formValid;
}

function createToast(message, type) {
  let toastElement = document.getElementById("toast");
  let toastClass = type == "success" ? "toast-success" : "toast-error";
  toastElement.classList.add(toastClass);
  toastElement.querySelector(".toast-body").innerHTML = message;
  const toast = new bootstrap.Toast(toastElement, { autohide: false });
  toast.show();
}

function resetForm() {
  let formElement = document.getElementById("rsvpForm");
  formElement.reset();
  const forms = document.querySelectorAll(".was-validated");

  Array.from(forms).forEach((form) => {
    form.classList.remove("was-validated");
  });
}
