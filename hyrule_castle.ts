const readline = require('readline-sync'); //importation du modul qui permet de lire les fichiers .json
import { MyPlayer, Enemies, Boss } from './json'; //importation des fonctions depuis le fichier .json

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length); //Generer un chiffre aleatoire entre 0 et la langeur du tableau
  return array[randomIndex];
}

const myPlayer = getRandomElement(MyPlayer());
let enemy = getRandomElement(Enemies());
const Bossenemy = getRandomElement(Boss());

function displayHPBar(entity) { 
  const barLength = 20; // Longueur de la barre
  const ratio = entity.hp / entity.max_hp; 
  const bar = '='.repeat(Math.ceil(barLength * ratio)) + ' '.repeat(Math.floor(barLength * (1 - ratio)));
  return `[${bar}] ${entity.hp}/${entity.max_hp}`;
}

function Attack(attacker, cible) {
  const damage = attacker.str;   // Calcul des degats
  cible.hp -= damage;// Soustraire les degats aux HP
  console.log(`${attacker.name} attacks ${cible.name} for ${damage} damage!`);
}

function Heal(player) {
  const healing = player.max_hp / 2; // calcul des hp a rajouter
  player.hp = Math.min(player.max_hp, player.hp + healing); // ajout des hp
  console.log(`${player.name} heals for ${healing} HP.`);
}

function greenText(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function redText(text) {
  return `\x1b[31m${text}\x1b[0m`;
}

function blueText(text) {
  return `\x1b[34m${text}\x1b[0m`;
}

let floor = 1; 

function game() {
  console.log('Welcome Player');

  while (floor <= 10) // boucle principale 
  { 
    console.log(blueText(`======== Floor ${floor} ========`)); // afficher le floor actuel
    while (enemy.hp > 0 && myPlayer.hp > 0) {
      console.log(`${myPlayer.name}: HP ${displayHPBar(myPlayer)} | STR ${myPlayer.str}`); // afficher l'etat du player
      console.log(`${enemy.name}: HP ${displayHPBar(enemy)} | STR ${enemy.str}`); // afficher l'etat de l'ennemi

      const action = readline.question("Choose your action (1-Attack/2-Heal): ").toLowerCase(); // inviter l'utilisateur a  entrer une reponse.

      if (action === "1" || action === "attack") {
        Attack(myPlayer, enemy);// le player attaque l'ennemi'
        if (enemy.hp <= 0) {
          console.log(greenText(`${enemy.name} is defeated! 🎉`)); 
        } else {
          Attack(enemy, myPlayer); // l'ennemi attaque le player
        }
      } else if (action === "2" || action === "heal") {
        Heal(myPlayer); // la fonction Heal s'applique sur Myplayer
        Attack(enemy, myPlayer); // l'ennemi attaque le player
      }
    }

    if (myPlayer.hp <= 0) {
      console.log(redText('Game Over. You have been defeated.')); // afficher le message de defaite
      return;
    }

    if (enemy.hp <= 0 && floor !== 10) {
      console.log("");
      console.log('Proceeding to the next floor...');
      floor++; // incrementation pour passer a l'etage suivant
      enemy = getRandomElement(Enemies()); // generer un autre ennemi aleatoirememnt
    }
    if (floor === 10 && enemy.hp > 0) {
      console.log(redText('This is the final floor. The Boss awaits!🔥🔥'));
      enemy = Bossenemy; // Assigner le Bossenemy a la variable enemy
    }
    if (floor === 10 && enemy.hp <= 0) {// afficher le message de victoire en battant le boss
      console.log(greenText('🎉 Congratulations! You have defeated The Boss and won the game! 🎉'));
      return;
    }
  }
}
let option = ['Start Game'];
let choice = readline.keyInSelect(option, 'Bonjour, Faites votre choix:'); // creer un menu interactif

if (choice === 0) { // index 0 ('Start Game')
  game();
} else {
  console.log('Au revoir');
}
