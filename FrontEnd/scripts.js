

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var dropName = "";
// Function to fetch data from the specified endpoint
async function fetchData() {
  try {
    const response = await fetch("http://localhost:4000/data/fetchData");
    const data = await response.json();
    console.log(data);
    displayFetchedData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display fetched data
function displayFetchedData(data) {
  const fetchedDataElement = document.getElementById("fetchedData");
  const dropdownContent = document.getElementById("myDropdown");

  console.log(dropName);

  console.log(typeof data);
  for (const [key, value] of Object.entries(data)) {
    if (value["name"] == dropName) {
      console.log("name is matched ");
      displayCryptoInfo(value);
    }
    console.log(`hello yaar =====>${key}: ${value["name"]}`);
  }

  function displayCryptoInfo(crypto) {
    const diff = parseInt(crypto["sell"]) - parseInt(crypto["buy"]);
    console.log("diffff",diff);
    const call = parseFloat((diff / parseInt(crypto["buy"])) * 100).toFixed(2);
    console.log("calllll",call);

    document.getElementById("cryptoLast").innerText =
      "₹ " + numberWithCommas(crypto["last"]);
    document.getElementById("cryptoBuy").innerText =
      "₹ " +
      numberWithCommas(crypto["buy"]) +
      "/ ₹ " +
      numberWithCommas(crypto["sell"]);
    document.getElementById("cryptoVolume").innerText = call + " %";
  }

  fetchedDataElement.textContent = JSON.stringify(data, null, 2);
}

// Function to populate dropdown items
function populateDropdown(data) {
  const dropdownContent = document.getElementById("myDropdown");

  data.forEach(function (coin) {
    const link = document.createElement("a");
    link.href = "#";
    link.className = "dropdown-item";
    link.textContent = coin.name;
    link.addEventListener("click", function () {
      handleSelection(coin.name);
      dropName = coin.name;
    });
    dropdownContent.appendChild(link);
  });
}

// Function to handle the selection
function handleSelection(selectedValue) {
  fetchData(); // Fetch data when a coin is selected
  changeButtonText(selectedValue);
  console.log(selectedValue);
}

// Function to change the dropdown button text
function changeButtonText(newText) {
  document.querySelector(".dropdown-button").textContent = newText;
}

// Function to toggle the display of the dropdown content
function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropdown-button")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

// Initial data for the dropdown (you can replace this with your fetched data)
const initialData = [
  { id: 1, name: "BTC/INR" },
  { id: 2, name: "XRP/INR" },
  { id: 3, name: "ETH/INR" },
  { id: 4, name: "TRX/INR" },
  { id: 5, name: "EOS/INR" },
  { id: 6, name: "ZIL/INR" },
  { id: 7, name: "BAT/INR" },
  { id: 8, name: "ZRX/INR" },
  { id: 9, name: "REQ/INR" },
  { id: 10, name: "NULS/INR" },
];

// Populate the dropdown initially with the initial data
populateDropdown(initialData);




