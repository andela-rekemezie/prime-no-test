var jsdom = require('jsdom');
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