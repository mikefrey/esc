
var assert = require('assert')
var sinon = require('sinon')

var Engine = require('../src/engine')

describe('Engine', function() {

  describe('Engine class', function() {

    it('should exist', function() {
      assert(!!Engine)
    })

  })

  describe('Engine :: addEntity', function() {

    var engine

    before(function() {
      engine = new Engine()
    })

    it('should exist', function() {
      assert(!!engine.addEntity)
    })

    it('should add an entity to entityList', function() {
      engine.addEntity(1)
    })

  })

  describe('Engine :: removeEntity', function() {

    var engine
    var ent

    before(function() {
      ent = {}
      engine = new Engine()
      engine.addEntity({})
      engine.addEntity({})
      engine.addEntity(ent)
      engine.addEntity({})
    })

    it('should exist', function() {
      assert(!!engine.removeEntity)
    })

    it('should remove an entity from entityList', function() {
      engine.removeEntity(ent)
      assert.equal(engine.entityList.length, 3)
    })

  })

  describe('Engine :: addSystem', function() {

    var engine

    beforeEach(function() {
      engine = new Engine()
    })

    it('should exist', function() {
      assert(!!engine.addSystem)
    })

    it('should add a system to systemList', function() {
      var system = {}
      engine.addSystem(system, 1)
      assert.equal(engine.systemList[0], system)
      assert.equal(system.__priority, 1)
    })

    it('should add a system in priority order', function() {
      var system = {}
      engine.addSystem({}, 4)
      engine.addSystem({}, 2)
      engine.addSystem({}, 1)
      engine.addSystem({}, 3)
      assert.equal(engine.systemList[0].__priority, 1)
      assert.equal(engine.systemList[1].__priority, 2)
      assert.equal(engine.systemList[2].__priority, 3)
      assert.equal(engine.systemList[3].__priority, 4)
    })

  })

  describe('Engine :: removeSystem', function() {

    var engine
    var sys

    before(function() {
      sys = {}
      engine = new Engine()
      engine.addSystem({})
      engine.addSystem({})
      engine.addSystem(sys)
      engine.addSystem({})
    })

    it('should exist', function() {
      assert(!!engine.removeSystem)
    })

    it('should remove a system from systemList', function() {
      engine.removeSystem(sys)
      assert.equal(engine.systemList.length, 3)
    })

  })

  describe('Engine :: update', function() {

    var engine
    var sys

    before(function() {
      sys = { update:sinon.spy() }
      engine = new Engine()
      engine.addSystem(sys)
    })

    it('should exist', function() {
      assert(!!engine.removeSystem)
    })

    it('should remove a system from systemList', function() {
      engine.update(10)
      assert(sys.update.calledOnce)
      assert(sys.update.calledWith(engine.entityList, 10))
    })

  })

})
