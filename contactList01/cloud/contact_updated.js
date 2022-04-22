
Parse.Cloud.beforeDelete(Parse.User,async (req) => {
  console.log('beforeDelete: User ...');
  const query = new Parse.Query('Contact');
  query.equalTo('createdByUser', req.object);
  let results = await query.find({useMasterKey:true});
    
  await Parse.Object.destroyAll(results, {useMasterKey: true});
});

//Funciona mas estou buscando uma forma mais otimizada.
Parse.Cloud.beforeDelete("Contact", async (req) => {
  console.log("beforeDelete: Contact ...");
  console.log("object: ", req.object);
  console.log("id: ", req.object.id);
  console.log("query of Contact...");
  const query = new Parse.Query('Contact');
  query.equalTo("objectId", req.object.id);
  const contactQuery = await query.find({ useMasterKey: true });
  try {
    for (const object of contactQuery) {
      console.log("contactQuery...");
      const address = object.get("address");
      console.log("address: ", address);
      console.log("id: ", address.id);
      //Delete address to this contact
      const queryAddress = new Parse.Query('Address');
      queryAddress.equalTo("objectId", address.id);
      // +++ Modo 01
      // queryAddress.find({ useMasterKey: true })
      //   .then((list)=>{Parse.Object.destroyAll(list,{ useMasterKey: true });})
      //   .catch((error) => {
        //     console.error("Error finding related Address " + error.code + ": " + error.message);
        //   });
      // --- Modo 01
      // +++ Modo 02
      const resultsQueryAddress = await queryAddress.find({ useMasterKey: true });
      try {
        for (const object of resultsQueryAddress) {
          console.log("destroying.id: ", object.id);
          object.destroy();
        }
      } catch (error) {
        console.error('Error while destroying Address'  + error.code + ": " + error.message);
      }
      // --- Modo 02
    }
  } catch (error) {
    console.error('Error while fetching Contact'  + error.code + ": " + error.message);
  }
});
