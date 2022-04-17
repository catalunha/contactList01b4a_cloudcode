

# Install b4a
A seguir este tutorial `https://www.back4app.com/docs/local-development/parse-cli` a instalação falha pois esta apontando para o python e atualmente no POP OS temos o python3. Então basta apontar python para o python3 com os seguintes comandos:
* Remover o antigo link com `$ sudo rm /usr/bin/python`
* Criando o novo link apontando para Python3 `$ sudo ln -s python3 /usr/bin/python`

# Account Key
 
Name: contactList01   Expires: Sun Apr 16 2023
Key: wXG4wKDj5ZqrDh4GDpo0U2N6KctZvSBRmSjbvMnb

`$ b4a configure accountkey`
Informe a chave do projeto atual ou uma chave geral.

# Deploy