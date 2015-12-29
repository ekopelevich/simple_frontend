$(document).ready(function(){
  getMonkeyData()
  .then(function( monkeyData ){
    console.log( monkeyData);
    var monkeyList = buildMonkeyList( monkeyData );
    renderMonkeyList( monkeyList );
  });
  attachNewMonkeyHandler();
});

// http get request
function getMonkeyData() {
  return $.get('http://localhost:8000/monkeys');
}

function buildMonkeyList( monkeyData ){
  return monkeyData.monkeys.map(function( monkey, index ){
      return convertMonkeyObjectToListItem( monkey );
  });
}

function convertMonkeyObjectToListItem( monkey ){
    var monkeyNameContainer = document.createElement('p');
    var monkeyName = document.createTextNode(monkey.name);
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

function renderMonkeyList( monkeyList ){
  $('.monkey-list').append( monkeyList );
}

// attach event handler - return formData
function attachNewMonkeyHandler(){
    $( '.monkey-form' ).submit( function( event ){
        event.preventDefault();

        $.post('http://localhost:8000/monkeys', $('.monkey-form').serialize() )
        .done( function( newMonkey ){
            addNewMonkeyToList( newMonkey );
        })
        .fail( function( error ){
            console.error( 'Unable to add monkey', error );
        });
    });
}

function addNewMonkeyToList( monkey ){
    var monkeyListItem = convertMonkeyObjectToListItem( monkey );
    $( '.monkey-list' ).append( monkeyListItem );
}
