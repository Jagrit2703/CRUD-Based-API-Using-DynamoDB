const express = require('express');
const router = express.Router();
const { getallusers,deleteUser,create_or_Update_User, getoneuser,getcompanyusers } = require('../services/dynamodb_users');

router.use(express.json());

//Endpoint for retrieving all user entries
router.get('/users', async (req, res) => {
    const { success, data } = await getallusers()
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with fetching users'})
})

//Endpoint for getting users from their id
router.get('/users/:uid/company/:cid', async (req, res) => {
    const {cid,uid} = req.params
    const { success, data } = await getoneuser(cid,uid)
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success: false, message:'error something went wrong with fetching users'})
})

//Endpoint for getting all users of a company
router.get('/users/company/:cid', async (req, res) => {
    const { cid } = req.params;
    const { success, data } = await getcompanyusers(cid)
        if(success){
            return res.json({ success, data })
    }
    return res.status(500).json({success:false, message:"error cannot retrieve users of the company"})
})

//Endpoint for creating new user
router.post('/users', async (req, res) => {
    const { success, data } = await create_or_Update_User(req.body)
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with creating new user'})
})

//Endpoint for update existing user
router.put('/users/:uid/:cid', async (req, res) => {
    
    const user = req.body;
    const company = req.body;
    const { uid,cid } = req.params
    user.id = uid
    company.id = cid
    const { success, data } = await create_or_Update_User(req.body)
    
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with updating users'})

})

//Endpoint for deleting a user
router.delete('/users/:uid/:cid', async (req, res) => {
    const { uid,cid } = req.params;
    const { success, data } = await deleteUser(uid,cid)
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with deleting user'})
})

module.exports = router;
