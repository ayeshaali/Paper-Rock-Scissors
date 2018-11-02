makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));
saveName();
throwChoice();
var player_name;
var player_choice;
var npc_choice;

function throwChoice() {
  throw_button = document.getElementById("throw_choice_button");
  throw_button = document.getElementById("throw_choice_button");
  value_dropdown = document.getElementById("dropdown");
  throw_button.addEventListener("click", function() {
    player_choice =  value_dropdown.options[value_dropdown.selectedIndex].value;
    npc_choice = Math.floor(Math.random() * 3)+1;
    console.log(npc_choice);
    var winner;
    if (player_choice == npc_choice) {
      winner = "Tie";
    } else if ((player_choice == 1 && npc_choice == 3) || player_choice > npc_choice) {
      winner = player_name;
    } else {
      winner = "Computer";
    }
    console.log(winner);
  });
}

function makeToggable(button_element, div_element) {
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}

function updateMessage(text_element, message) {
  document.getElementById(text_element).textContent = message;
}

function saveName() {
  var submit_name_button=document.getElementById("submit_name");
  player_name = localStorage.getItem('player_name');

  console.log(player_name);

  submit_name_button.addEventListener("click", function(){
    var input = document.getElementById("name").value;
    player_name = localStorage.setItem("player_name", input);
    console.log(player_name);
    document.getElementById("enter_name").classList.remove("visible");
    document.getElementById("enter_name").classList.add("hidden");
    document.getElementById("throw_choice").classList.remove("hidden");
    document.getElementById("throw_choice").classList.add("visible");
    player_name = localStorage.getItem('player_name');
    updateMessage("game_header", "Play the Game "+ player_name);

  });

  if(!player_name){
    document.getElementById("enter_name").classList.remove("hidden");
    document.getElementById("enter_name").classList.add("visible");
    console.log("Name not entered yet!")
  } else{
    updateMessage("game_header", "Play the Game "+ player_name);
    document.getElementById("enter_name").classList.remove("visible");
    document.getElementById("enter_name").classList.add("hidden");
    document.getElementById("throw_choice").classList.remove("hidden");
    document.getElementById("throw_choice").classList.add("visible");
  }
}
