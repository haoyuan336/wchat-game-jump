function TextSprite(text) {

    let _canvas = document.createElement('Canvas');
    _canvas.width = 1024;
    _canvas.height = 1024;
    let bitmap = _canvas.getContext('2d');
    bitmap.font = 'Normal 40px Arial';
    bitmap.textAlign = 'center';
    bitmap.fillStyle = 'rgba(255,255,255,1)';
    bitmap.fillText(text, _canvas.width / 2, _canvas.height / 2);


    let _texture = new THREE.Texture(_canvas);
    _texture.needsUpdate = true;
    let _material = new THREE.SpriteMaterial({map: _texture, color: 0xffffff});
    let that = new THREE.Sprite(_material);

    that.setText = function (text) {
        bitmap.clearRect(0,0, _canvas.width, _canvas.height);
        bitmap.fillText(text, _canvas.width /2, _canvas.height);
        _texture.needsUpdate = true;
    };
    that.scale.set(500,500,500);


    return that;
}
export default TextSprite;