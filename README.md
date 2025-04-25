# auth-role-system

controller => classes que possuem cada subrota (funcao) e chama um 

handlers => responsavel pela lógica do endpoint, chama services

middlewares => middlewares de validação, tokens, etc...

routes => rotas auth, role, log e chamam as controllers

services => funções que chamam diretamente funções do banco, redis...

utils => utilitarios, funções de calculo etc

validators => middleware entre cada controller e handler para validar dados da request


route => controller 

/auth => auth.controller.js

auth.controller.js
    - /login => login.handler.js
    - /register => register.handler.js

login.handler.js
    - redis.service.js => token é valido