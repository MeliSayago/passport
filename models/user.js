var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/passport');
var crypto = require('crypto');


const User = db.define('user', {
  email: {
  	type: Sequelize.STRING, 
  	allowNull: false,
  },
  password: {
  	type: Sequelize.TEXT,
  	set(pass){
  		this.setDataValue('salt',crypto.randomBytes(20).toString('hex'));
  		this.setDataValue('password',crypto.createHmac('sha1', this.salt).update(pass).digest('hex'))
  	}
  },
  salt: Sequelize.STRING,
})

User.prototype.validation = function(pass){
	var validatePass = crypto.createHmac('sha1', this.salt).update(pass).digest('hex');
	if(this.password===validatePass){
		return true
	} else {
		return false
	}
}

module.exports= {User, db};