const { Poll } = require("../models/Poll");

// create a poll 
const createPoll = async (pollCredentials) => {
	try {
		const poll = await Poll.create({
			...pollCredentials
		});
		await poll.save();
		return poll;
	} catch(e) {
		console.error(e);
	}
}


module.exports = {
	createPoll
};