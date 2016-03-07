var Player = function (id, name) {
    this.velocity = new THREE.Vector2(0, 0);
    this.acceleration = new THREE.Vector2(0, -98);
    this.texture = null;
    this.material = null;
    this.mesh = null;
    this.id = id;
    this.name = name;
    this.character = null;
    this.place = function (x, y) {
      this.mesh.position.x = x;  
      this.mesh.position.y = y;
    };
    

};

