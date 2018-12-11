var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    color: String,
    hashed_password: String
});
mongoose.model('User', UserSchema);



// var mongoose = require('mongoose');

var VotingSchema = new mongoose.Schema({
  Username: String,
  // Sales: {type: Number, default:0},
  Comment: String,
  Date: String,
  // PictureURL: String,
  // Price: String
});

VotingSchema.methods.upvote = function(cb) {
//  this.Sales += 1;
  this.save(cb);
};

mongoose.model('Comments',VotingSchema);









