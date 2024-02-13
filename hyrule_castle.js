"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline-sync'); //importation du modul qui permet de lire les fichiers .json
var json_1 = require("./json"); //importation des fonctions depuis le fichier .json
function getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length); //Generer un chiffre aleatoire entre 0 et la langeur du tableau
    return array[randomIndex];
}
var myPlayer = getRandomElement((0, json_1.MyPlayer)());
var enemy = getRandomElement((0, json_1.Enemies)());
var Bossenemy = getRandomElement((0, json_1.Boss)());
function displayHPBar(entity) {
    var barLength = 20; // Longueur de la barre
    var ratio = entity.hp / entity.max_hp;
    var bar = '='.repeat(Math.ceil(barLength * ratio)) + ' '.repeat(Math.floor(barLength * (1 - ratio)));
    return "[".concat(bar, "] ").concat(entity.hp, "/").concat(entity.max_hp);
}
function Attack(attacker, cible) {
    var damage = attacker.str; // Calcul des degats
    cible.hp -= damage; // Soustraire les degats aux HP
    console.log("".concat(attacker.name, " attacks ").concat(cible.name, " for ").concat(damage, " damage!"));
}
function Heal(player) {
    var healing = player.max_hp / 2; // calcul des hp a rajouter
    player.hp = Math.min(player.max_hp, player.hp + healing); // ajout des hp
    console.log("".concat(player.name, " heals for ").concat(healing, " HP."));
}
function greenText(text) {
    return "\u001B[32m".concat(text, "\u001B[0m");
}
function redText(text) {
    return "\u001B[31m".concat(text, "\u001B[0m");
}
function blueText(text) {
    return "\u001B[34m".concat(text, "\u001B[0m");
}
var floor = 1;
function game() {
    console.log('Welcome Player');
    while (floor <= 10) // boucle principale 
     {
        console.log(blueText("======== Floor ".concat(floor, " ========"))); // afficher le floor actuel
        while (enemy.hp > 0 && myPlayer.hp > 0) {
            console.log("".concat(myPlayer.name, ": HP ").concat(displayHPBar(myPlayer), " | STR ").concat(myPlayer.str)); // afficher l'etat du player
            console.log("".concat(enemy.name, ": HP ").concat(displayHPBar(enemy), " | STR ").concat(enemy.str)); // afficher l'etat de l'ennemi
            var action = readline.question("Choose your action (1-Attack/2-Heal): ").toLowerCase(); // inviter l'utilisateur a  entrer une reponse.
            if (action === "1" || action === "attack") {
                Attack(myPlayer, enemy); // le player attaque l'ennemi'
                if (enemy.hp <= 0) {
                    console.log(greenText("".concat(enemy.name, " is defeated! \uD83C\uDF89")));
                }
                else {
                    Attack(enemy, myPlayer); // l'ennemi attaque le player
                }
            }
            else if (action === "2" || action === "heal") {
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
            enemy = getRandomElement((0, json_1.Enemies)()); // generer un autre ennemi aleatoirememnt
        }
        if (floor === 10 && enemy.hp > 0) {
            console.log(redText('This is the final floor. The Boss awaits!🔥🔥'));
            enemy = Bossenemy; // Assigner le Bossenemy a la variable enemy
        }
        if (floor === 10 && enemy.hp <= 0) { // afficher le message de victoire en battant le boss
            console.log(greenText('🎉 Congratulations! You have defeated The Boss and won the game! 🎉'));
            return;
        }
    }
}
var option = ['Start Game'];
var choice = readline.keyInSelect(option, 'Bonjour, Faites votre choix:'); // creer un menu interactif
if (choice === 0) { // index 0 ('Start Game')
    game();
}
else {
    console.log('Au revoir');
}
