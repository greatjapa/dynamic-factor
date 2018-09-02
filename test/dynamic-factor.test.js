require('should')
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

    it('should be integer (denominator)', () => {
        try {
            new Dynamic(10, "")
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("denominator should be integer")
        }
    });

    it('basic happy path', () => {
        let dynamic = new Dynamic(36000, 1)
        dynamic.inc("page_views")
        dynamic.get("page_views").should.be.exactly(1);

        dynamic.inc("page_views")
        dynamic.get("page_views").should.be.exactly(2);

        dynamic.inc("page_views")
        dynamic.get("page_views").should.be.exactly(3);
    });

    it('should set correctly', () => {
        let dynamic = new Dynamic(10, 1)
        dynamic.set("page_views", 1500)
        dynamic.get("page_views").should.be.exactly(1500).and.be.a.Number();
    });

    it('should set integer values', () => {
        try {
            let dynamic = new Dynamic(10, 1)
            dynamic.set("page_views", true)
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("value should be integer")
        }
    });

    it('factor set integer values', () => {
        try {
            let dynamic = new Dynamic(10, 1)
            dynamic.set("page_views", true)
            assert.fail()
        } catch(err) {
            err.message.should.be.equals("value should be integer")
        }
    });

    it('happy path', () => {
        let dynamic = new Dynamic(36000, 2)
        dynamic.factor("page_views").should.be.exactly(0);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.exactly(0.5);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.exactly(1);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.exactly(1.5);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.exactly(2);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.exactly(2.5);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.exactly(3);
    });

    it('large numbers', () => {
        let dynamic = new Dynamic(36000, 2235)
        dynamic.factor("page_views").should.be.exactly(0);

        const TOLERANCE = 0.0000001
        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.approximately(0.00044742729306487697, TOLERANCE);

        dynamic.set("page_views", 2235)
        dynamic.factor("page_views").should.be.exactly(1);

        dynamic.inc("page_views")
        dynamic.factor("page_views").should.be.approximately(1.0004474272930648, TOLERANCE);

        dynamic.set("page_views", 2235 * 2)
        dynamic.factor("page_views").should.be.exactly(2);
    });
})