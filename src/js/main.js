import '../css/style.css';
import { darkModeHandle, chooseDifficulty } from './utils';
import { startGame } from './game';

darkModeHandle();
chooseDifficulty();

const startGameButton = document.getElementById('start_game');
startGameButton.addEventListener('click', startGame);
