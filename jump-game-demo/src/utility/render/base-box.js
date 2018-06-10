function BaseBox(s1, s2, s3, option) {
    let box = new THREE.BoxGeometry(s1, s2, s3);

    let _material = new THREE.MeshLambertMaterial(option);
    let that = new THREE.Mesh(box, _material);
    that.castShadow = true;
    that.receiveShadow = true;

    that.getRect = function () {
      //返回矩形
        return {
            x: that.position.x,
            y: that.position.z,
            width: s1,
            height: s3
        }
    };

    return that;
}

export default BaseBox;