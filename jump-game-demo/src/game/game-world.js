import {TextSprite, BaseBox, Director, BasePlane} from './../utility/import'
import Hero from './hero'
const GameState = {
    Invalide: -1,
    Ready: 2,
    Running:3,
    GameOver: 4
};
function GameWorld() {
    let that = {};
    that.scene = new THREE.Scene();
    let _tipsText = TextSprite('Hello World');
    that.scene.add(_tipsText);
    _tipsText.position.y = 400;
    let _state = GameState.Invalide;


    let _light = new THREE.PointLight(0xffffff, 0.8);
    _light.castShadow = true;
    that.scene.add(_light);
    _light.position.y = 300;
    _light.position.z = -300;
    _light.position.x = 300;


    let _aLight = new THREE.AmbientLight(0xffffff, 0.4);
    that.scene.add(_aLight);


    let _plane = BasePlane(1000,1000);
    _plane.receiveShadow = true;
    that.scene.add(_plane);
    _plane.position.y = -25;
    _plane.rotation.x = - Math.PI * 0.5;

    let box = BaseBox(100,50,100, {color: 0xff00ff});
    box.castShadow = true;
    box.receiveShadow = true;
    that.scene.add(box);

    let _hero = Hero();
    that.scene.add(_hero);
    _hero.position.y = 60;
    Director.shareDirector().setCameraPosition(200,200,200);
    that.update = function (dt) {

    };

    window.addEventListener('mousedown', ()=>{
       console.log('mouse down');
    });
    window.addEventListener('mouseup', ()=>{
       console.log('mouse up');
    });

    const setState = function (state) {
        if (_state === state){
            return
        }
        switch (state){
            case GameState.Ready:
                //准备阶段
                if (_hero){
                    _hero.toReady();
                }

                break;
            case GameState.Running:
                break;
            case GameState.GameOver:
                break;
        }
    };

    setState(GameState.Ready);

    return that;
};
export default GameWorld;