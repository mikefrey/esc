
var Engine = function() {

  this.entityList = []

  this.systemList = []

}

var proto = Engine.prototype

proto.addEntity = function(entity) {
  this.entityList.push(entity)
}

proto.removeEntity = function(entity) {
  var idx = this.entityList.indexOf(entity)
  this.entityList.splice(idx,1)
}

proto.addSystem = function(system, priority) {
  system.__priority = priority
  this.systemList.push(system)
  this.systemList.sort(function(a,b) { return a.__priority - b.__priority })
}

proto.removeSystem = function(system) {
  var idx = this.systemList.indexOf(system)
  this.systemList.splice(idx,1)
}

proto.update = function(time) {
  for (var i = 0; i < this.systemList.length; i+=1) {
    this.systemList[i].update(this.entityList, time)
  }
}

module.exports = Engine
