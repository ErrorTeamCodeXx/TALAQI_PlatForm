const { pool } = require("../models/db");

const addFollowers = async (req, res) => {
  try {
    const follower_id = req.token.user_id;
    const { followed_id } = req.body;
    const query = `INSERT INTO Follows (follower_id,followed_id) VALUES ($1,$2 ) RETURNING * ;`;
    const data = [follower_id, followed_id];
    const result = await pool.query(query, data);
    res.status(201).json({
      success: true,
      message: "created successfully",
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

const getAllFollwers = async (req, res) => {
  try {
    const result =
      await pool.query(`SELECT Follower.username as FollowerName, Followed.username as FollowedUser,Followed.bio
    FROM Follows  as F
    INNER JOIN Users Follower ON F.follower_id = Follower.id
    INNER JOIN Users Followed ON F.followed_id = Followed.id`);

    res.status(200).json({
      success: true,
      message: "get successfully",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

const deleteFollowed = async (req, res) => {
  const follower_id = req.token.user_id;
  const { followed_id } = req.body;
  try {
    const query = `DELETE FROM Follows WHERE followed_id=${followed_id} AND follower_id=${follower_id} RETURNING *`;

    const result = await pool.query(query);
 console.log(result.rowCount);
 if (result.rowCount>0) {
   res.status(200).json({
      success: true,
      message: "deleted successfully",
      result: result.rows,
    });
 } else{
  res.status(404).json({
    success: false,
    message: "Not Found"  
  });
 }
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};
const deleteFollowers = async (req, res) => {
  try {
    const followed_id = req.token.user_id;
    const { follower_id } = req.body;
    const query = `DELETE FROM Follows WHERE follower_id=${follower_id} AND followed_id = ${followed_id} RETURNING *`;

    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      message: "deleted successfully",
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

const suggestedFreings = async (req, res) => {
  try {
    const id = req.token.user_id;
    console.log("id is ========", id);
    const query = `  SELECT *
    FROM Users
    WHERE id != $1
    AND id NOT IN (SELECT followed_id FROM Follows WHERE follower_id = $2)
    ORDER BY Users.username;
    `;
    const data = [id, id];
    const result = await pool.query(query, data);

    res.status(200).json({
      success: true,
      message: "get suggested freinds",
      length: result.rows.length,
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};
// الاشخاص الذين اتابعهم
const getAllFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [id];
    const query = `SELECT DISTINCT Users.*
    FROM Users
    INNER JOIN Follows ON Follows.followed_id = Users.id
    WHERE Follows.follower_id = $1
    AND Users.id <> $1  
    ORDER BY Users.username;`;

    const result = await pool.query(query, data);

    res.status(200).json({
      success: true,
      message: "get Following",
      length: result.rows.length,
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};
// الاشخاص الذين يتابعونني
const getAllFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [id];
    const query = `SELECT DISTINCT Users.*
    FROM Users
    INNER JOIN Follows ON Follows.follower_id = Users.id
    WHERE Follows.followed_id = $1
    AND Users.id <> $1;`;

    const result = await pool.query(query, data);

    res.status(200).json({
      success: true,
      message: "get Followers",
      length: result.rows.length,
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

module.exports = {
  addFollowers,
  deleteFollowed,
  suggestedFreings,
  getAllFollowing,
  getAllFollowers,
  deleteFollowers,
};
