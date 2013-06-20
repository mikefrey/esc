
var assert = require('assert')
var sinon = require('sinon')

var System = require('../src/system')

describe('System', function() {

  describe('System class', function() {

    it('should exist', function() {
      assert(!!System)
    })

  })

  describe('System :: update', function() {

    var system
    var sys

    before(function() {
      system = new System()
    })

    it('should exist', function() {
      assert(!!system.update)
    })

    it('should throw', function() {
      assert.throws(system.update)
    })

  })

  describe('System :: getComponentGroup', function() {

    var system
    var entities = [
      { id:0 },
      { id:1, moveable:true, position:1, rotation:1 },
      { id:2, moveable:true, position:1 },
      { id:3, position:1, rotation:1 },
      { id:4, position:1 }
    ]

    before(function() {
      system = new System()
      system.actsOn = {
        moves : { has:['position', 'rotation', 'moveable'] },
        frozen : { has:['position', 'rotation'], not:['moveable'] }
      }
    })

    it('should exist', function() {
      assert(!!system.getComponentGroup)
    })

    it('should match entities using "has"', function() {
      var ents = system.getComponentGroup('moves', entities)
      assert.equal(ents.length, 1)
      assert.equal(ents[0].id, 1)
    })

    it('should match entities using "not"', function() {
      var ents = system.getComponentGroup('frozen', entities)
      assert.equal(ents.length, 1)
      assert.equal(ents[0].id, 3)
    })

  })

})
