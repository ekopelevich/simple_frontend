$(document).ready(function(){
  getMonkeyData().then(function( monkeyData ){
    var monkeyList = buildMonkeyList();
    renderMonkeyList( monkeyList );
  });
});

// http requests
function getMonkeyData() {
  return new Promise (function( reject, resolve){
    $.ajax({
      method: 'get',
      url: 'http://localhost:8000/monkeys',
      success: resolve,
      error: reject
    });
  });
}

// attach event handler - return formData??
function attachNewMonkeyHandler(){
    $( '.submit-monkey' ).click( function( event ){
        event.preventDefault();

        var formData = getNewMonkeyData( $(this) );
        createNewMonkey( formData ).then( function( newMonkey ){
            addNewMonkeyToList( newMonkey );
            flashCreationMessage();
        }).catch(function( error ){
            console.error( 'Unable to add monkey', error );
        });
    });
}

// get data from form - return data??
function getNewMonkeyData( form ){
    var formValues = form.serializeArray();
    return formValues.reduce(function(formattedMonkey, monkey){
        formattedMonkey[monkey.name] = monkey.value;
        return formattedMonkey;
    }, {});
}

// create new monkey - return data??
function createNewMonkey(formData){
    return new Promise(function(resolve, reject){
        $.ajax({
            method: 'post',
            url: 'http://localhost:8000/monkeys',
            data: formData,
            success: resolve,
            error: reject
        });
    });
}



function convertMonkeyObjectToListItem( monkey ){
    var monkeyNameContainer = document.createElement('p');
    var monkeyName = document.createTextNode[monkey.name].join(' ');
    monkeyNameContainer.appendChild(monkeyName);

    var monkeyDOBContainer = document.createElement('p');
    var monkeyDOB = document.createTextNode(monkey.dob);
    monkeyDOBContainer.appendChild(monkeyDOB);

    var monkeyEmailContainer = document.createElement('p');
    var monkeyEmail = document.createTextNode(monkey.email);
    monkeyEmailContainer.appendChild(monkeyEmail);

    var monkeyListItem = document.createElement('li');
    monkeyListItem.appendChild(monkeyNameContainer);
    monkeyListItem.appendChild(monkeyDOBContainer);
    monkeyListItem.appendChild(monkeyEmailContainer);

    return monkeyListItem;
}

function buildMonkeyList( monkeyData ){
  return monkeyData.monkeys.map(function( monkey, index ){
      return convertmonkeyObjectToListItem( monkey );
  });
}

function renderMonkeyList( monkeyList ){
  $('monkey-list').append( monkeyList );
}



function addNewMonkeyToList( monkey ){
    var monkeyListItem = convertMonkeyObjectToListItem( monkey );
    $( '.monkey-list' ).append( monkeyListItem );
}

function flashCreationMessage(){
    $('.creation-message').fadeIn( 300 ).delay( 2000 ).fadeOut( 300 );
}
