import {TextSprite, BaseBox, Director, BasePlane} from './../utility/import'
function GameWorld() {
    let that = {};
    that.scene = new THREE.Scene();
    let _tipsText = TextSprite('Hello World');
    that.scene.add(_tipsText);
    _tipsText.position.y = 400;



    let _light = new THREE.PointLight(0xffffff, 2);
    that.scene.add(_light);
    _light.position.y = 200;


    let _aLight = new THREE.AmbientLight(0xffffff, 0.5);
    that.scene.add(_aLight);


    let _plane = BasePlane(100,100);
    that.scene.add(_plane);
    _plane.rotation

    let box = BaseBox(100,100,100);
    that.scene.add(box);


    let box2 = BaseBox(100,100,100, new THREE.MeshLambertMaterial({color: 0xff00ff}));
    that.scene.add(box2);

    box2.position.y = 120;

    Director.shareDirector().setCameraPosition(200,200,200);
    that.update = function (dt) {

    };
    return that;
};
export default GameWorld;