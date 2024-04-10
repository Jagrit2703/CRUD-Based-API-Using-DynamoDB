const express = require('express');
const router = express.Router();
const { create_or_Update_Company, getcompany, deleteCompany } = require('../services/dynamodb_company');

router.use(express.json());

//Endpoint for getting companies with id
router.get('/company/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await getcompany(id)
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with fetching company'})
})

//Endpoint for creating new company
router.post('/company', async (req, res) => {
    const { success, data } = await create_or_Update_Company(req.body)
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with creating new company'})
})

//Endpoint for updating existing company
router.put('/company/:cid', async (req, res) => {
    
    const company = req.body;
    const { cid } = req.params
    company.id = cid

    const { success, data } = await create_or_Update_Company(company)
    
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with updating company'})

})

//Endpoint for deleting a company
router.delete('/company/:cid', async (req, res) => {
    const { cid } = req.params;
    const { success, data } = await deleteCompany(cid)
    if (success) {
        return res.json({success,data})
    }
    return res.status(500).json({
        success:false, message:'error something went wrong with deleting company'})
})

module.exports = router;
