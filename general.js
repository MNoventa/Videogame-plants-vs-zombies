// FUNCTIONALITIES:
  // Collision enemy & enemy
  // Arrow for ally
  // Timing for option allies appear
  // Background allies
  // Background enemies
  // Background map
  // Hover cells
  // Count enemies death

var size = {
  width: 100,
  height: 100
}
var grid = {
  rows: 6,
  cols: 8
}
var grid_complete = [];
var enemy_complete = [];
var ally_complete = [];
var arrow_complete = [];
var allies_opt_complete = [];
var allies_opt_selected;
var map;
var frame_count = 0;
var frame_opt = 1;
var velocity_refresh = 60;
var damage_default = 1000;
var enemies = {
  tyson: {
    velocity: 1,
    lifetime: damage_default + 200,
    background: 'enemy-tyson.png',
  },
  summer: {
    velocity: 1,
    lifetime: damage_default,
    background: 'enemy-summer.png',
  }
}
var allies = {
  option1: {
    lifetime: damage_default + 700,
    background: 'rubi-opt-1.png',
  },
  option2: {
    lifetime: damage_default + 100,
    background: 'rubi-opt-2.png',
  },
  option3: {
    lifetime: damage_default + 1500,
    background: 'rubi-opt-3.png',
  }
}

function setup (){
  map = document.createElement("div");
  map.classList.add('map');
  var option_zone = document.createElement("div");
  option_zone.classList.add('option_zone');
  var option_zone_width = 0;

  for(var key in allies){
    var new_opt_allies = new ally(0, 0, 0, key, allies[key].background);
    option_zone.appendChild(new_opt_allies.structure_option);
    //add +10 by the margin between options divs
    option_zone_width = option_zone_width + size.width + 25;
  }

  option_zone.style.width = option_zone_width + 'px';

  for(var i=0; i<grid.rows; i++){
    for(var j=0; j<grid.cols; j++){
      var new_cell = new cell(j * size.width, i * size.height, j+'-'+i);
      grid_complete.push(new_cell);
      map.appendChild(new_cell.structure);
    }
  }

  map.style.width = size.width * (grid.cols) + 'px';
  map.style.height = size.height * (grid.rows) + 'px';
  document.querySelector('#game').appendChild(map);
  document.querySelector('#game').appendChild(option_zone);

  allies_opt_complete = document.querySelectorAll('.option_zone div');
  for(var i=0; i<allies_opt_complete.length; i++){
    allies_opt_complete[i].addEventListener('click', function(event){
      allies_opt_selected = event.target;
      addclass_option_ally(event.target.className);
    });
  }

  for(var i=0; i<grid_complete.length; i++){
    grid_complete[i].structure.addEventListener('click', function(event){
      var grid_selected = grid_complete.find(item => item.id === event.target.attributes.id.value);

      if(allies_opt_selected != undefined){
        for(var i=1; i<=allies_opt_complete.length; i++){
          var option_class = 'option'+i;

          if(allies_opt_selected != undefined && allies_opt_selected.classList.contains(option_class) && allies_opt_selected.classList.contains('opt-available')){
            add_ally(option_class, grid_selected.x, grid_selected.y, allies[option_class].lifetime);
            rmveclass_option_ally(true);
            frame_opt = 1;
          }
        }
      }
    });
  }
}

function add_ally(option, x, y, lifetime){
  switch(option){
    case 'option1':
      var new_ally = new ally(x, y, lifetime, option, allies.option1.background);
      break;
    case 'option2':
      var new_ally = new ally(x, y, lifetime, option, allies.option2.background);
      break;
    case 'option3':
      var new_ally = new ally(x, y, lifetime, option, allies.option3.background);
      break;
  };
  ally_complete.push(new_ally);
  map.appendChild(new_ally.structure);
  rmveclass_option_ally();
  allies_opt_selected = undefined;
}

function add_enemy(id){
  position = Math.floor(Math.random() * (grid.rows));
  var opt_enemy = Math.floor(Math.random() * 2);
  switch (opt_enemy) {
    case 0:
      var new_enemy = new enemy(size.width * grid.cols, size.height * position, enemies.tyson.velocity, enemies.tyson.lifetime, id, enemies.tyson.background);
      break;
    case 1:
      var new_enemy = new enemy(size.width * grid.cols, size.height * position, enemies.summer.velocity, enemies.summer.lifetime, id, enemies.summer.background);
      break;
  };
  map.appendChild(new_enemy.structure);
  enemy_complete.push(new_enemy);
}

function addclass_option_ally(option){
  if(!allies_opt_selected.classList.contains('option-selected')){
    rmveclass_option_ally();
    allies_opt_selected.classList.add('option-selected');
  }
}

function rmveclass_option_ally(param){
  for(var i=0; i<allies_opt_complete.length; i++){
    allies_opt_complete[i].classList.remove('option-selected');
    if(param != undefined){
      allies_opt_complete[i].classList.remove('opt-available');
    }
  }
}

function refresh(){
  for(var i=0; i<=enemy_complete.length; i++){
    if(enemy_complete[i] != undefined){
      //check if enemy collision with map
      if(enemy_complete[i].x >= 0){
        if(!enemy_complete[i].collapse){
          enemy_complete[i].move();
          //check if enemy collision with ally
          check_collistion(enemy_complete[i], ally_complete, i, 4);
          //check if enemy collision with arrow
          check_collistion(enemy_complete[i], arrow_complete, i, 10);
        }else{
          take_damage(enemy_complete[i], i, enemy_complete[i].sprite);
        }
      }else{
        enemy_complete[i].structure.remove();
        enemy_complete.splice(enemy_complete[i], 1);
      }
    }
  }

  for(var i=0; i<ally_complete.length; i++){
    if(ally_complete[i].collapse){
      take_damage(ally_complete[i], i, ally_complete[i].sprite);
    }
  }

  if(frame_count % 80 == 0) {
    for(key in ally_complete){
      if(ally_complete[key].id == 'option2'){
        var new_arrow = new arrow(ally_complete[key].x + size.width, ally_complete[key].y);
        arrow_complete.push(new_arrow);
        map.appendChild(new_arrow.structure);
      }
    }
  }

  for(key in arrow_complete){
    var map_width = size.width * grid.cols;
    arrow_complete[key].move();
    if(arrow_complete[key].x > map_width){
      arrow_complete[key].structure.remove();
      arrow_complete.splice(arrow_complete[key], 1);
    }
  }

  if(frame_count % 200 == 0) {
    add_enemy(frame_count);
  }

  if(frame_opt % 200 == 0) {
    allies_opt_complete[0].classList.add('opt-available');
  }

  if(frame_opt % 300 == 0) {
    allies_opt_complete[1].classList.add('opt-available');
  }

  if(frame_opt % 400 == 0) {
    allies_opt_complete[2].classList.add('opt-available');
  }

  frame_count++;
  frame_opt++;
}

function check_collistion(a, b, position, px_interval){
  for(key in b){
    if(a.y == b[key].y){
      if (a.x <= ((b[key].x + size.width) + px_interval) && a.x >= ((b[key].x + size.width) - px_interval)){
        if(b[key].sprite == 'arrow'){
          take_damage(a, position, b[key].sprite);
        }else{
          b[key].collapse = true;
          a.collapse = true;
          b[key].id_enemy = a.id;
          take_damage(a, position, a.sprite);
          take_damage(b[key], key, b[key].sprite);
        }
      }
    }
  }
}

function take_damage(element, position, sprite){
  if(element.lifetime.current >= 0){
    //if still alive
    var damage = damage_default / 95;
    if(sprite == 'arrow'){
      element.lifetime_substract(damage + 100);
    }else{
      element.lifetime_substract(damage);
    }
  }else{
    //if is dead
    element.structure.remove();
    if(sprite == 'enemy'){
      console.log(position);
      enemy_complete.splice(position, 1);
      var ally_collapse = ally_complete.find(item => item.id_enemy === element.id);
      ally_collapse.collapse = false;
    }
    if(sprite == 'ally'){
      ally_complete.splice(position, 1);
      var enemy_collapse = enemy_complete.find(item => item.id === element.id_enemy);
      enemy_collapse.collapse = false;
    }
  }
}

loop = setInterval(function(){
  refresh();
}, velocity_refresh);

setup();
