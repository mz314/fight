var FightEngine = function (socket_conn) {
    var self = this;
    self.width = 800;
    self.height = 600;
    self.socket_conn = socket_conn;
    
    self.initHandlers = function () {
        self.socket_conn.handlers.update_player=function(data) {
            console.log('update', data);
        };
        
        self.socket_conn.handlers.joined_session_after=function(data) {
            self.stage_manager.addCharacter(self.stage_manager.character_manager.loadCharacter('test_dude'));
            self.scene.add(self.stage_manager.characters[0].mesh);
            console.log('joined', data);
            if(data.me=="1") {
               self.stage_manager.player.character_id = data.player_id;
            }
        };
    };

    self.init = function () {
        self.stage_manager = new StageManager(self.socket_conn);
        self.initHandlers();
        self.clock = new THREE.Clock();
        self.scene = new THREE.Scene();
        self.camera = new THREE.OrthographicCamera(
                self.width / -2,
                self.width / 2,
                self.height / 2,
                self.height / -2,
                -500,
                1000
                );
        self.renderer = new THREE.WebGLRenderer();
        self.renderer.setPixelRatio(window.devicePixelRatio);

        window.addEventListener('resize', function () {
            self.onWindowResize();
        }, false);
        self.onWindowResize();

        var ambientLight = new THREE.AmbientLight(0xffffff);
        self.scene.add(ambientLight);
        self.container = document.getElementById('container');
        self.container.appendChild(self.renderer.domElement);

        stage = self.stage_manager.loadStage('test_arena');
        self.scene.add(stage.background_mesh);
//        self.stage_manager.addCharacter(self.stage_manager.character_manager.loadCharacter('test_dude'));
//        self.scene.add(self.stage_manager.characters[0].mesh);
    };

    self.onWindowResize = function () {

        self.camera.left = self.width / -2;
        self.camera.right = self.width / 2;
        self.camera.top = self.height / 2;
        self.camera.bottom = self.height / -2;
        self.camera.updateProjectionMatrix();
        self.renderer.setSize(self.width, self.height);

    };

    self.update = function () {
        var delta = self.clock.getDelta();
        characters = self.stage_manager.characters;
        for (var character in characters) {
            characters[character].animations[characters[character].state.name].animator.update(1000 * delta);
        }

        self.stage_manager.updatePositions(delta);
    };

    self.animate = function () {
        requestAnimationFrame(self.animate);
        self.update();
        self.render();
    };

    self.render = function () {
        self.renderer.render(self.scene, self.camera);
    };
};