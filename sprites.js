function cell(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.structure = document.createElement('div');
  this.structure.classList.add('cell');
  this.structure.classList.add('x-' + x);
  this.structure.classList.add('y-' + y);
  this.structure.setAttribute('id', id);
  this.structure.style.width = size.width + 'px';
  this.structure.style.height = size.height + 'px';
  this.structure.style.left = this.x + 'px';
  this.structure.style.top = this.y + 'px';
}

function enemy(x, y, velocity, lifetime, id, background){
  this.x = x;
  this.y = y;
  this.id = id;
  this.sprite = 'enemy';
  this.structure = document.createElement('div');
  this.structure.classList.add('enemy');
  this.structure.style.width = size.width + 'px';
  this.structure.style.height = size.height + 'px';
  this.structure.style.left = this.x + 'px';
  this.structure.style.top = this.y + 'px';
  this.structure_lifetime = document.createElement('div');
  this.structure_lifetime.classList.add('lifetime');
  this.velocity = velocity;
  this.collapse = false;
  this.structure.style.backgroundImage = "url('img/" + background + "')";
  this.lifetime = {
    initial: lifetime,
    current: lifetime
  }

  this.move = function(){
    this.x = this.x - velocity;
    this.structure.style.left = this.x + 'px';
  }

  this.lifetime_substract = function(damage){
    this.lifetime.current = this.lifetime.current - damage;
    var lifetime_css = (100*this.lifetime.current)/this.lifetime.initial;
    this.structure_lifetime.style.width = lifetime_css + '%';
  }

  this.structure.appendChild(this.structure_lifetime);
}

function ally(x, y, lifetime, id, background){
  this.x = x;
  this.y = y;
  this.id = id;
  this.id_enemy;
  this.sprite = 'ally';
  this.structure_option = document.createElement('div');
  this.structure_option.classList.add(id);
  this.structure_option.classList.add('opt-available');
  this.structure_option.style.width = size.width + 'px';
  this.structure_option.style.height = size.height + 'px';
  this.structure_option.style.backgroundImage = "url('img/" + background + "')";
  this.structure = document.createElement('div');
  this.structure.classList.add('ally');
  this.structure.classList.add('ally' + id);
  this.structure.style.width = size.width + 'px';
  this.structure.style.height = size.height + 'px';
  this.structure.style.left = this.x + 'px';
  this.structure.style.top = this.y + 'px';
  this.structure.style.backgroundImage = "url('img/" + background + "')";
  this.structure_lifetime = document.createElement('div');
  this.structure_lifetime.classList.add('lifetime');
  this.lifetime = {
    initial: lifetime,
    current: lifetime
  }

  this.lifetime_substract = function(damage){
    this.lifetime.current = this.lifetime.current - damage;
    var lifetime_css = (100*this.lifetime.current)/this.lifetime.initial;
    this.structure_lifetime.style.width = lifetime_css + '%';
  }

  this.structure.appendChild(this.structure_lifetime);
}

function arrow(x, y){
  this.x = x;
  this.y = y;
  this.sprite = 'arrow';
  this.structure = document.createElement('div');
  this.structure.classList.add('arrow');
  this.structure.style.width = (size.width/2) + 'px';
  this.structure.style.height = (size.height/2) + 'px';
  this.structure.style.left = this.x + 'px';
  this.structure.style.top = this.y + 'px';
  this.velocity = 8;

  this.move = function(){
    this.x = this.x + this.velocity;
    this.structure.style.left = this.x + 'px';
  }
}
