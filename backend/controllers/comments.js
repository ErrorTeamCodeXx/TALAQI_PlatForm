const { pool } = require("../models/db");

const createNewComment = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.token.user_id;
  const { content } = req.body;
  //   const currentDate = new Date();
  //   const created_at = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' +0000';
  const query = `INSERT INTO comments (user_id,post_id,content) VALUES ($1,$2,$3) RETURNING *`;
  const data = [user_id, post_id, content];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getCommentsByPostId = (req, res) => {
  const post_id = req.params.id;
  const query = `SELECT Comments.comment_id , Comments.post_id,Comments.user_id, Comments.created_at,Comments.content, u.username , u.profile_picture_url  FROM Comments JOIN Users u ON u.id = Comments.user_id WHERE post_id = ${post_id}`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for post: ${post_id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getCommentsAndLikeByPostId = (req, res) => {
  const post_id = req.params.id;
  const query = `
  SELECT
    Comments.comment_id,
    Comments.post_id,
    Comments.user_id,
    Comments.content AS comment_content,
    Users.username,
    Users.profile_picture_url,
    Posts.media_url,
    Posts.content AS post_content,
    (SELECT COUNT(*) FROM Likes WHERE Likes.post_id = Posts.id) AS like_count
FROM
    Comments
JOIN
    Users ON Users.id = Comments.user_id
JOIN
    Posts ON Posts.id = Comments.post_id
WHERE
    Comments.post_id = ${post_id}
    AND Posts.is_deleted = 0;

`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for post: ${post_id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateCommentsById = (req, res) => {
  const comment_id = req.params.id;
  const user_id = req.token.user_id;
  let { comment } = req.body;
  const query = `UPDATE Comments SET content = '${comment}' WHERE comment_id='${comment_id}' AND user_id = '${user_id}' RETURNING *;`;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Comment with id: ${comment_id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating Comment");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deleteCommentsById = (req, res) => {
  const comment_id = req.params.id;

  const query = `DELETE FROM Comments WHERE comment_id=${comment_id} RETURNING *`;

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Comment with id: ${comment_id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting Comment");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllCommentAdmin = (req, res) => {
  pool
    .query(
      `SELECT Comments.content , Comments.is_deleted  , Comments.comment_id , Users.username , Users.id  , Comments.post_id , Comments.created_at, Posts.media_url,Comments.is_band
  FROM 
  Comments 
  JOIN Users ON Users.id = Comments.user_id 
  JOIN Posts ON Posts.id = Comments.post_id 
  ;`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        length: result.rows.length,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = {
  createNewComment,
  getCommentsByPostId,
  updateCommentsById,
  deleteCommentsById,
  getCommentsAndLikeByPostId,
  getAllCommentAdmin,
};
