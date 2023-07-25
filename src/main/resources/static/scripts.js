/* Get All */
function showAllPlayers() {
  var detailsDiv = document.getElementById("details");
  fetch("http://localhost:8080/api/player")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to fetch player details");
    })
    .then((players) => {
      var playersHtml = "<table><tr><th>ID</th><th>Name</th><th>Email</th></tr><tbody>";

      players.forEach((player) => {
        playersHtml += "<tr><td>" + player.id + "</td><td>" + player.name + "</td><td>" + player.email + "</td></tr>";
      });

      playersHtml += "</tbody></table>";

      detailsDiv.innerHTML = "<h2>Show All Players</h2>" + playersHtml;
    })
    .catch((error) => {
      console.error("Error:", error);
      detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to fetch player details.</p>";
    });
}

/***********************************************************************************************************************/
/* Post new */
function addNewPlayer() {
  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Add New Player</h2><form id='addPlayerForm'>" +
    "<label for='name'>Name:</label> <input type='text' id='name' name='name' required><br><br>" +
    "<label for='email'>Email:</label><input type='email' id='email' name='email' required><br><br>" +
    "<button type='submit'>Submit</button></form>";

  var addPlayerForm = document.getElementById("addPlayerForm");
  addPlayerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var nameInput = document.getElementById("name").value;
    var emailInput = document.getElementById("email").value;

    var newPlayer = {
      name: nameInput,
      email: emailInput
    };

    // Fetch all existing player emails from the server
    fetch("http://localhost:8080/api/player")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch player emails");
        }
        return response.json();
      })
      .then((players) => {
        // Check if the new player's email already exists in the database
        if (players.some(player => player.email === newPlayer.email)) {
          throw new Error("Player with this email already exists");
        } else {
          // If email doesn't exist, proceed with adding the new player
          return fetch("http://localhost:8080/api/player", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayer)
          });
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save player. Please check the name and email fields.");
        }
        // No need to parse JSON data, just proceed with showing the success alert
        alert("Player added successfully!");
        // Reset the form to clear the textboxes
        addPlayerForm.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show an alert with the error message
        alert(error.message);
      });
  });
}


/***********************************************************************************************************************/
/* Put Player by id */
function updatePlayerDetails() {
  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Update Player Details</h2><form id='updatePlayerForm'>" +
    "<label for='playerId'>Player ID:</label> <input type='text' id='playerId' name='playerId' required><br><br>" +
    "<button type='submit'>Get Details</button></form>";
    
  var updatePlayerForm = document.getElementById("updatePlayerForm");
  updatePlayerForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var playerIdInput = document.getElementById("playerId");
    var playerId = playerIdInput.value;

    fetch("http://localhost:8080/api/player/" + playerId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch player details");
        }
      })
      .then((player) => {
        showPlayerDetailsForm(player);
      })
      .catch((error) => {
        console.error("Error:", error);
        detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to fetch player details.</p>";
      });
  });
}

function showPlayerDetailsForm(player) {
  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Update Player Details</h2><form id='updateForm'>" +
    "<input type='hidden' id='playerId' name='playerId' value='" + player.id + "'>" +
    "<label for='name'>Name:</label> <input type='text' id='name' name='name' value='" + player.name + "' required><br><br>" +
    "<label for='email'>Email:</label> <input type='email' id='email' name='email' value='" + player.email + "' required><br><br>" +
    "<button type='submit'>Update</button></form>";

  var updateForm = document.getElementById("updateForm");
  updateForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var playerIdInput = document.getElementById("playerId");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");

    var updatedPlayer = {
      id: playerIdInput.value,
      name: nameInput.value,
      email: emailInput.value
    };

    fetch("http://localhost:8080/api/player/" + playerIdInput.value, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPlayer)
    })
    .then((response) => {
      if (response.ok) {
        alert("Player details updated successfully!");
        updatePlayerDetails();
      } else {
        throw new Error("Failed to update player details");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to update player details.</p>";
    });
  });
}



/***********************************************************************************************************************/

/* Delete Player by id */
function deletePlayer() {
  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Delete Player</h2><form id='deletePlayerForm'>" +
    "<label for='playerIdInput'>Player ID:</label><br>" +
    "<input type='text' id='playerIdInput' name='playerIdInput' required onclick='getPlayerIds()'><br><br>" +
    "<button type='button' onclick='deletePlayerById()'>Delete</button></form>";
}

function getPlayerIds() {
  fetch("http://localhost:8080/api/player") // Assuming this endpoint returns an array of player objects
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch player IDs");
      }
    })
    .then((players) => {
      var playerIdInput = document.getElementById("playerIdInput");
      playerIdInput.setAttribute("list", "playerIdsList");

      var datalist = document.createElement("datalist");
      datalist.id = "playerIdsList";

      players.forEach((player) => {
        var option = document.createElement("option");
        option.value = player.id;
        datalist.appendChild(option);
      });

      var form = document.getElementById("deletePlayerForm");
      form.appendChild(datalist);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deletePlayerById() {
  var playerIdInput = document.getElementById("playerIdInput");
  var playerId = playerIdInput.value;

  var detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = "<h2>Deleting Player...</h2>";

  fetch("http://localhost:8080/api/player/" + playerId, {
    method: "DELETE"
  })
    .then((response) => {
      if (response.ok) {
        alert("Player with ID " + playerId + " has been deleted.");
        playerIdInput.value = ""; // Clear the input textbox after successful deletion
        deletePlayer(); // Re-render the form after successful deletion
      } else {
        throw new Error("Failed to delete player");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      detailsDiv.innerHTML = "<h2>Error</h2><p>Failed to delete player.</p>";
    });
}
