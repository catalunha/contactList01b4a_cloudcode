const Contact = Parse.Object.extend('Contact');

// The example below shows you how a cloud code function looks like.
// Parse Server 3.x
Parse.Cloud.define("hello", (request) => {
	return("contactList01 - backend ok...");
});

Parse.Cloud.define('create-contact',async (req)=>{
	const contact = new Contact();
	contact.set('name',req.params.name);
	contact.set('man',false);
	contact.set('birthday',new Date(1972,09,11));
	const savedContact = await contact.save();
	return savedContact;
});

// If you have set a function in another cloud code file, called "test.js" (for example)
// you need to refer it in your main.js, as you can see below:

/* require("./test.js"); */
