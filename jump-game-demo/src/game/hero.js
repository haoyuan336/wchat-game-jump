const Hero = function () {
    const HeroState = {
        Invalide: -1,
        Ready: 1,
        RecPower: 2,
        Jumping: 3,
        JumpEnd: 4
    };
    const _initY = 65;
    const _initHeight = 80;
    let _state = HeroState.Invalide;
    let that = new THREE.Mesh(new THREE.ConeGeometry(20,_initHeight,10), new THREE.MeshLambertMaterial({color: 0x00ff00}));
    that.castShadow = true;
    let head = new THREE.Mesh(new THREE.DodecahedronGeometry(20,2), new THREE.MeshLambertMaterial({color: 0xf81f1f}));
    head.castShadow = true;
    head.position.y = 40;
    that.add(head);

    let _distance = 0;
    let _scale = 1;

    let _left = undefined;

    that.update = function (dt) {
        if (_state === HeroState.RecPower){
            _distance += 2;
            _scale -= 0.008;
            if (_scale <= 0.6){
                _scale = 0.6;
            }
            if (_distance > 300){
                _distance = 300;
            }
            scaleBody(_scale);
        }
    };


    const scaleBody = function(scale){
        //缩放身体
        that.scale.y = scale;
        that.position.y =  _initY + ( 1 - scale) * _initHeight * - 0.5;
    };

    that.toReady = function (cb) {
        //去准备
        setState(HeroState.Ready, cb);
    };


    that.recPower = function(){
        //蓄力
        if (_state === HeroState.JumpEnd || _state === HeroState.Ready){
            setState(HeroState.RecPower);

        }
    };
    that.jump = function (left, cb) {
        //跳
        console.log('scale value =' + _scale);
        console.log('distance = ' + _distance);
        if (_state === HeroState.RecPower){
            _left = left;
            setState(HeroState.Jumping, cb);
        }
    };

    const setState = function (state, cb) {
        if (_state === state){
            return
        }
        switch (state){
            case HeroState.Ready:
                that.position.y = 120;
                that.position.x = 0;
                that.position.z = 0;
                let action = new TWEEN.Tween({y: that.position.y})
                    .to({y: _initY}, 200)
                    .onUpdate(function(){
                        that.position.y = this.y;
                    })
                    .onComplete(()=>{
                        if (cb){
                            cb();
                        }
                    });
                action.start();

                break;
            case HeroState.RecPower:
                console.log('蓄力');
                break;
            case HeroState.Jumping:
                _scale = 1;
                scaleBody(_scale);
                let cp = 0;
                if (_left){
                    cp = that.position.x;
                }else {
                    cp = that.position.z;
                }
                const jumpAction = new TWEEN.Tween({r: 0, y: 0, d: cp})
                    .to({r: -Math.PI * 2, y: Math.PI, d: cp - _distance}, 400)
                    .onUpdate(function () {
                        // that.rotation.x = this.r;
                        that.position.y = Math.sin(this.y) * 100 + _initY;
                        if (_left){
                            that.position.x = this.d;
                            that.rotation.z = -this.r;
                        }else {
                            that.rotation.x = this.r;
                            that.position.z = this.d;
                        }
                    })
                    .onComplete(()=>{
                        setState(HeroState.JumpEnd);
                        if (cb){
                            cb();
                        }
                    });
                // ju
                jumpAction.start();

                break;
            case HeroState.JumpEnd:
                _distance = 0;
                break;
            default:
                break
        }
        _state = state;
    };



    that.getPoint = function () {
        return {
            x: that.position.x,
            y: that.position.z
        }
    };
    that.goDead = function (cb) {
        //去死

        let action = new TWEEN.Tween({y: _initY})
            .to({y: 0}, 200)
            .onUpdate(function () {
                that.position.y = this.y;
            })
            .onComplete(()=>{
                if (cb){
                    cb();
                }
            });
        action.start();
    };


    return that;
};
export default Hero;