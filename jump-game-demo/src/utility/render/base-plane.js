const BasePlane = function (width, height) {
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshLambertMaterial({color: 0xffffff}));
    return plane;
};
export default BasePlane;