Parse.Cloud.beforeDelete(Parse.User,async (req) => {
  console.log('beforeDelete: User ...');
  const query = new Parse.Query('Contact');
  query.equalTo('createdByUser',req.object);
  let results = await query.find({useMasterKey:true});
  for(let i=0;i<results.length;++i){
    console.log(i);
    console.log(results[i].objectId);
    results[i].destroy({useMasterKey:true});
  }
});

//Issue reported in https://help.back4app.com/hc/en-us/requests/25759
//How to fetch all 'Contact' data before deleting. To get 'objectId' from the address and delete it.
Parse.Cloud.beforeDelete("Contact", async  (req) => {
  console.log('beforeDelete: Contact ...');
  console.log('object: ',req.object);
  console.log('id: ',req.object.id);
  // const Contact = Parse.Object.extend('Contact');
  const query = new Parse.Query(req.object);
  console.log('query...');
	const contact = await query.get(`${req.object.id}`);
  console.log('contact...');
  const address = contact.get("address");
  console.log('address: ',address);

	// let result = await query.get(req.object.id);
	// await result.destroy();
});
