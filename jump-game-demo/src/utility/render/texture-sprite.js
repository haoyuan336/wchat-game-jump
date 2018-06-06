import BaseSprite from './base-sprite'
function TextureSprite(imgStr) {
    let texture = new THREE.TextureLoader().load(imgStr);
    let that = BaseSprite(texture);

    that.setTexture = function (imgStr) {
        texture = new THREE.TextureLoader().load(imgStr);

    }

    return that;
}
export default TextureSprite;