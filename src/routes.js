const { Router } = require('express');
var aio = require('asterisk.io'),
        ami = null;
    // Aqui voce sobre as informações do ser manager no asterisk
    ami = aio.ami('IP_Servidor', 5038, 'USUARIO', 'SENHA');

    ami.on('error', function(err){
        throw err;
    });


const routes = Router();

routes.post('/', (request, response) => {
    console.log(request.body);
    var ramal = (request.body.ramal); // Variavel que irá receber o ramal via json
    var numero = (request.body.numero); // Variavel que irá receber o numero via json
    response.json({ mesage: 'Chamada enviada' });
       ami.action(
            'Originate',
            {
                Channel: 'SIP/TRONCO/' + numero, // Rota por onde irá sair a chamada Ex. SIP/VONO/55 IAX/VONO/55 
                Context: 'from-internal', // Contexto de Discagem
                Priority: 1, // Prioridade
                Async: 'false', 
                Exten: (ramal) // Ramal que irá atender a chamada
            },
            function(data){
                if(data.Response == 'Error'){
                    console.log('Originate', data.Message);
                    return;
                }
                console.log('Originate', data.Message);
            }
        );
    });
module.exports = routes;