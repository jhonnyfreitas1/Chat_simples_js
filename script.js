// Ao clicar em '#login-link' deve chamar a função 'loadLogin' (1,0 ponto)
// Ao clicar em '#logout-link' deve chamar a função 'logout' (1,0 ponto)
$('#login-link').on('click',function(){
    loadLogin();
    
});
$('#logout-link').on('click',function(){
    logout();
    
});

function loadLogin() {
           $.ajax( {
    method: 'GET',
    url: '/login',
    success: function(data) {
        var data = data;
       document.getElementById("content").innerHTML = data;
 
    $('#login-form').on('submit', function(e){
            e.preventDefault();
            var username = $('#login-form input[name="username"').val();
            var password = $('#login-form input[name="password"').val();
            $.ajax({
            type:'POST',
            url:'/users/login',
            datatype:'json',
            data:{username:username,password:password},
            success: function(data){
                var data = JSON.parse(data);
               console.log(data);
               if (data.username) {
                loadMain(data.username);
            }else{
                loadLogin();
                alert("nao logado");
            }
            }
        });
    });

// deve carregar na div '#content' o resultado do request a '/login' (1,0 ponto)
    // apṕos carregar o conteúdo, deve escutar os forms '#login-form' e '#register-form' (1,0 ponto)
    // ao submeter '#login-form', deve fazer um request via POST com o conteúdo do formulário para '/users/login'; caso o json de retorno tenha o atributo 'login' == true, chame a função 'loadMain' (passando como argumento o atributo 'username' do json de retorno), caso contrário chame a função 'loadLogin' (1,0 ponto)
    // ao submeter '#register-form', deve fazer um request via POST com o conteúdo do formulário para '/users/add'; caso o json de retorno tenha o atributo 'user_exists', deve exibir um alerta informando que o usuário já existe. (1,0 ponto)
            $('#register-form').on('submit', function(e){
            e.preventDefault();
            var that = this;
            var username = $('#register-form input[name="username"').val();
            var password = $('#register-form input[name="password"').val();
            $.ajax({
            type:'POST',
            url:'/users/add',
            datatype:'json',
            data: $(this).serialize(),
            data:{username:username,password:password},
            success: function(response){
                response =  JSON.parse(response);
                    var response = response;
               if (response.user_exists){
              alert("ja existe");
           }else {
            alert("Adicionado com sucesso");
           }
            console.log(response);
            }
        });
    });




           } 
});
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

    $.ajax( {
    method: 'GET',
    url: '/main',
    success: function(data) {
        var data = data;
       document.getElementById("content").innerHTML = data;
         


          $('#add-message').on('submit', function(e){
            e.preventDefault();
            var that = this;
            var messege = $('#add-message input[name="message"').val();
            
            $.ajax({
            type:'POST',
            url:'/messages/add',
            datatype:'json',
            data: $(this).serialize(),
            data:{message:messege},
            success: function(response){
                console.log(messege);
                response =  JSON.parse(response);
               if (response.inserted){
                loadMessages();
            }else {
            alert("Houve um erro");
           }
            console.log(response);
            }


        });
    });         // deve carregar na div '#content' o resultado do request a '/main' (1,0 ponto)
    // após carregar o conteúdo, deve escutar o form '#add-message' (1,0 ponto)
    // ao submeter o '#add-message', deve fazer um request via POST com o conteúdo do formulário para '/messages/add'; caso no json de resposta o atributo 'inserted' for diferente de true, exiba um alerta informando que houve um erro; caso contrário, chame a função 'loadMessages' (1,0 ponto)
    // após carregar o conteúdo, ainda, faça com que as funções loadUsers e loadMessages sejam chamadas a cada 2 segundos (1,0 ponto)
setInterval(function() {
    loadUsers();
    loadMessages();
        }, 2000);

         }
})      



 }
function logout() {
    // deve fazer um request para '/users/logout' e, quando bem sucedida, chamar a função 'loadLogin' (1,0 ponto)
         $.ajax( {
    method: 'GET',
    url: 'users/logout',
    success: function() {
        loadLogin();
    } 
});

}


$.ajax( {
    method: 'GET',
    url: '/user/is-logged',
    success: function(data) {
       var  data = JSON.parse(data);
        if (data.isLogged) {
            loadMain(data.username);
        } else {
            loadLogin();
        }
    } 
});

