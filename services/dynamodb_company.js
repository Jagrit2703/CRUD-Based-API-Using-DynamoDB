const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const Table_Name = "crud-company-db"; // enter the table name here

//Function to create or update a company 
const create_or_Update_Company = async (data = {}) => {

    const params = {
        TableName: Table_Name,
        Item: data,
    }
    try{
        await dynamoClient.put(params).promise()
        return { success: true }
    }
    catch(error) {
        return { success: false, message: error }
    }
};

//Function to get a company 
const getcompany = async (id) => {
    const params = {
        TableName: Table_Name,
        Key: {
            'id': id, //replace id with the table's partition key
            
        },
    }
    try {
        const val = await dynamoClient.get(params).promise();
        return {success:true, data:val}
    }
    catch (error) {
        return { success: false, data: null, message: error }
    }
}

//Function to delete a company
const deleteCompany = async (value) => {
    const params = {
        TableName: Table_Name,
      Key: {
        'id': value, //replace id with the table's partition key
      },
    }
    try {
      await dynamoClient.delete(params).promise()
      return { success: true }
    } catch(error) {
      return { success: false }
    }
}
  

module.exports = {
    dynamoClient,
    create_or_Update_Company,
    getcompany,
    deleteCompany
};