function BaseBox(s1, s2, s3, option) {
    let box = new THREE.BoxGeometry(s1, s2, s3);
    let _material = new THREE.MeshLambertMaterial(option);
    let that = new THREE.Mesh(box, _material);
    return that;
}

export default BaseBox;