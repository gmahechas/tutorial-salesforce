import express from 'express';
import jsforce from 'jsforce';

const router = express.Router();

router.post('/', async (request, response) => {

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

	const create = await soapClient.sobject('Customer_Pricing_Table__c').create({
		Product__c: '',
		Account__c: '',
		Customer_Price__c: 25
	});

	console.log(create);

	response.status(200).send({ userInfo });
});

export const salesForceRouter = router;