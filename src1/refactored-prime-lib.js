var primeLib = (function() {

  function isPrime(n) {
    // There's no obvious reason keep your index counter outside the loop. 
    // It is supposed to be scoped to the block. I moved it in there.
    var prime; 

    isPrime.answers = isPrime.answers || {};

    if (isPrime.answers[n] !== undefined) {
      return isPrime.answers[n];
    }

    prime = n > 1;

    // You are performing a length check for each iteration which increases the runtime remarkably
    for (var i = 2, len = Math.sqrt(n); i <= len; i++) {
      if (n % i === 0) {
        prime = false;
        break;
      } 
    }
    return isPrime.answers[n] = prime;
  }

  function generatePrimes(n) {
    var arr = [],
      i = 0;

    while (arr.length < n) {
      if (isPrime(i)) {
        arr.push(i);
      }
      i++;
    }
    return arr;
  }

  function createTable(primes) {
    return [1].concat(primes).map((n, i, arr) => {
      return arr.map((n1) => {
        return n !== 1 ? n * n1 : n1;
      });
    });
  }

  function renderTable(tableArr) {
    $("table").remove();

    var $table = $("<table><tbody>")
      .appendTo("#content");

    // Just a side note. 'forEach'e is terrible on some IE browsers.
    // And remarkable slow for large data set. Prefer 'for'  
    tableArr.forEach((row, i) => {
      var $tr = $("<tr>").appendTo($table);
      row.forEach((n, j) => {
        $("<td>").appendTo($tr).text((i || j) ? n : "");
      });
    });
  }

  function isValid(n) {
    return n % 1 === 0 && parseInt(n, 10) > 0;
  }

  function generateTable(n) {
    $("#errorMsg").css("display", "none");

    if (!isValid(n)) {
      $("#errorMsg").css("display", "block");
      return false;
    }

    renderTable(
      createTable(generatePrimes(parseInt(n, 10)))
    );
  }

  // I don't see the use case for calling your init function on each load.
  // Also, you don't need to wrap the task in a function as it automatically executes when the action is triggered.
  
  //  function init() {
    $("#btnGo").on("click", function(e) { 
      generateTable( $("#numberInput").val() );
    });

    $('#numberInput').on("keyup", function(e) {
      if (e.keyCode === 13) {
          generateTable( $(this).val() );
      }
    });
  // }

  // init();
 
  return {
    isPrime: isPrime,
    generatePrimes: generatePrimes,
    createTable: createTable,
    renderTable: renderTable,
    isValid: isValid,
    generateTable: generateTable
  }
})($); // I tried scoping the jQuery here. 
       // This is pretty much useful if you're using browserify or webpack to serve your build files to the front end

if (typeof module !== "undefined" && module.exports !== null) {
    module.exports = primeLib;
}
