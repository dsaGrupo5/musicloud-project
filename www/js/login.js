var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var USERNAME = "";
var PASSWORD = "";

//REVISAR COMO FUNCIONAN LAS COOKIES Y COMO SE CONSTRUYE EL POST QUE SE ENVIA A LA API

$(document).ready(function() {
});

$("#login_in").click(function(e) {
	
	e.preventDefault();
	if($("#idusuario").val() == "" || $("#password").val() == "")
	{
		if($("#idusuario").val() == "")
		{
			document.getElementById('idusuario').style.background='#F6B5B5';
			$('#idusuario').attr('placeholder','RELLENE EL CAMPO');
		}
		if($("#password").val() == "")
		{
			document.getElementById('password').style.background='#F6B5B5';
			$('#password').attr('placeholder','RELLENE EL CAMPO');
		}
	}
	else
	{
	var login = $("#idusuario").val();
	var password = $("#password").val();	
	getlogin(login, password);
	}
});

function getlogin(login, password)
{ 	
alert ('entra en getlogin');
	var url = API_BASE_URL + '/login/login_in';		
	$.post( url,{login: login,password : password}).done(function(data, status, jqxhr) //como se esta construyendo esta ruta?

		{
			if(data.role== 'registrado')
			{
				alert ('entra en registrado');
				$.cookie('login', login);
				$.cookie('userid', data.userid);
				$.cookie('token', data.token);
				
			    window.location = "http://localhost/registro.html" ;
			}
			if(data.role== 'administrador')
			{
				$.cookie('login', login);
				$.cookie('userid', data.userid);
				$.cookie('token', data.token);
				window.location = "http://localhost/contacto.html" ;
			}
		})
	    .fail( function( jqXHR, textStatus, errorThrown )
		{ 
		//CAMBIAR EL COLOR
		alert ('fallo login');
			document.getElementById('idusuario').style.background='#F6B5B5';
			document.getElementById('idusuario').value=null;
			$('#idusuario').attr('placeholder','USUARIO NO REGISTRADO');
		});

}