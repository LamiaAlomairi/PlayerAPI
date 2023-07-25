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
