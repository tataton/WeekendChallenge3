/* A simple calculator, in which computations are run on a server instead
of a client, and that cannot deal with sequential operations. (So, a pretty
unusual calculator, but hey.) */

var displayText = '0';
var bufferText = '';
var operation = '';

$(document).ready(function(){
  updateDisplay();
});

$(document).on('click', '.numeric', function(){
  emptySolution();
  var enteredNumber = $(this).data('value');
  if (displayText == '0') {
    displayText = $(this).attr('data-value');
  } else if (displayText == '-0') {
    displayText = '-' + $(this).attr('data-value');
  } else {
    displayText += $(this).attr('data-value');
  }
  updateDisplay();
});

$(document).on('click', '#period', function(){
  emptySolution();
  if (!(displayText.includes('.'))) {
    displayText += '.';
  }
  updateDisplay();
});

$(document).on('click', '#plus-minus', function(){
  emptySolution();
  if (displayText.charAt(0) == '-') {
    displayText = displayText.substr(1);
  } else {
    displayText = '-' + displayText;
  }
  updateDisplay();
});

$(document).on('click', '.operator', function(){
  emptySolution();
  bufferText = displayText;
  displayText = '0';
  operation = $(this).data('value');
  updateDisplay();
});

$(document).on('click', '#clear-display', function(){
  emptySolution();
  displayText = '0';
  updateDisplay();
});

$(document).on('click', '#clear-all', function(){
  displayText = '0';
  bufferText = '';
  operation = '';
  updateDisplay();
});

$(document).on('click', '#enter', function(){
  var targetURL;
  if (bufferText.length !== 0) {
    targetURL = '/' + operation;
    $.ajax({
      type: "POST",
      data: {num1: bufferText, num2: displayText},
      url: targetURL,
      success: function(response){
        setSolution(response.result);
      },
      error: function(){
        console.log('AJAX error.');
      }
    }); // end ajax
  }
});

var setSolution= function(solution){
  displayText = solution;
  bufferText = 'solution:';
  operation = '';
  updateDisplay();
};

var emptySolution = function(){
  if (bufferText == 'solution:') {
    bufferText = '';
    displayText = '0';
  }
};

var updateDisplay = function(){
  var operationText;
  switch (operation) {
    case 'add':
      operationText = '+';
      break;
    case 'subtract':
      operationText = '-';
      break;
    case 'multiply':
      operationText = 'x';
      break;
    case 'divide':
      operationText = '/';
      break;
    default:
      operationText = '';
  }
  $('#buffer').text(bufferText + ' ' + operationText);
  $('#displayText').text(displayText);
};
