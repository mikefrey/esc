
var Engine = function() {

  this.entityList = []

  this.systemList = []

}

var proto = Engine.prototype

// adds an entity to be managed by the engine
proto.addEntity = function(entity) {
  this.entityList.push(entity)
}

// removes an entity from the engine
proto.removeEntity = function(entity) {
  var idx = this.entityList.indexOf(entity)
  this.entityList.splice(idx,1)
}

// adds a system to be used by the engine
// priority: lower is higher
proto.addSystem = function(system, priority) {
  system.__priority = priority
  this.systemList.push(system)
  // keep the system list sorted so they are executed by priority (low to high)
  this.systemList.sort(function(a,b) { return a.__priority - b.__priority })
}

// remove a system from the engine
proto.removeSystem = function(system) {
  var idx = this.systemList.indexOf(system)
  this.systemList.splice(idx,1)
}

// run each system's update method
proto.update = function(time) {
  for (var i = 0; i < this.systemList.length; i+=1) {
    this.systemList[i].update(this.entityList, time)
  }
}

module.exports = Engine
