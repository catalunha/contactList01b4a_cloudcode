

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
# Codigos teste
```js
  //+++ destroy modo 1
  console.log("get1 Address...");
  const address = new Parse.Object('Address');
  address.id=contactAddress.id;
  console.log("address1.cep: "+ address.get("cep"));
  await address.destroy({ useMasterKey: true });
  //--- destroy modo 1

  //+++ destroy modo 3
  console.log("get3 Address...");
  const Address = Parse.Object.extend('Address');
  const query = new Parse.Query(Address);
  const address = await query.get(contactAddress.id);
  console.log("address3.cep: "+ address.get("cep"));
	await address.destroy();
  //--- destroy modo 3


//Funciona mas estou buscando uma forma mais otimizada.
Parse.Cloud.beforeDelete("Contact", async (req) => {
  console.log("beforeDelete: Contact ...");
  console.log("object: ", req.object);
  console.log("id: ", req.object.id);
  let reqt = req.object;
  const name = reqt.get("name")
  const contactAddress = reqt.get("address")
  console.log("name: ", name);
  console.log("address.id: "+ contactAddress.id);
  //+++ destroy modo 1
  // console.log("get1 Address...");
  // const address = new Parse.Object('Address');
  // address.id=contactAddress.id;
  // console.log("address1.cep: "+ address.get("cep"));
  // await address.destroy({ useMasterKey: true });
  //--- destroy modo 1
  //+++ destroy modo 2
  // console.log("get2 Address...");
  // const Address = Parse.Object.extend('Address');
  // const address = new Address();
	// address.id = contactAddress.id;
  // console.log("address2.cep: "+ address.get("cep"));
	// await address.destroy();
  //--- destroy modo 2
  //+++ destroy modo 3
  console.log("get3 Address...");
  const Address = Parse.Object.extend('Address');
  const query = new Parse.Query(Address);
  const address = await query.get(contactAddress.id);
  console.log("address3.cep: "+ address.get("cep"));
	await address.destroy();
  //--- destroy modo 3
  //
  // const query = new Parse.Query('Contact');
  // query.equalTo("objectId", req.object.id);
  // const contactQuery = await query.find({ useMasterKey: true });
  // try {
  //   for (const object of contactQuery) {
  //     console.log("contactQuery...");
  //     const address = object.get("address");
  //     console.log("address: ", address);
  //     console.log("id: ", address.id);
  //     //Delete address to this contact
  //     const queryAddress = new Parse.Query('Address');
  //     queryAddress.equalTo("objectId", address.id);
  //     // +++ Modo 01
  //     // queryAddress.find({ useMasterKey: true })
  //     //   .then((list)=>{Parse.Object.destroyAll(list,{ useMasterKey: true });})
  //     //   .catch((error) => {
  //       //     console.error("Error finding related Address " + error.code + ": " + error.message);
  //       //   });
  //     // --- Modo 01
  //     // +++ Modo 02
  //     const resultsQueryAddress = await queryAddress.find({ useMasterKey: true });
  //     try {
  //       for (const object of resultsQueryAddress) {
  //         console.log("destroying.id: ", object.id);
  //         object.destroy();
  //       }
  //     } catch (error) {
  //       console.error('Error while destroying Address'  + error.code + ": " + error.message);
  //     }
  //     // --- Modo 02
  //   }
  // } catch (error) {
  //   console.error('Error while fetching Contact'  + error.code + ": " + error.message);
  // }
});

```
