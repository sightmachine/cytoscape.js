var expect = require('chai').expect;
var cytoscape = require('../src/test.js', cytoscape);

describe('Algorithms', function(){
  describe('eles.biconnected()', function(){

    var cy0, cy1;

    beforeEach(function(done) {
      cytoscape({
        elements: {
          nodes: [
            { data: { id: '0-0' } },
            { data: { id: '0-1' } },
            { data: { id: '0-2' } },
            { data: { id: '0-3' } },
            { data: { id: '0-4' } },
            
            { data: { id: '1-0' } },
            { data: { id: '1-1' } },
            { data: { id: '1-2' } },
            { data: { id: '1-3' } },
            { data: { id: '1-4' } },
            { data: { id: '1-5' } },
            { data: { id: '1-6' } },
            { data: { id: '1-7' } },
            { data: { id: '1-8' } },
            { data: { id: '1-9' } },
            { data: { id: '1-10' } },
            { data: { id: '1-11' } },
            { data: { id: '1-12' } },
            { data: { id: '1-13' } },
            { data: { id: '1-14' } },
            { data: { id: '1-15' } },
            { data: { id: '1-16' } },
            { data: { id: '1-17' } },
            { data: { id: '1-18' } }
          ],

          edges: [
            { data: { source: '0-0', target: '0-1', id: '0-5' } },
            { data: { source: '0-1', target: '0-2', id: '0-6' } },
            { data: { source: '0-2', target: '0-3', id: '0-7' } },
            { data: { source: '0-3', target: '0-4', id: '0-8' } },
            { data: { source: '0-4', target: '0-3', id: '0-9' } },
            { data: { source: '0-0', target: '0-4', id: '0-10' } },

            { data: { source: '1-1', target: '1-2', id: '1-19' } },
            { data: { source: '1-2', target: '1-3', id: '1-20' } },
            { data: { source: '1-2', target: '1-4', id: '1-21' } },
            { data: { source: '1-2', target: '1-5', id: '1-22' } },
            { data: { source: '1-2', target: '1-6', id: '1-23' } },
            { data: { source: '1-3', target: '1-4', id: '1-24' } },
            { data: { source: '1-5', target: '1-6', id: '1-25' } },
            { data: { source: '1-5', target: '1-7', id: '1-26' } },
            { data: { source: '1-6', target: '1-7', id: '1-27' } },
            { data: { source: '1-7', target: '1-8', id: '1-28' } },
            { data: { source: '1-7', target: '1-11', id: '1-29' } },
            { data: { source: '1-8', target: '1-9', id: '1-30' } },
            { data: { source: '1-8', target: '1-11', id: '1-31' } },
            { data: { source: '1-8', target: '1-12', id: '1-32' } },
            { data: { source: '1-8', target: '1-14', id: '1-33' } },
            { data: { source: '1-8', target: '1-15', id: '1-34' } },
            { data: { source: '1-9', target: '1-10', id: '1-35' } },
            { data: { source: '1-9', target: '1-11', id: '1-36' } },
            { data: { source: '1-10', target: '1-11', id: '1-37' } },
            { data: { source: '1-10', target: '1-16', id: '1-38' } },
            { data: { source: '1-10', target: '1-17', id: '1-39' } },
            { data: { source: '1-10', target: '1-18', id: '1-40' } },
            { data: { source: '1-12', target: '1-13', id: '1-41' } },
            { data: { source: '1-13', target: '1-14', id: '1-42' } },
            { data: { source: '1-13', target: '1-15', id: '1-43' } },
            { data: { source: '1-17', target: '1-18', id: '1-44' } }
          ]
        },

        ready: function(){
          cy0 = this.filter(ele => ele.id()[0] == "0");
          cy1 = this.filter(ele => ele.id()[0] == "1");
          done();
        }
      });
    });

    function ele2id( ele ){
      return ele.id();
    }

    function edge2nodeIds( ele ){
      return [ele.source().id(), ele.target().id()];
    }

    it('eles.biconnected(): no cut vertices, one biconnected component', function(){
      var res = cy0.biconnected();
      expect(res.cutVertices.map(ele2id)).to.deep.equal([]);
      expect(res.components.length).to.equal(1);
      expect(res.components[0].map(edge2nodeIds)).to.deep.equal([["0-4","0-3"],["0-0","0-4"],["0-3","0-4"],["0-2","0-3"],["0-1","0-2"],["0-0","0-1"]]);
    });

    it('eles.biconnected(): multiple biconnected components', function(){
      var res = cy1.biconnected();
      expect(res.cutVertices.map(ele2id)).to.deep.equal(["1-2", "1-7", "1-8", "1-10"]);
      expect(res.components.length).to.equal(7);
      expect(res.components[0].map(edge2nodeIds)).to.deep.equal([["1-2","1-4"],["1-3","1-4"],["1-2","1-3"]]);
      expect(res.components[1].map(edge2nodeIds)).to.deep.equal([["1-10","1-16"]]);
      expect(res.components[2].map(edge2nodeIds)).to.deep.equal([["1-10","1-18"],["1-17","1-18"],["1-10","1-17"]]);
      expect(res.components[3].map(edge2nodeIds)).to.deep.equal([["1-8","1-15"],["1-13","1-15"],["1-8","1-14"],["1-13","1-14"],["1-12","1-13"],["1-8","1-12"]]);
      expect(res.components[4].map(edge2nodeIds)).to.deep.equal([["1-9","1-11"],["1-8","1-11"],["1-7","1-11"],["1-10","1-11"],["1-9","1-10"],["1-8","1-9"],["1-7","1-8"]]);
      expect(res.components[5].map(edge2nodeIds)).to.deep.equal([["1-5","1-7"],["1-6","1-7"],["1-2","1-6"],["1-5","1-6"],["1-2","1-5"]]);
      expect(res.components[6].map(edge2nodeIds)).to.deep.equal([["1-1","1-2"]]);
    });

  });
});
