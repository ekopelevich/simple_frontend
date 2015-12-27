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
    $( '.submit-monkey' ).click( function( event ){
        event.preventDefault();

        var formData = getNewMonkeyData( $(this) );
        createNewMonkey( formData )
        .then( function( newMonkey ){
            addNewMonkeyToList( newMonkey );
            flashCreationMessage();
        })
        .catch( function( error ){
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

// create new monkey - return promise
function createNewMonkey(formData){
  return $.post('http://localhost:8000/monkeys', function( data ){
    console.log('New monkey posted');
  });
}


function addNewMonkeyToList( monkey ){
    var monkeyListItem = convertMonkeyObjectToListItem( monkey );
    $( '.monkey-list' ).append( monkeyListItem );
}

function flashCreationMessage(){
    $('.creation-message').fadeIn( 300 ).delay( 2000 ).fadeOut( 300 );
}
