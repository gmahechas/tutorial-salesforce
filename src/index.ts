import jsforce from 'jsforce';

const start = async () => {
	const soapOptions = {
		clientId: '',
		clientSecret: '',
		loginUrl: '',
	}
	const soapClient = new jsforce.Connection(soapOptions);
	const userInfo = await soapClient.login('', ''); //password + security token

	// describe
	/* 	const sobject: jsforce.SObject<any> = soapClient.sobject('Customer_Pricing_Table__c');
		const describe = await sobject.describe(); */

 	const productsQuery = await soapClient.query("SELECT Id, Name, Description, Standard_Price__c, Minimum_Price__c FROM Product2 WHERE ProductCode=''");
	console.log(productsQuery.records);

	/*const create = await soapClient.sobject('Customer_Pricing_Table__c').create({
		Product__c: '01t3J000002vtCAQAY',
		Account__c: '001G0000010cgKbIAI',
		Customer_Price__c: 25
	});

	console.log(create); */
}

start();