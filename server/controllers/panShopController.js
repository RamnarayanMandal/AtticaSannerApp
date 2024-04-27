const asyncHandler = require("express-async-handler");
const axios = require('axios');
const PanShopOwner = require("../models/panShopModel");
const fs = require('fs');

const qrcode = require('qrcode');

const createPanShopOwner = asyncHandler(async (req, res) => {
    const { panShopOwner, phoneNumber, address, latitude, longitude ,city ,state ,pincode } = req.body;

    if (!panShopOwner || !phoneNumber || !address || !latitude || !longitude || !city ||!state ||!pincode ) {
        return res.status(400).json({ error: "panShopOwner, phoneNumber, address, latitude,city ,state ,pincode  and longitude are mandatory fields" });
    }

    try {
        // Create the pan shop owner
        const owner = await PanShopOwner.create({
            panShopOwner,
            phoneNumber,
            address,
            state,
            city,
            pincode,
            latitude,
            longitude,
            user_id: req.userExecutive.id // Make sure this is correct
        });


        const qrData = JSON.stringify({
            panShopOwner: owner.panShopOwner,
            phoneNumber: owner.phoneNumber,
            address: owner.address
        });
        // Generate and store the QR code
        const qrImageFilePath = `qr_${owner._id}.png`; // File path for the QR code image
        await qrcode.toFile(qrImageFilePath, qrData);

        // Read the QR code image file as a buffer
        const qrImageData = fs.readFileSync(qrImageFilePath);

        // Delete the QR code image file after reading it
        fs.unlinkSync(qrImageFilePath);

        // Store the QR code image data in the owner object
        owner.qrCodeImage = {
            data: qrImageData,
            contentType: 'image' // Adjust according to the image format
        };
        await owner.save();

        res.status(201).json(owner);
    } catch (error) {
        // If an error occurs during the creation process, send an error response
        console.error(error);
        res.status(500).json({ error: "Failed to create pan shop owner" });
    }
});


const updatePanShoperOwner = asyncHandler(async(req,res) => {
    try {
        // Find the pan shop owner by ID
        const owner = await PanShopOwner.findById(req.params.id);
        
        // Check if the pan shop owner exists
        if (!owner) {
            res.status(404);
            throw new Error("Pan shop owner not found");
        }
        
        // Check if the requesting user has permission to update the pan shop owner
        if (owner.user_id.toString() !== req.userExecutive.id) {
            res.status(403);
            return res.json({ error: "User doesn't have permission to update other user's pan shop owners" });
        }

        // Update the pan shop owner with the provided data
        const updatedOwner = await PanShopOwner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        const qrData = JSON.stringify({
            panShopOwner: updatedOwner.panShopOwner,
            phoneNumber: updatedOwner.phoneNumber,
            address: updatedOwner.address
        });
        const qrImageFilePath = `qr_${owner._id}.png`;
        await qrcode.toFile(qrImageFilePath, qrData);
        const qrImageData = fs.readFileSync(qrImageFilePath);
        fs.unlinkSync(qrImageFilePath);

        // Update the pan shop owner with the new QR code
        updatedOwner.qrCodeImage = {
            data: qrImageData,
            contentType: 'image'
        };
        await updatedOwner.save();

        // Return the updated pan shop owner
        res.status(200).json(updatedOwner);
    } catch (error) {
        // If an error occurs during the update process, send an error response
        console.error(error);
        res.status(500).json({ error: "Failed to update pan shop owner" });
    }
});

const deletePanShopOwner = asyncHandler(async (req, res) => {

    const panShopOwnerDel = await PanShopOwner.findById(req.params.id);

    if (!panShopOwnerDel) {
        res.status(404);
        throw new Error("product not found")

    }

    if(panShopOwnerDel.user_id.toString() !== req.userExecutive.id)
    {
        res.status(403);
        throw new Error("User dont't have permission to other user products");
    }

    await PanShopOwner.deleteOne({ _id: req.params.id });




    res.status(200).json(panShopOwnerDel);
});

const getPanShopOwnerById = asyncHandler(async (req, resp) => {
    const panShopOwner = await PanShopOwner.findById(req.params.id);
    if (!panShopOwner) {
        resp.status(404);
        throw new Error("PanShop Owner Not Found");
    }

    resp.status(200).json(panShopOwner);
});


const getAllPanShopOwner = asyncHandler(async (req, resp) => {
    const shop = await PanShopOwner.find({ user_id: req.userExecutive.id });
    resp.status(200).json(shop)
});


module.exports = { createPanShopOwner ,updatePanShoperOwner ,deletePanShopOwner,getAllPanShopOwner ,getPanShopOwnerById};