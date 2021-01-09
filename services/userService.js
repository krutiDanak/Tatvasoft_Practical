let { User } = require('../models/user');
const mongoose = require('mongoose')
let { Blog } = require('../models/blog');



exports.getBlogList = async (title, skip, limit) => {

    const aggregateQuery = []

    var searchFiled = title || false

    if (searchFiled) {
        const regexVar = new RegExp('^' + `${title}` + '$', 'i')

        aggregateQuery.push({
            $match: { title: regexVar }
        })
    }
    if (skip === undefined || skip === '') skip = 0
    if (limit === undefined || limit === '') limit = 10

    aggregateQuery.push({ $match: { isDeleted: false, status: true } })
    aggregateQuery.push({ $skip: Number(skip) })
    aggregateQuery.push({ $limit: Number(limit) })

    const blogList = await Blog.aggregate(aggregateQuery).collation({ locale: 'en' })
    return blogList

}
