//newProfile func for post 
const newProfile = (req, res, next) => {
	res.json({message: "Post new Profile"});
};


module.exports = {newProfile};