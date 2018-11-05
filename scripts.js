var player_name;
var player_choice;
var npc_choice;
var possible_choices = ["rock", "paper", "scissors"];
localStorage.setItem("Total Games", 0);
localStorage.setItem("Total Wins", 0);
localStorage.setItem("Win Loss Ratio", 0);
var player_stats = {rock: 0, paper: 0, scissors: 0};
var browser_stats = {rock: 0, paper: 0, scissors: 0};
var stats_list = ["Total Games", "Total Wins", "Win Loss Ratio"];
var feedback_div = document.getElementById("feedback");


makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));
saveName();
throwChoice();
printStats();

document.getElementById("reset").addEventListener("click", function() {
  $("select").each(function() { this.selectedIndex = 0 });
});

// window.onbeforeunload = function() {
//   localStorage.removeItem("player_name");
//   return '';
// };

function printStats() {
  stats_list.forEach(element => {
    document.getElementById(element.toString()).innerHTML = element.toString()+": "+localStorage.getItem(element.toString());
  });

  var total_games = localStorage.getItem("Total Games");
  document.getElementById("player_stats").innerHTML = "Rock: "+((player_stats.rock/total_games)*100).toFixed(2)+"%; Paper: "+((player_stats.paper/total_games)*100).toFixed(2)+"%; Scissors: "+((player_stats.scissors/total_games)*100).toFixed(2)+"%";
  document.getElementById("browser_stats").innerHTML = "Rock: "+((browser_stats.rock/total_games)*100).toFixed(2)+"%; Paper: "+((browser_stats.paper/total_games)*100).toFixed(2)+"%; Scissors: "+((browser_stats.scissors/total_games)*100).toFixed(2)+"%";
}

function throwChoice() {
  throw_button = document.getElementById("throw_choice_button");
  value_dropdown = document.getElementById("dropdown");
  winner_text = document.getElementById("winner");
  player_text =document.getElementById("player");
  npc_text= document.getElementById("npc");
  var winner;
    
  throw_button.addEventListener("click", function() {
    localStorage.setItem("Total Games", parseInt(localStorage.getItem('Total Games'))+1);
    player_choice =  value_dropdown.options[value_dropdown.selectedIndex].value;
    npc_choice = Math.floor(Math.random() * 3)+1;

    if (player_choice == 0) {
      feedback.innerHTML = "Enter either rock, paper, scissors to throw";
      feedback.classList.add("negative");
      feedback.classList.remove("positive");
    } else {
      feedback.innerHTML = "Successfully threw choice";
      feedback.classList.add("positive");
      feedback.classList.remove("negative");
      player_stats[possible_choices[player_choice-1]]+=1;
      browser_stats[possible_choices[npc_choice-1]]+=1;

      $("#player_image").attr("src", "imgs/player_"+possible_choices[player_choice-1]+".png");
      $("#npc_image").attr("src", "imgs/npc_"+possible_choices[npc_choice-1]+".jpeg");

      if (player_choice == npc_choice) {
        winner = "Tie";
      } else if ((player_choice == 1 && npc_choice == 3) || player_choice > npc_choice) {
        winner = player_name;
        localStorage.setItem("Total Wins", parseInt(localStorage.getItem('Total Wins'))+1);
        localStorage.setItem("Win Loss Ratio", parseFloat(localStorage.getItem('Total Wins')/(localStorage.getItem('Total Games')-localStorage.getItem("Total Wins"))).toFixed(4));
      } else {
        winner = "Computer";
      }

      changeVisibility("game_results", "hidden");
      winner_text.innerHTML = "The winner is "+winner+ "!";
      player_text.innerHTML = "You threw "+possible_choices[player_choice-1]+ "!";
      npc_text.innerHTML = "The computer threw "+possible_choices[npc_choice-1]+ "!";
      printStats();
    }
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

  submit_name_button.addEventListener("click", function() {
    var input = document.getElementById("name").value;
    if (input == "") {
      feedback.innerHTML = "Please enter name to proceed!";
      feedback.classList.add("negative");
      feedback.classList.remove("positive");
    } else {
      localStorage.setItem("player_name", input);
      console.log(player_name);
      changeVisibility("enter_name", "visible");
      changeVisibility("throw_choice", "hidden");
      player_name = localStorage.getItem('player_name');
      updateMessage("game_header", "Play the Game "+ player_name+ "!");
      feedback.innerHTML = "Name successfully saved!";
      feedback.classList.add("positive");
      feedback.classList.remove("negative");
    } 
  });

  if(!player_name){
    changeVisibility("enter_name", "hidden");
    console.log("Name not entered yet!");
    feedback.innerHTML = "Please enter your name!";
    feedback.classList.add("negative");
    feedback.classList.remove("positive");
  } else{
    updateMessage("game_header", "Play the Game "+ player_name+ "!");
    changeVisibility("enter_name", "visible");
    changeVisibility("throw_choice", "hidden");
  }
}

function changeVisibility(idName, starting) {
  if (starting == "visible") {
    document.getElementById(idName).classList.remove("visible");
    document.getElementById(idName).classList.add("hidden");
  } else {
    document.getElementById(idName).classList.remove("hidden");
    document.getElementById(idName).classList.add("visible");
  }
}
