
var System = function() {

}

var proto = System.prototype

proto.actsOn = null

proto.update = function(entities, time) {
  throw new Error('Updated not implemented')
}

proto.getComponentGroup = function(groupName, entities) {
  var types = this.actsOn[groupName]
  var groups = []
  if (!types) return groups
  for (var i = 0; i < entities.length; i+=1) {
    if (types.has && !this.matchesComponents(entities[i], types.has)) continue
    if (types.not && this.matchesComponents(entities[i], types.not)) continue
    groups.push(entities[i])
  }
  return groups
}

proto.matchesComponents = function(entity, comps) {
  if (!comps || comps.length === 0) return false
  for (var i = 0; i < comps.length; i+=1) {
    if (!(comps[i] in entity)) return false
  }
  return true
}

module.exports = System
