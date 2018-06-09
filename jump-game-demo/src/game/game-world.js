import {TextSprite, BaseBox, Director, BasePlane} from './../utility/import'
import Hero from './hero'

const GameState = {
    Invalide: -1,
    WaitStart: 1,
    Ready: 2,
    Running: 3,
    GameOvering: 4,
    GameOver: 5,
    Wining: 6
};

function GameWorld() {
    let that = {};
    that.scene = new THREE.Scene();
    let _tipsText = TextSprite('Hello World');
    that.scene.add(_tipsText);
    _tipsText.position.y = 600;
    let _state = GameState.Invalide;
    let _score = 0;
    let _boxList = [];
    let _hero = undefined;

    let _left = undefined;

    let _light = new THREE.PointLight(0xffffff, 0.8);
    _light.castShadow = true;
    that.scene.add(_light);
    _light.position.y = 300;
    _light.position.z = -300;
    _light.position.x = 300;


    let _aLight = new THREE.AmbientLight(0xffffff, 0.4);
    that.scene.add(_aLight);


    let _plane = BasePlane(1000, 1000);
    _plane.receiveShadow = true;
    that.scene.add(_plane);
    _plane.position.y = -25;
    _plane.rotation.x = -Math.PI * 0.5;


    const createOneBox = function () {
        console.log('创建一个 箱子');
        let color = '#' + (~~(Math.random() * (1 << 24))).toString(16);
        console.log('color = ' + color);
        let box = BaseBox(80, 50, 80, {color: color});

        if (_boxList.length === 0) {
            box.position.set(0, 0, 0);
        } else {
            let left = (Math.random() * 2 - 1) > 0 ? true : false;
            _left = left;
            // console.log('left = ' + left);
            let distance = Math.random() * 50 + 100; //两个box之间的距离
            let lastBox = _boxList[_boxList.length - 1];
            console.log('last box  position = ' + JSON.stringify(lastBox.position));
            if (left) {
                box.position.x = lastBox.position.x - distance;
                box.position.z = lastBox.position.z;
            } else {
                box.position.z = lastBox.position.z - distance;
                box.position.x = lastBox.position.x;
            }

        }
        _boxList.push(box);
        that.scene.add(box);
        if (_boxList.length === 7){
            that.scene.remove(_boxList[0]);
            _boxList.splice(0,1);
        }
    };



    let x = 0;
    Director.shareDirector().setCameraPosition(200, 200, 200);
    that.update = function (dt) {
        if (_hero) {
            _hero.update(dt);
        }
        x ++;
        // Director.shareDirector().setCameraPosition(-x, x,0)
    };

    window.addEventListener('mousedown', () => {
        console.log('mouse down');

        if (_state === GameState.Running) {
            if (_hero) {
                _hero.recPower();
            }
        }


    });
    window.addEventListener('mouseup', () => {
        console.log('mouse up');

        if (_state === GameState.WaitStart) {
            setState(GameState.Ready);
        } else if (_state === GameState.Running) {
            if (_hero) {
                _hero.jump(_left, _boxList[_boxList.length - 1], () => {
                    console.log('jump end');
                    //跳跃结束
                    checkLose();
                });
            }
        }
        console.log('current state =  ' + _state);

    });

    const checkLose = function () {
        //检查一下是否胜利失败
        let collisionIndex = undefined;
        for (let i = 0; i < _boxList.length; i++) {
            if (checkCollision(_boxList[i].getRect(), _hero.getPoint())) {
                collisionIndex = i;
            }
        }
        if (collisionIndex) {
            //跳上了box
            //成功了 加分
            setState(GameState.Wining);
        } else {
            //没跳上box
            setState(GameState.GameOvering);
        }

    };
    const checkCollision = function (rect, point) {

        console.log('rect  = ' + JSON.stringify(rect));
        console.log('point = ' + JSON.stringify(point));

        // rect  = {"x":0,"y":0,"width":80,"height":80}
        // point = {"x":-84,"y":0}
        // rect  = {"x":-105.64682558782738,"y":0,"width":80,"height":80}
        // point = {"x":-84,"y":0}


        if (point.x > (rect.x - rect.width / 2) &&
            point.x < (rect.x + rect.width / 2) &&
            point.y > (rect.y - rect.height / 2) &&
            point.y < (rect.y + rect.height / 2)) {
            console.log('碰撞');
            return true;
        }
        console.log('没碰撞');


        return false;
    };

    const moveCamera = function (cb) {
        let box = _boxList[_boxList.length - 1];
        console.log('move camera pos = ' + JSON.stringify(box.position));
        let targetPos = {x: box.position.x, z: box.position.z};

        let position = {x: Director.shareDirector().camera.position.x, z: Director.shareDirector().camera.position.z};
        let action = new TWEEN
            .Tween(position)
            .to({x: targetPos.x + 200, z:targetPos.z + 200},1000)
            .onUpdate(function () {
                Director.shareDirector().setCameraPosition(this.x, 200, this.z);
            })
            .onComplete(()=>{
               if (cb){
                   cb();
               }
            });
        action.start();
    };


    const setState = function (state) {
        if (_state === state) {
            return
        }
        switch (state) {
            case GameState.WaitStart:
                _score = 0;
                _tipsText.setText('Click To Start');
                for (let i = 0 ; i < _boxList.length ; i ++){
                    // that.scene.(_boxList[i]);
                    that.scene.remove(_boxList[i]);
                }
                _boxList = [];
                for (let i = 0; i < 2; i++) {
                    createOneBox();
                }
                moveCamera();
                break;
            case GameState.Ready:
                //准备阶段

                console.log('准备');
                if (_hero === undefined) {
                    _hero = Hero();
                    that.scene.add(_hero);
                }

                _hero.toReady(() => {
                    setState(GameState.Running);
                });
                break;
            case GameState.Running:
                console.log('游戏继续运行');
                _tipsText.setText('score:' + _score);

                break;
            case GameState.GameOvering:
                setTimeout(() => {
                    _hero.goDead(() => {
                        setState(GameState.GameOver);
                    });
                }, 200);

                break;
            case GameState.GameOver:
                _tipsText.setText('GameOver:' + _score);

                setTimeout(() => {
                    setState(GameState.WaitStart);
                }, 1000);

                break;
            case GameState.Wining:
                console.log('胜利中');
                _score++;
                createOneBox();
                moveCamera(()=>{
                   setState(GameState.Running);
                });
                break;
            default:
                break;
        }
        _state = state;
    };

    setState(GameState.WaitStart);

    return that;
};
export default GameWorld;