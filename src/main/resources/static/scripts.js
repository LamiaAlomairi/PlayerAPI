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

