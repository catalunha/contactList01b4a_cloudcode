
Parse.Cloud.beforeDelete(Parse.User,async (req) => {
  console.log('beforeDelete: User ...');
  const query = new Parse.Query('Contact');
  query.equalTo('createdByUser', req.object);
  let results = await query.find({useMasterKey:true});
  await Parse.Object.destroyAll(results, {useMasterKey: true});
});

Parse.Cloud.beforeDelete("Contact", async (req) => {
  console.log("beforeDelete: Contact ...");
  let contact = req.object;
  const contactAddress = contact.get("address")
  const address = new Parse.Object('Address');
  address.id=contactAddress.id;
  await address.destroy({ useMasterKey: true });
});
