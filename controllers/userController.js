
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
let { User } = require('../models/user')
let { Blog } = require('../models/blog')
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId
const moment = require('moment')
const { getBlogList } = require('../services/userService')
module.exports.login = async (req, res) => {
    try {
        if (req.body.email === undefined || req.body.email === '') return res.status(422).json({ status: 422, data: {}, message: 'Email required.' });
        if (req.body.password === undefined || req.body.password === '') return res.status(422).json({ status: 422, data: {}, message: 'Password required.' });
        let userData = await User.findOne({ email: req.body.email });
        if (userData && bcrypt.compareSync(req.body.password, userData.password)) {
            const token = jwt.sign({ sub: userData._id }, config.secret, { expiresIn: '7d' });
            const update = await User.updateOne({ email: req.body.email }, { userToken: token });
            return res.status(200).json({ status: 200, data: { token: token }, message: "Login successful." });
        }
        else {
            return res.status(400).json({ status: 422, data: {}, message: "Invalid Credentials" });
        }

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

module.exports.getBlogList = async (req, res) => {
    try {
        const blogs = await getBlogList(req.query.title, req.query.skip, req.query.limit)
        if (blogs.length == 0) return res.status(404).json({ status: 404, data: [], message: 'No data found' });
        return res.status(200).json({ status: 200, data: blogs, message: 'Success' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
module.exports.createBlog = async (req, res) => {
    try {
        if (req.body.title === undefined || req.body.title === '') return res.status(422).json({ status: 422, data: {}, message: 'Title required.' });
        if (req.body.description === undefined || req.body.description === '') return res.status(422).json({ status: 422, data: {}, message: 'description required.' });
        if (req.body.start_date === undefined || req.body.start_date === '') return res.status(422).json({ status: 422, data: {}, message: 'Start Date required.' });
        if (req.body.end_date === undefined || req.body.end_date === '') return res.status(422).json({ status: 422, data: {}, message: 'End Date required.' });
        if (req.body.recurrenceOption === undefined || req.body.recurrenceOption === '') return res.status(422).json({ status: 422, data: {}, message: 'recurrenceOption required.' });

        const data = await Blog(req.body)
        data.save()
        return res.status(200).json({ status: 200, data: data, message: 'success' });
    } catch (e) {
        return res.status(400).json({ status: 400, data: {}, message: e.message });
    }
};

module.exports.updateBlog = async (req, res) => {
    try {
        if (req.body.id === undefined || req.body.id === '') return res.status(422).json({ status: 422, data: {}, message: 'Blog id required.' });
        if (req.body.title === undefined || req.body.title === '') return res.status(422).json({ status: 422, data: {}, message: 'Title required.' });
        if (req.body.description === undefined || req.body.description === '') return res.status(422).json({ status: 422, data: {}, message: 'description required.' });
        if (req.body.start_date === undefined || req.body.start_date === '') return res.status(422).json({ status: 422, data: {}, message: 'Start Date required.' });
        if (req.body.end_date === undefined || req.body.end_date === '') return res.status(422).json({ status: 422, data: {}, message: 'End Date required.' });
        if (req.body.recurrenceOption === undefined || req.body.recurrenceOption === '') return res.status(422).json({ status: 422, data: {}, message: 'recurrenceOption required.' });

        const body = req.body
        body.modify_date = moment();
        const data = await Blog.updateOne({ _id: ObjectId(req.body.id) }, body)
        return res.status(200).json({ status: 200, data: {}, message: 'success' });
    } catch (e) {
        return res.status(400).json({ status: 400, data: {}, message: e.message });
    }
};

module.exports.deleteBlog = async (req, res) => {
    try {
        if (req.body.id === undefined || req.body.id === '') return res.status(422).json({ status: 422, data: {}, message: 'Blog id required.' });
        const data = await Blog.updateOne({ _id: ObjectId(req.body.id) }, { isDeleted: true, status: false })
        return res.status(200).json({ status: 200, data: {}, message: 'success' });
    } catch (e) {
        return res.status(400).json({ status: 400, data: {}, message: e.message });
    }
};


module.exports.getBlogById = async (req, res) => {
    try {
        const blogData = await Blog.findOne({ _id: ObjectId(req.params.id) })
        return res.status(200).json({ status: 200, data: blogData, message: 'success' });
    } catch (e) {
        return res.status(400).json({ status: 400, data: {}, message: e.message });
    }
};