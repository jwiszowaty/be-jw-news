const { selectArticleById, selectAllArticles, updateVotesByArticleId } = require("../models/articles_model")

exports.getArticleById = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const article = await selectArticleById(article_id)
        return res.status(200).send({ article })
    } catch (err) {
        next(err)
    }
}

exports.getArticles = async (req, res, next) => {
    try {
        const { topic, sort_by, order } = req.query
        const articles = await selectAllArticles(topic, sort_by, order)
        return res.status(200).send({articles})
    } catch (err) {
        next(err)
    }
}

exports.patchVotesbyArticleId = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const { inc_vote } = req.body
        await selectArticleById(article_id)
        const updatedArticle = await updateVotesByArticleId(article_id, inc_vote)
        return res.status(200).send({ updatedArticle })
    } catch (err) {
        next(err)
    }
}