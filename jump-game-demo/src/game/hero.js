const Hero = function () {
    let that = new THREE.Mesh(new THREE.ConeGeometry(20,80,10), new THREE.MeshLambertMaterial({color: 0x00ff00}));
    that.castShadow = true;
    let head = new THREE.Mesh(new THREE.DodecahedronGeometry(20,2), new THREE.MeshLambertMaterial({color: 0x00ff11}));
    head.castShadow = true;
    head.position.y = 40;
    that.add(head);

    that.update = function (dt) {

    };



    that.toReady = function () {
        //去准备
    };




    return that;
};
export default Hero;