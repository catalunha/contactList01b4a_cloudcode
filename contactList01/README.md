

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

```
$ b4a deploy
```

# support
This is my code in CloudCode for when I delete a user, delete their contacts.
```js
Parse.Cloud.beforeDelete(Parse.User,async  (req) => {
  console.log('beforeDelete: User ...');
	const query = new Parse.Query('Contact');
  query.equalTo('createdByUser',req.object);
  let results = await query.find();
  for(let i=0;i<results.length;++i){
    console.log(i);
    console.log(results[i].objectId);
    results[i].destroy({useMasterKey:true});
  }
});
```
My 'User' class is Public for Read/Write/AddField
My 'Contact' class is Authenticated for Read/Write/AddField

I cannot delete a 'User'. And I have this message:
2022-04-21T18:58:51.256Z - Parse error:  Permission denied, user needs to be authenticated.
2022-04-21T18:58:51.256Z - beforeDelete failed for _User for user undefined:
  Input: {"username":"marciocatalunha@gmail.com","email":"marciocatalunha@gmail.com","emailVerified":true,"createdAt":"2022-04-21T18:55:02.279Z","updatedAt":"2022-04-21T18:55:08.404Z","ACL":{"*":{"read":true},"e0kNUm7A84":{"read":true,"write":true}},"objectId":"e0kNUm7A84"}
  Error: {"message":"Permission denied, user needs to be authenticated.","code":101}

Why can't I delete the 'User' and not the 'Contacts' associated with it with 'Pointer' ?