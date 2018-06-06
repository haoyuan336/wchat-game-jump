function BaseSprite(texture, color) {
    let _material = new THREE.SpriteMaterial({map: texture, color: color});
    let that = new THREE.Sprite(_material);



    return that;
};
export default BaseSprite;