// Setup Connection --- 
const pg = require('pg');
const dbURI = "postgres://gcisuvjwgkzgqs:948585b1437270cf02ed586498c04309651715c601220ad266425d363b1eed60@ec2-34-249-247-7.eu-west-1.compute.amazonaws.com:5432/dan1ev31mpq3j7";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false}
}) ;

// Database methods ---------------------------
let dbMethods = {}; // create empty object

// -----
dbMethods.getAllBlogPosts = function(){
    let sql = "SELECT * FROM blogposts";
    return pool.query(sql); // return the promise
}

//-----
dbMethods.createBlogPost = function(heading, blogtext, userid){
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES( DEFAULT, DEFAULT, $1, $2, $3) returning *";
    let values = [heading, blogtext, userid];
    return pool.query(sql, values); //returns the promise 
}

//-----
dbMethods.deleteBlogPost = function(id) {
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values); //return the promise
}

// export dbMethods ----
module.exports = dbMethods;
