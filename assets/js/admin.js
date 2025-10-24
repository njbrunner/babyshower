import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  collection,
  getDocs,
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

let attending = [];
let notAttending = [];

fetchGuests();

async function fetchGuests() {
  const querySnapshot = await getDocs(collection(db, "guests"));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    let guest = {
      firstName: data.firstName,
      lastName: data.lastName,
      willAttend: data.willAttend,
    };
    guest.willAttend ? addToAttendingList(guest) : addToNotAttendingList(guest);
  });

  renderCounts();
  renderTable();
  renderChart();
}

function addToAttendingList(guest) {
  attending.push(guest);
}

function addToNotAttendingList(guest) {
  notAttending.push(guest);
}

function renderCounts() {
  document.getElementById("attending-count").innerText = attending.length;
  document.getElementById("not-attending-count").innerText = notAttending.length;
}

function renderTable() {
  attending.forEach((guest) => {
    addGuestToTable(guest);
  });
  notAttending.forEach((guest) => {
    addGuestToTable(guest);
  });
}

function addGuestToTable(guest) {
  let tableBody = document.getElementById("table-body");
  const row = tableBody.insertRow();
  const firstCell = row.insertCell();
  firstCell.innerHTML = guest.firstName + " " + guest.lastName;
  const thirdCell = row.insertCell();
  thirdCell.innerHTML = guest.willAttend;
}

function renderChart() {
  const ctx = document.getElementById('rsvpChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Attending', 'Not Attending'],
      datasets: [{
        data: [attending.length, notAttending.length],
        backgroundColor: ['rgba(25, 135, 84, 0.7)', 'rgba(220, 53, 69, 0.7)'],
      }]
    },
  });
}
