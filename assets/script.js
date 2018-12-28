// Ao clicar em '#login-link' deve chamar a função 'loadLogin' (1,0 ponto)
// Ao clicar em '#logout-link' deve chamar a função 'logout' (1,0 ponto)

function loadLogin() {
    $('#logout').addClass('hide');
    $('#login').removeClass('hide');

    // deve carregar na div '#content' o resultado do request a '/login' (1,0 ponto)
    // apṕos carregar o conteúdo, deve escutar os forms '#login-form' e '#register-form' (1,0 ponto)
    // ao submeter '#login-form', deve fazer um request via POST com o conteúdo do formulário para '/users/login'; caso o json de retorno tenha o atributo 'login' == true, chame a função 'loadMain' (passando como argumento o atributo 'username' do json de retorno), caso contrário chame a função 'loadLogin' (1,0 ponto)
    // ao submeter '#register-form', deve fazer um request via POST com o conteúdo do formulário para '/users/add'; caso o json de retorno tenha o atributo 'user_exists', deve exibir um alerta informando que o usuário já existe. (1,0 ponto)

}

function loadMessages() {
    $('#messages').load('/messages/get');
}

function loadUsers() {
    $('#users').load('/users/list-logged');
}

function loadMain(username) {
    $('#username').html(username);
    $('#login').addClass('hide');
    $('#logout').removeClass('hide');

    // deve carregar na div '#content' o resultado do request a '/main' (1,0 ponto)
    // após carregar o conteúdo, deve escutar o form '#add-message' (1,0 ponto)
    // ao submeter o '#add-message', deve fazer um request via POST com o conteúdo do formulário para '/messages/add'; caso no json de resposta o atributo 'inserted' for diferente de true, exiba um alerta informando que houve um erro; caso contrário, chame a função 'loadMessages' (1,0 ponto)
    // após carregar o conteúdo, ainda, faça com que as funções loadUsers e loadMessages sejam chamadas a cada 2 segundos (1,0 ponto)
}

function logout() {
    // deve fazer um request para '/users/logout' e, quando bem sucedida, chamar a função 'loadLogin' (1,0 ponto)
}


//$.ajax({
  //  method: 'GET',
  //  url: '/user/is-logged',
   // success: function(data) {
   ///     data = JSON.parse(data);
   //     if (data.isLogged) {
   //         loadMain(data.username);
    //    } else {
    ///        loadLogin();
    //    }
 //   }
//});
$('#add_prod').on('submit', function(e) {
   var that = this;
   e.preventDefault();

}
});