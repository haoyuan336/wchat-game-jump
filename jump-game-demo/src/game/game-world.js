import {TextSprite} from './../utility/import'
function GameWorld() {
    let that = {};
    that.scene = new THREE.Scene();
    let _tipsText = TextSprite('Hello World');
    that.scene.add(_tipsText);


    that.update = function (dt) {
    };
    return that;
};
export default GameWorld;