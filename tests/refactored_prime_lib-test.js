// var expect = require("chai").expect;

// Why I would prefer expect as the assertion library is because of its tiny API
// chai combines both the expect, should, etc, which adds to the overhead of your application
var expect = require('expect');
var sinon = require('sinon');

describe("primeLib -> ", function() {

  beforeEach(function (done) { // I removed arrow function to ensure consistency
    $("table").remove();
    $("#errorMsg").css("display", "none");
    done();
  });

  describe('isPrime(n)', function() {
    // it("should verify whether a supplied argument is a prime number.", function() { 
      
      var isPrime = primeLib.isPrime;
        // console.log(primeLab, 'primeLa')
      // expect(isPrime(-1), "-1 should be false").to.equal(false);
      // expect(isPrime(0), "0 should be false").to.equal(false);
      // expect(isPrime(1), "1 should be false").to.equal(false);
      // expect(isPrime(2), "2 should be true").to.equal(true);
      // expect(isPrime(3), "3 should be true").to.equal(true);
      // expect(isPrime(4), "4 should be false").to.equal(false);
      // expect(isPrime(97), "97 should be true").to.equal(true);
      // expect(isPrime(100), "100 should be false").to.equal(false);
    // });  

			it('should return truthy if argument is a prime number', function(){ // Try to break the test specs to test for same category
				expect(isPrime(2)).toEqual(true);
				expect(isPrime(3)).toEqual(true);
				expect(isPrime(97)).toEqual(true);
			});

			it('should return falsy if argument is not a prime number', function(){
				expect(isPrime(-1)).toEqual(false);
				expect(isPrime(0)).toEqual(false);
				expect(isPrime(1)).toEqual(false);
				expect(isPrime(4)).toEqual(false);
				expect(isPrime(100)).toEqual(false);
			});
  });

  describe('generatePrimes(n)', function() {
    it("should return an array of n prime numbers.", function() { 
      
      var generatePrimes = primeLib.generatePrimes;

      // expect(generatePrimes(3)).to.eql([2, 3, 5]);
      // expect(generatePrimes(1)).to.eql([2]);
      // expect(generatePrimes(6).length).to.equal(6);
      // expect(generatePrimes(4)).to.not.include(1);
      // expect(generatePrimes(6)).to.not.include(4);
      // expect(generatePrimes(5)).to.include(11);

			expect(generatePrimes(3)).toEqual([2, 3, 5]);
      expect(generatePrimes(1)).toEqual([2]);
      expect(generatePrimes(6).length).toEqual(6);
      expect(generatePrimes(4)).toExclude(1);
      expect(generatePrimes(6)).toExclude(4);
      expect(generatePrimes(5)).toInclude(11);
    });  
  });

  describe('createTable(arr)', function() {
    it("should return a 2D array of multiplied values.", function() { 
      
      var createTable = primeLib.createTable;
      var primes = [2, 3, 5];

      // expect(createTable(primes)[0]).to.eql([1].concat(primes));
      // expect(createTable(primes)[1]).to.eql([2, 4, 6, 10]);
      // expect(createTable(primes)[2]).to.eql([3, 6, 9, 15]);
      // expect(createTable(primes)[3]).to.eql([5, 10, 15, 25]);

			expect(createTable(primes)[0]).toEqual([1].concat(primes)); // Not a bad idea if you're explicit [1, 2, 3, 4, 5]. Test result should be pretty simple;
      expect(createTable(primes)[1]).toEqual([2, 4, 6, 10]);
      expect(createTable(primes)[2]).toEqual([3, 6, 9, 15]);
      expect(createTable(primes)[3]).toEqual([5, 10, 15, 25]);
    }); 
  });

  describe('renderTable(arr)', function() {
    it("should render a 2D array as a table in the DOM.", function() { 

        var renderTable = primeLib.renderTable,
          $content = $("#content"),
          tableArr = [
            [1, 2, 3, 5],
            [2, 4, 6, 10],
            [3, 6, 9, 15],
            [5, 10, 15, 25]
          ];

        // expect($("table").length, "there should be no table in the dom").to.equal(0);
        expect($("table").length).toEqual(0);
				
        renderTable(tableArr);
        // expect($("table").length).to.equal(1);
        // expect($("table td").first().html(), "first cell should be empty").to.equal("");
        // expect($('table td').last().html(), "last cell should have 25").to.equal("25");

				expect($("table").length).toEqual(1);
        expect($("table td").first().html()).toEqual("");
        expect($('table td').last().html()).toEqual("25");
    });   
  });

  describe("isValid(n)", function() {
    it("should validate a supplied value is a number > 0.", function() { 
      
      var isValid = primeLib.isValid;
      
      // expect(isValid("test"), "'test' should be false").to.equal(false);
      // expect(isValid(-1), "-1 should be false").to.equal(false);
      // expect(isValid(0), "0 should be false").to.equal(false);
      // expect(isValid(1), "1 should be true").to.equal(true);
      // expect(isValid(1.1), "1 should be true").to.equal(false);
      // expect(isValid(42), "42 should be true").to.equal(true); 

      expect(isValid(1)).toEqual(true);
      expect(isValid(42)).toEqual(true);  
      
      // Yes, you could break assertions below into a separate spec for modularity.
			expect(isValid("test")).toEqual(false);
      expect(isValid(-1)).toEqual(false);
      expect(isValid(0)).toEqual(false);
      expect(isValid(1.1)).toEqual(false);
    });
  });

  describe("generateTable(n)", function() {
    it("should all work together", function() { 

      var generateTable = primeLib.generateTable;
      // expect($("table").length).to.equal(0);
      expect($("table").length).toEqual(0);			
        
      generateTable(3);
      // expect($("table").length).to.equal(1);
      // expect($("table td").first().html(), "first cell should be empty").to.equal("");
      // expect($('table td').last().html(), "last cell should have 25").to.equal("25");

			expect($("table").length).toEqual(1);
      expect($("table td").first().html()).toEqual("");
      expect($('table td').last().html()).toEqual("25");
    });
  });

  describe("generateTable(n)", function() {
    it("should not display an error message when the correct value is entered.", function() { 

      var generateTable = primeLib.generateTable;
      // expect($("#errorMsg").css("display")).to.equal("none");
      expect($("#errorMsg").css("display")).toEqual("none");
			
        
      generateTable(3);
      // expect($("#errorMsg").css("display")).to.equal("none"); 
      expect($("#errorMsg").css("display")).toEqual("none"); 
    });

    it("should display an error message when an incorrect value is entered.", function() { 

      var generateTable = primeLib.generateTable;
      // expect($("#errorMsg").css("display")).to.equal("none");
      expect($("#errorMsg").css("display")).toEqual("none");
        
      generateTable(-1);
      // expect($("#errorMsg").css("display")).to.equal("block");
      expect($("#errorMsg").css("display")).toEqual("block");			
    });
  });

	describe("Click event ->", function(){
		it('should call generateTable when btnGo is clicked', function() {
      var spyClick = sinon.spy($("#btnGo"), 'click');
      $('#btnGo').trigger('click');

      expect('click').toHaveBeenCalled;
      expect(primeLib.generateTable).toHaveBeenCalled;
      expect(spyClick).toHaveBeenCalled;
    })
	})
});
