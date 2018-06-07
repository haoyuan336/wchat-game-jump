// import {BaseScene} from './../import'
const Director = function () {
    console.log('创建导演类');
    let that = {};
    let _width = window.innerWidth;
    let _height = window.innerHeight;
    let _renderer = new THREE.WebGLRenderer();
    document.body.appendChild(_renderer.domElement);
    _renderer.setSize(_width, _height);
    let _runningWorld = undefined;
    let _camera = new THREE.OrthographicCamera(_width/2 * -1 , _width/2 , _height / 2, _height/2 * -1);
    _camera.position.y = 100;
    let _currentTime = new Date().getTime();
    let animate = function(){

        let nowTime = new Date().getTime();
        let dt = nowTime - _currentTime;
        _currentTime = nowTime;
        if (_runningWorld){
            _renderer.render(_runningWorld.scene, _camera);
            _runningWorld.update(dt);
        }


        requestAnimationFrame(animate);
    };
    animate();

    that.startWorld = function(world){
        _runningWorld = world;
        _camera.lookAt(world.scene.position);
    };

    window.addEventListener('resize', ()=>{
       _width = window.innerWidth;
       _height = window.innerHeight;
       _renderer.setSize(_width, _height);
    });

    Object.defineProperty(that,'camera',{
        get: function () {
            return _camera
        }
    });
    return that;
};


let shareDirector = shareDirector || function () {
    let that = {};
    let _director = undefined;
    that.createDirector = function(){
        _director = Director();
        return _director;
    };

    that.shareDirector = function () {
        if (_director){
            return _director;
        }
        console.error('please create director first!');
    };
    return that;
}();
export default shareDirector;