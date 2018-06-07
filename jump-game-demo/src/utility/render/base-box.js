function BaseBox(s1,s2,s3, material) {
    let box = new THREE.BoxGeometry(s1,s2,s3);
    let _material = undefined;
    if (material){
        // let _material = new THREE.MeshNormalMaterial({color: 0xff00ff});
        _material = material;
    }else {
        _material = new THREE.MeshNormalMaterial({color: 0xff00ff});

    }
    let that = new THREE.Mesh(box, _material);
    return that;
}
export default BaseBox;