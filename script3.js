// Ao clicar em '#login-link' deve chamar a função 'loadLogin' (1,0 ponto)
// Ao clicar em '#logout-link' deve chamar a função 'logout' (1,0 ponto)
 
$('#login-link').on('click',function(){
    loadLogin();
});
$('#logout-link').on('click',function(){
    loadLogin();
});
 function loadLogin() {
    $('#logout').addClass('hide');
    $('#login').removeClass('hide');
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState===4&&xmlHttp.status === 200) {
        document.getElementById("content").innerHTML = xmlHttp.responseText;

        
         $('#login-form').on('submit', function(e){
            e.preventDefault();
            var username = $('#login-form input[name="username"').val();
            var password = $('#login-form input[name="password"').val();

            $.ajax({
            url:'',
            type:'POST',
            datatype:'json',
            data:{username:username,password:password},
            success: function(data){
                 var data = data;
                
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function(){
                if (xmlHttp.readyState===4&&xmlHttp.status === 200) 
                var url = "/users/logout";
                xmlHttp.open("GET",url,true);
                xmlHttp.send(); 

                loadLogin();
    
                 };
               }
            


          });
            
        }


    );
        $('#register-form').on('submit', function(e){
            e.preventDefault();
            var username = $('#login-form input[name="username"').val();
            var password = $('#login-form input[name="password"').val();

            $.ajax({
            url:'/users/add',
            type:'POST',
            datatype:'json',
            data:{username:username,password:password},
            success: function(data){
                
    
            }
        });
    });


    }
    };
    var url = "/login";
    xmlHttp.open("GET",url,true);
    xmlHttp.send(); 
    loadMain();
   

};      

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


    $('#add-message').on('submit', function(e){
            e.preventDefault();
            var mensagem = $('input[name="message"').val();
    
        
            $.ajax({
            url:'/messages/add',
            type:'POST',
            datatype:'json',
            data:{message:message},
            success: function(data){
            alert("Enviado");
             listar();
                
            }
        });
    });




    // deve carregar na div '#content' o resultado do request a '/main' (1,0 ponto)
    // após carregar o conteúdo, deve escutar o form '#add-message' (1,0 ponto)
    // ao submeter o '#add-message', deve fazer um request via POST com o conteúdo do formulário para '/messages/add'; caso no json de resposta o atributo 'inserted' for diferente de true, exiba um alerta informando que houve um erro; caso contrário, chame a função 'loadMessages' (1,0 ponto)
    // após carregar o conteúdo, ainda, faça com que as funções loadUsers e loadMessages sejam chamadas a cada 2 segundos (1,0 ponto)
}

function logout() {
    // deve fazer um request para '/users/logout' e, quando bem sucedida, chamar a função 'loadLogin' (1,0 ponto)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState===4&&xmlHttp.status === 200) 
    var url = "/users/logout";
    xmlHttp.open("GET",url,true);
    xmlHttp.send(); 

        loadLogin();
    
    };
   

}


$.ajax({
    method: 'GET',
    url: '/user/is-logged',
    success: function(data) {
        data = JSON.parse(data);
        if (data.isLogged) {
            loadMain(data.username);
        } else {
           loadLogin();
        }
    }
});

