function CharacterManager() {
    var self = this;

    self.characters_data = [];
    self.players = [];

    self.loadCharactersFile = function () {
        $.ajax({
            url: 'assets/data/characters.json',
            async: false
        }).always(function (data) {
            self.characters_data = eval(data);
        });
    };

    self.loadCharacter = function (player, character_name) {
       
        var character = self.characters_data[character_name];
        var animations = character.animations;
//        character['velocity'] = new THREE.Vector2(0, 0);
//        character['acceleration'] = new THREE.Vector2(0, -98);
//        character['id']=null;
        character['texture'] = THREE.ImageUtils.loadTexture(character['spritemap']);
        character['state'] = {
            'name': 'idle',
            'params': null
        };
        
        geometry = new THREE.PlaneGeometry(90, 120, 1, 1);

        character['material'] = new THREE.MeshBasicMaterial({
            map: character['texture'],
            side: THREE.DoubleSide,
            transparency:true,
            depthWrite: false,
            depthTest: false,
            alphaTest: 0.5
        });
        
        player.mesh = new THREE.Mesh(geometry, character['material']);
        player.mesh.position.y = -10;

        for (var animation in animations) {

            animations[animation]['animator'] =
                    new TextureAnimator({
                        'texture': character['texture'],
                        'num_tiles_x':character['tiles_n_x'],
                        'num_tiles_y':character['tiles_n_y'],
                        'interval':animations[animation].interval,
                        'start':animations[animation].start_tile,
                        'end':animations[animation].end_tile
                    });

        }

        self.characters_data[character_name] = character;

        return character;
    };

    self.loadCharactersFile();
}