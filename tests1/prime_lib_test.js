var expect = require('expect');
var sinon = require('sinon');

describe("primeLib -> ", function() {

  beforeEach(function (done) { 
    $("table").remove();
    $("#errorMsg").css("display", "none");
    done();
  });

  describe('isPrime(n)', function() {

      var isPrime = primeLib.isPrime;

			it('should return truthy if argument is a prime number', function(){ 
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

			expect(createTable(primes)[0]).toEqual([1].concat(primes)); 
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

        expect($("table").length).toEqual(0);
				
        renderTable(tableArr);

				expect($("table").length).toEqual(1);
        expect($("table td").first().html()).toEqual("");
        expect($('table td').last().html()).toEqual("25");
    });   
  });

  describe("isValid(n)", function() {
    it("should validate a supplied value is a number > 0.", function() { 
      
      var isValid = primeLib.isValid;
      
      expect(isValid(1)).toEqual(true);
      expect(isValid(42)).toEqual(true);  
      
			expect(isValid("test")).toEqual(false);
      expect(isValid(-1)).toEqual(false);
      expect(isValid(0)).toEqual(false);
      expect(isValid(1.1)).toEqual(false);
    });
  });

  describe("generateTable(n)", function() {
    it("should all work together", function() { 

      var generateTable = primeLib.generateTable;
      expect($("table").length).toEqual(0);			
        
      generateTable(3);
			expect($("table").length).toEqual(1);
      expect($("table td").first().html()).toEqual("");
      expect($('table td').last().html()).toEqual("25");
    });
  });

  describe("generateTable(n)", function() {
    it("should not display an error message when the correct value is entered.", function() { 

      var generateTable = primeLib.generateTable;
      expect($("#errorMsg").css("display")).toEqual("none");
        
      generateTable(3);
      expect($("#errorMsg").css("display")).toEqual("none"); 
    });

    it("should display an error message when an incorrect value is entered.", function() { 

      var generateTable = primeLib.generateTable;
      expect($("#errorMsg").css("display")).toEqual("none");
        
      generateTable(-1);
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
