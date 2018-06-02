const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
window.onload = function () {
    const GameState = {
        Invalide: -1,
        Ready: 1,
        Running: 2,
        GameOver: 3
    };

    let state = GameState.Invalide;
    let renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(WIDTH, HEIGHT);
    let isTouching = false;
    let moveDistance = 0;
    document.body.appendChild(renderer.domElement);
    let scene = new THREE.Scene();

    let camera = new THREE.OrthographicCamera(-WIDTH / 2, WIDTH / 2, HEIGHT / 2, -HEIGHT / 2, -1000, 3000);
    //
    camera.position.y = 100;
    camera.position.x = 100;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    let ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshLambertMaterial({color: 0xffffff}));
    scene.add(ground);
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI * 0.5;

    let box = createBox();
    scene.add(box);
    let light = new THREE.PointLight(0xffffff, 0.6);
    light.position.y = 300;
    light.castShadow = true;
    light.position.x = 300;
    light.position.z = -300;
    scene.add(light);
    let aLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(aLight);


    let text = createText('Are you ready?');
    scene.add(text);
    text.position.z = 100;
    text.position.x = 100;
    text.position.y = 100;
    text.lookAt(camera.position);
    let hero = createHero();
    scene.add(hero);


    let animate = function () {
        renderer.render(scene, camera);
        if (state === GameState.Running) {
            if (isTouching) {
                moveDistance += 1;
            }
        }

        TWEEN.update();
        requestAnimationFrame(animate);
    };
    animate();
    text.setText('click start game');


    document.addEventListener('mousedown', () => {
        console.log('mouse down ');

        if (state === GameState.Running) {
            isTouching = true;
        }
    });
    document.addEventListener('mouseup', () => {
            console.log('mouse up');

            if (state === GameState.Ready) {
                setState(GameState.Running);
            } else if (state === GameState.Running) {
                isTouching = false;
                hero.jump(moveDistance);
            }
        }
    );

    const setState = function (pState) {
        if (state === pState) {
            return
        }
        switch (pState) {
            case GameState.Ready:
                console.log('进入准备状态');
                text.setText('Click Start Game');
                break;
            case GameState.Running:
                text.setText('');
                break;
            case GameState.GameOver:
                break;
            default:
                break
        }
        state = pState;
    };

    setState(GameState.Ready);


};

const createText = function (text) {
    let canvas = document.createElement('Canvas');
    canvas.width = 1024;
    canvas.height = 512;
    let bitmap = canvas.getContext('2d');
    bitmap.font = 'Normal 40px Arial';
    bitmap.textAlign = 'center';
    bitmap.fillStyle = 'rgba(255,255,255,0.75)';
    bitmap.fillText(text, WIDTH / 2, HEIGHT / 2);
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    let material = new THREE.MeshBasicMaterial({map: texture});
    material.transparent = true;
    let planeGeometry = new THREE.PlaneGeometry(WIDTH, HEIGHT);
    let plane = new THREE.Mesh(planeGeometry, material);

    // plane.rotation.y =  Math.PI * 0.5;
    plane.setText = function (text) {
        bitmap.clearRect(0, 0, WIDTH, HEIGHT);
        bitmap.fillText(text, WIDTH / 2, HEIGHT / 2);
        texture.needsUpdate = true;
    };
    return plane;

    // let
};
const createBox = function () {
    let box = new THREE.Mesh(new THREE.BoxGeometry(100, 50, 100), new THREE.MeshLambertMaterial({color: 0xfcbdbd}));
    box.position.y = 25;
    box.castShadow = true;
    box.receiveShadow = true;
    return box;
};
const createHero = function () {
    const HeroState = {
        Invalide: -1,
        Ready: 1,
        Jumping: 2,
        End: 3,
        Dead: 4
    };
    let state = HeroState.Invalide;
    let cone = new THREE.Mesh(new THREE.ConeGeometry(25, 100, 10, 10), new THREE.MeshLambertMaterial({color: 0xff7fff}));
    let head = new THREE.Mesh(new THREE.DodecahedronGeometry(25, 2), new THREE.MeshLambertMaterial({color: 0x054742}));
    head.position.y = 50;
    head.castShadow = true;
    cone.add(head);
    cone.castShadow = true;
    cone.position.y = 100;

    const setState = function (pState) {
        if (state === pState) {
            return
        }
        switch (pState) {
            case HeroState.Ready:
                break;
            case HeroState.Jumping:
                break;
            case HeroState.Dead:
                break;
            case HeroState.End:
                break;
            default:
                break;
        }
        state = pState;
    };

    setState(HeroState.Ready);

    let jumpDistance = 0;

    cone.jump = function (distance) {
        //跳跃


        console.log('jump ' + distance);

        if (state === HeroState.Ready) {
            console.log('jump' + state);
            setState(HeroState.Jumping);
            cone.rotation.z = 0;
            let action = new TWEEN
                .Tween({a: 0})
                .to({a:- Math.PI * 2}, 300)
                .onUpdate(function () {
                    cone.rotation.x = this.a;
                });
            action.start();

        }
    };
    return cone;
};