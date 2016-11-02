var expect = require("chai").expect;
var jsdom = require("jsdom");
var $, primeLib;


describe("primeLib -> ", function() {

  before(() => {
    global.document = jsdom.jsdom('<body></body>');
    global.window = document.defaultView;
    $ = require('jquery');
    global.$ = $;

    primeLib = require("../src/prime_lib.js");

    var html = "";
      html += "<div id='controls'>";
      html += "  <input type='text' id='numberInput'/>";
      html += "  <button id='btnGo'>Generate Table</button>";
      html += "  <span id='errorMsg' style='display:none;'></span>";
      html += "</div>";
      html += "<div id='content'></div>";

    $("body").html(html);
  });

  beforeEach(() => {
    $("table").remove();
    $("#errorMsg").css("display", "none");
  });

  describe('isPrime(n)', function() {
    it("should verify whether a supplied argument is a prime number.", function() { 
      
      var isPrime = primeLib.isPrime;

      expect(isPrime(-1), "-1 should be false").to.equal(false);
      expect(isPrime(0), "0 should be false").to.equal(false);
      expect(isPrime(1), "1 should be false").to.equal(false);
      expect(isPrime(2), "2 should be true").to.equal(true);
      expect(isPrime(3), "3 should be true").to.equal(true);
      expect(isPrime(4), "4 should be false").to.equal(false);
      expect(isPrime(97), "97 should be true").to.equal(true);
      expect(isPrime(100), "100 should be false").to.equal(false);
    });  
  });

  describe('generatePrimes(n)', function() {
    it("should return an array of n prime numbers.", function() { 
      
      var generatePrimes = primeLib.generatePrimes;

      expect(generatePrimes(3)).to.eql([2, 3, 5]);
      expect(generatePrimes(1)).to.eql([2]);
      expect(generatePrimes(6).length).to.equal(6);
      expect(generatePrimes(4)).to.not.include(1);
      expect(generatePrimes(6)).to.not.include(4);
      expect(generatePrimes(5)).to.include(11);
    });  
  });

  describe('createTable(arr)', function() {
    it("should return a 2D array of multiplied values.", function() { 
      
      var createTable = primeLib.createTable;
      var primes = [2, 3, 5];

      expect(createTable(primes)[0]).to.eql([1].concat(primes));
      expect(createTable(primes)[1]).to.eql([2, 4, 6, 10]);
      expect(createTable(primes)[2]).to.eql([3, 6, 9, 15]);
      expect(createTable(primes)[3]).to.eql([5, 10, 15, 25]);
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

        expect($("table").length, "there should be no table in the dom").to.equal(0);
        
        renderTable(tableArr);
        expect($("table").length).to.equal(1);
        expect($("table td").first().html(), "first cell should be empty").to.equal("");
        expect($('table td').last().html(), "last cell should have 25").to.equal("25");
    });   
  });

  describe("isValid(n)", function() {
    it("should validate a supplied value is a number > 0.", function() { 
      
      var isValid = primeLib.isValid;
      
      expect(isValid("test"), "'test' should be false").to.equal(false);
      expect(isValid(-1), "-1 should be false").to.equal(false);
      expect(isValid(0), "0 should be false").to.equal(false);
      expect(isValid(1), "1 should be true").to.equal(true);
      expect(isValid(1.1), "1 should be true").to.equal(false);
      expect(isValid(42), "42 should be true").to.equal(true);  
    });
  });

  describe("generateTable(n)", function() {
    it("should all work together", function() { 

      var generateTable = primeLib.generateTable;
      expect($("table").length).to.equal(0);
        
      generateTable(3);
      expect($("table").length).to.equal(1);
      expect($("table td").first().html(), "first cell should be empty").to.equal("");
      expect($('table td').last().html(), "last cell should have 25").to.equal("25");
    });
  });

  describe("generateTable(n)", function() {
    it("should not display an error message when the correct value is entered.", function() { 

      var generateTable = primeLib.generateTable;
      expect($("#errorMsg").css("display")).to.equal("none");
        
      generateTable(3);
      expect($("#errorMsg").css("display")).to.equal("none");  
    });

    it("should display an error message when an incorrect value is entered.", function() { 

      var generateTable = primeLib.generateTable;
      expect($("#errorMsg").css("display")).to.equal("none");
        
      generateTable(-1);
      expect($("#errorMsg").css("display")).to.equal("block");
      
    });
  });
});
