const should = require('should')
const assert = require('assert');

const Dynamic = require('../index')

describe('dynamic-factor test ', () => {
    it('should be integer (ttl_sec)', () => {
        try {
            new Dynamic("")
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("ttl_sec should be integer")
        }
    });

    it('should be integer (limit)', () => {
        try {
            new Dynamic(10, "")
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("limit should be integer")
        }
    });

    it('basic happy path', () => {
        let dynamic = new Dynamic(36000, 1)
        dynamic.inc("some_key")
        dynamic.get("some_key").should.be.exactly(1);

        dynamic.inc("some_key")
        dynamic.get("some_key").should.be.exactly(2);

        dynamic.inc("some_key")
        dynamic.get("some_key").should.be.exactly(3);
    });

    it('should set correctly', () => {
        let dynamic = new Dynamic(10, 1)
        dynamic.set("some_key", 1500)
        dynamic.get("some_key").should.be.exactly(1500).and.be.a.Number();
    });

    it('should set integer values', () => {
        try {
            let dynamic = new Dynamic(10, 1)
            dynamic.set("some_key", true)
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("value should be integer")
        }
    });

    it('factor set integer values', () => {
        try {
            let dynamic = new Dynamic(10, 1)
            dynamic.set("some_key", true)
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("value should be integer")
        }
    });

    it('happy path', () => {
        let dynamic = new Dynamic(36000, 2)
        dynamic.inc("some_key")
        dynamic.factor("some_key").should.be.exactly(1);

        dynamic.inc("some_key")
        dynamic.factor("some_key").should.be.exactly(1);

        dynamic.inc("some_key")
        dynamic.factor("some_key").should.be.exactly(1.5);

        dynamic.inc("some_key")
        dynamic.factor("some_key").should.be.exactly(2);

        dynamic.inc("some_key")
        dynamic.factor("some_key").should.be.exactly(2.5);

        dynamic.inc("some_key")
        dynamic.factor("some_key").should.be.exactly(3);
    });
})