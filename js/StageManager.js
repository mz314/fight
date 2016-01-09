StageManager = function (socket_conn) {
    var self = this;
    
    self.socket_conn = socket_conn;
    self.stages = [];
    self.current = null;
    self.character_manager = new CharacterManager();
    self.characters = [];
    self.player = [];

    self.getPlayerEssential = function () {
        return {
            'velocity': self.player.velocity,
            'acceleration': self.player.acceleration,
            'state': self.player.state
        };
    };
    
    self.init = function() {
      
    };

    self.addCharacter = function (character) {
        self.characters.push(character);
        self.player = character;
    };

    self.loadStageFile = function () {
        $.ajax({
            url: 'assets/data/stages.json',
            async: false
        }).always(function (data) {
            self.stages = eval(data);
        });
    };

    self.loadStage = function (stage_name) {
        stage = {
            'object': self.stages[stage_name]
        };

        var texture = THREE.ImageUtils.loadTexture(stage.object.background);
        var background_mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(40, 40, 5, 5),
                new THREE.MeshLambertMaterial({
                    map: texture
                }));

        background_mesh.scale.x = 20;
        background_mesh.scale.y = 15;

        stage['background_mesh'] = background_mesh;

        self.current = stage;
        return stage;
    };
    self.changePlayerState = function(state) {
        
        var movement_speed = 100;
        switch(state.name) {
            case 'idle':
                self.player.velocity.x = 0;
                break;
            case 'stop_movement':
                if (state.params=='side') {
                    self.changePlayerState({name:'idle'});
                } 
                else if(state.params=='jump' ) { //&& self.player.state.name!='stop_movement' && self.player.state.params!="jump"
                    console.log('stop jump');
                    
                    self.player.acceleration.y=-980;
                    
                }
                
                break;
            case 'move': 
                if (self.player.state.name=="jump") {
                    return;
                }
                var multipler = 1;
                if(state.params=='left') {
                    multipler = -1;
                   
                }
                
                if(self.player.facing!=state.params) {
                     self.player['mesh'].scale.x*=-1;
                     self.player.facing=state.params;
                }
                self.player.velocity.x = multipler * movement_speed;
                break;
            case 'jump':
                self.player.acceleration.y=0;
                self.player.velocity.y=200;
                break;
            
        }
        self.player.state=state;
    };

    self.updatePositions = function (delta) {
        for (var character_i in self.characters) {
            var character = self.characters[character_i];
            next_position = new THREE.Vector3();
            next_position.x = character.mesh.position.x + character.velocity.x * delta;
            next_position.y = character.mesh.position.y + character.velocity.y * delta;
            
            if(next_position.x>self.current.object.box.left && next_position.x<self.current.object.box.right) {
                character.mesh.position.x = next_position.x;
                    character.velocity.x += character.acceleration.x * delta;
            }
            
            if((next_position.y<self.current.object.box.top && next_position.y>self.current.object.box.bottom)) {
                 character.mesh.position.y = next_position.y;
                
            } else {
                
            }
             character.velocity.y += character.acceleration.y * delta;
            //console.log(self.player.state.name, self.player.mesh.position.y);
            if(self.player.mesh.position.y>=-50) {
                self.player.acceleration.y=-980;
                
            }
           
        }
    };
    
    self.init();
    self.loadStageFile();
};