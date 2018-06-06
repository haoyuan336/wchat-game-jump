function BaseScene() {
    let that = new THREE.Scene();
    that.destroy = function () {
        //
        //
        console.log('销毁 scene');
    };
    return that;
}