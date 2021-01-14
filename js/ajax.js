const BASE_URL = 'https://reqres.in/api/users/';
const POST_URL = 'https://httpbin.org/post';

/**
 * Código principal dentro del evento load
 * para asegurar la carga de todos los componentes.
 **/
window.addEventListener( 'load', ( ev ) => {
  let numsecs = document.getElementById( 'numsecs' );
  let user = document.getElementById( 'user' );
  let boton = document.querySelector( 'button' );

  boton.addEventListener( 'click', ( ev ) => {
    ev.preventDefault( );
    clearFields( );
    //Aquí se ejecutan las 2 funciones.
    fetchGet( numsecs.value, user.value );
    fetchPost( );
  } );
} );

function clearFields( ) {
  document.querySelectorAll( 'span' )
  .forEach( ( element ) => {
    element.innerHTML = '';
    console.log( element );
  } );
}

/**
 * Defino la función fetchGet para obtener los datos a través del Get,
 * con el id y números de retraso indicados por el usuario. 
 **/
function fetchGet( numsecs, user ) {
  fetch( BASE_URL + user + '?delay=' + numsecs )
  .then( ( response ) => {
    document.getElementById( "status" )
    .innerHTML = response.status;
    return response.json( );

  } )

  // Si todo funciona correctamente se envía la información como
  // el id, email y nombre. 
  .then( ( jsonCliente ) => {
    document.getElementById( "id" )
    .innerHTML = jsonCliente.data.id;
    document.getElementById( "email" )
    .innerHTML = jsonCliente.data.email;
    document.getElementById( "name" )
    .innerHTML = jsonCliente.data.first_name;

  } )

  //En caso de error se lanza el mensage correspondiente.
  .catch( ( error ) => {
    console.log( "Ha ocurrido un error: " );
    console.log( error.message );

  } );

}

/**
 * Defino la función fetchPost para envíar los datos a través del Post.
 **/
function fetchPost( ) {

  let data = {
    title: "Mensaje Informativo"
    , segundosRetraso: numsecs.value
    , usuarioId: user.value
  }

  // URL del Post con el método y los datos a procesar en formato JSON.
  fetch( POST_URL, {
    method: 'POST'
    , body: JSON.stringify( data )
  } )

  .then( ( response ) => {
    return response.json( );
  } )

  // Muestra los datos del Post por consola, como el id y segundos.
  .then( json => {
    console.log( json.data )
  } )

  .catch( err => {
    console.log( "Ha ocurrido un error: " );
    console.log( err.message );
  } );
}
