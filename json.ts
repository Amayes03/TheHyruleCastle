const fs = require('fs');

const pathPlayer = './players.json';
const pathEnemies = './enemies.json';
const pathBoss = './bosses.json';

export function MyPlayer(){
    try {
        const file = fs.readFileSync(pathPlayer, 'utf-8');
        const PlayerJson = JSON.parse(file);
        return PlayerJson;
    } catch {
        console.error('Cannot access to players.json');
    }
}

export function Enemies() {
    try {
        const file = fs.readFileSync(pathEnemies, 'utf-8');
        const enemiesJson = JSON.parse(file);
        return enemiesJson;
    } catch {
        console.error('Cannot access to enemies.json');
    }
}

export function Boss(){
    try {
        const file = fs.readFileSync(pathBoss, 'utf-8');
        const bossJson = JSON.parse(file);
        return bossJson;
    } catch {
        console.error('Cannot access to boss.json');
    }
}