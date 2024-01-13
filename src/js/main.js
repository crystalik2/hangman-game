import "../css/style.css";
import { darkModeHandle } from "./utils";
import { startGame } from "./game";

darkModeHandle();

const startGameButton = document.getElementById("start_game");
startGameButton.addEventListener("click", startGame);
