import {Director} from './utility/import'
import GameWorld from './game/game-world'
window.onload = function () {
    console.log('on load');
    Director.createDirector();

    let gameWorld = GameWorld();
    Director.shareDirector().startWorld(gameWorld);


};