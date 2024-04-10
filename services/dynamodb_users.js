const AWS = require('aws-sdk');
require('dotenv').config();
const {parse, stringify} = require ('flatted')

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const Table_Name = "crud-users2"; // enter the table name here

//Function to create and update users 
const create_or_Update_User = async (data = {}) => {
    const params = {
        TableName: Table_Name,
        Item: data
    }
    try{
        const val = await dynamoClient.put(params).promise()
        return { success: true }
    }
    catch(error) {
        return { success: false }
    }
};

//cid is the parameter we are passing, company-id is the name of the partition key
//Function to get all users of a company 
const getcompanyusers = async (cid) => {
    try {
      const params = {
        TableName: Table_Name,
        KeyConditionExpression: '#cid = :cid',
        ExpressionAttributeNames: {
            '#cid': 'company-id',
        },
        ExpressionAttributeValues: {
            ':cid': cid,
        },
    };
        const val = await dynamoClient.query(params).promise();
        return { success: true, data: val};
    } catch (error) {
      return { success: false, data: null };
    }
};

//Function to get one user. NEED TO ENTER company-id ALONG WITH user-id 
const getoneuser = async (cid,uid) => {
    const params = {
        TableName: Table_Name,
        Key: {
            'user-id': uid,
            'company-id':cid,
        },
    }
    try {
        const val = await dynamoClient.get(params).promise();
        return {success:true, data:val}
    }
    catch (error) {
        console.log(error)
        return { success: false, data: null}
    }
}

//Function to get all users from the table 
const getallusers = async () => {
    const params = {
        TableName: Table_Name
    }
    try {
        const val = await dynamoClient.scan(params).promise();
        return {success:true, data:val}
    }
    catch (error) {
        return { success: false, data: null }
    }
}


//Function to delete a user 
const deleteUser = async (cid,uid) => {
    const params = {
        TableName: Table_Name,
        Key: {
            'user-id': uid,
            'company-id':cid
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
    create_or_Update_User,
    getallusers,
    deleteUser,
    getoneuser,
    getcompanyusers
};