import jsforce from 'jsforce';

let soapClient: jsforce.Connection;
let userInfo: jsforce.UserInfo;
const sku = '';
const Account__c = '';
const Product__c = '';

const auth = async () => {
	const soapOptions = {
		clientId: '',
		clientSecret: '',
		loginUrl: '',
	}
	soapClient = new jsforce.Connection(soapOptions);
	userInfo = await soapClient.login('', ''); //password + security token
}

const queryProduct2 = async (productCode: string) => {
	return await soapClient.query(`SELECT Id, Name, Description, Standard_Price__c, Minimum_Price__c FROM Product2 WHERE ProductCode='${productCode}'`);
};

const queryCustomer_Pricing_Table__c = async (Account__c: string) => {
	return await soapClient.query(`SELECT Id, Product__c, Account__c, Customer_Price__c FROM Customer_Pricing_Table__c WHERE Account__c='${Account__c}'`);
};

const createProduct = async (Product__c: string, Account__c: string, Customer_Price__c: string) => {
	return await soapClient.sobject('Customer_Pricing_Table__c').create({
		Product__c,
		Account__c,
		Customer_Price__c
	});
}

const deleteProduct = async (id: string) => {
	return await soapClient.sobject('Customer_Pricing_Table__c').delete(id);
}

const describeTable = async (table: string) => {
	const sobject: jsforce.SObject<any> = soapClient.sobject(table);
	return await sobject.describe();
}

const sleep = (ms: number) => {
	return new Promise(resolve => {
		console.log('sleeping:::', ms);
		setTimeout(resolve, ms);
	});
}

const start = async () => {
	await auth();

	/* 	const desc = await describeTable('Customer_Pricing_Table__c') as any;
		console.log(desc.fields.map((f: any) => f.name)); */

/* 	const productsQuery = await queryProduct2(sku);
	const product = productsQuery.records[0] as any;
	console.log('product:::', product);
	const { Id: id, Standard_Price__c: standarPrice } = product; */

	/* #################### create product #################### */
/* 	const createProd = await createProduct(id, Account__c, standarPrice);
	console.log('create product to user:::', createProd); */

	/* #################### print products #################### */
	const products = await queryCustomer_Pricing_Table__c(Account__c);
	console.log('products list:::', products);

	/* #################### delete product #################### */
	/* const { Id } = products.records.find((p: any) => p.Product__c === Product__c) as any; */
	const deleteProd = await deleteProduct('');
	console.log('delete product:::', deleteProd)
/* 
	await sleep(3000); */

	/* #################### create product again #################### */
/* 	const createProd2 = await createProduct(id, Account__c, standarPrice);
	console.log('create product to user:::', createProd2); */

	/* #################### print products #################### */
/* 	const productsCurrent = await queryCustomer_Pricing_Table__c(Account__c);
	console.log('current products list:::', productsCurrent); */

}

start();