var FightEngine = function () {
    var self = this;
    self.width = 800;
    self.height = 600;
    self.socket_conn = Factory.get('SocketConn');
    self.stage_manager = Factory.get('StageManager');

    self.initializeSubsystems = function () {
        self.socket_conn.init();
        Factory.get('Input');
    }

    self.initHandlers = function () {

        self.socket_conn.handlers.new_player = function (data) {
            self.stage_manager.player = new Player(data.player.id, data.player.name);
            self.stage_manager.addPlayer(player);
            player.character = self.stage_manager.character_manager.loadCharacter(player, 'test_dude');
        };

        self.socket_conn.handlers.update_player = function (data) {
            console.log('update', data);
        };

        self.socket_conn.handlers.joined_session_after = function (data) {

            self.scene.add(self.stage_manager.players[0].mesh);
            console.log('joined', data);
            if (data.me == "1") {
                self.stage_manager.player.character_id = data.player_id;
            }
        };
    };

    self.init = function () {
        self.initializeSubsystems();
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