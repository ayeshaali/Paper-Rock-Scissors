printStats();

function printStats() {
  var player_obj = JSON.parse(localStorage.getItem("player"));
  var npc_obj = JSON.parse(localStorage.getItem("npc"));

  document.getElementById("Total Games").innerHTML = "Total Games: "+player_obj["Total Games"];
  document.getElementById("Total Wins").innerHTML = "Total Wins: "+player_obj["Total Wins"];
  document.getElementById("Win Loss Ratio").innerHTML = "Win Loss Ratio: "+parseFloat((player_obj["Win Loss Ratio"]).toFixed(2));
  document.getElementById("player_stats").innerHTML = "Rock: "+player_obj["rock"]+"% Paper: "+player_obj["paper"]+"% Scissors: "+player_obj["scissors"];
  document.getElementById("browser_stats").innerHTML = "Rock: "+npc_obj["rock"]+"% Paper: "+npc_obj["paper"]+"% Scissors: "+npc_obj["scissors"];

}
