const mongoose = require('mongoose')

const CurriculumSchema = new mongoose.Schema({ 
	name: {
		type: String,
		required: true		
	},
	goal: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	section: {
		name: {
			type: String,
			// required: true
		},
		projects: [String],
		resources: [String]
	}
}, { timestamps: true })

const Curriculum = mongoose.model('Curriculum', CurriculumSchema);

module.exports = Curriculum