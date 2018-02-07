const {query} = require('../utilities/db-helper')

exports.findAll = callback => {
	query('SELECT * FROM `topic_categories`',callback)

}

exports.save =(topic,callback) =>{
	const sqlStr = 'INSERT INTO `topics` SET ?';
	console.log(topic);
	query(sqlStr,topic,callback);
}