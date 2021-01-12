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
	sections: [{
		name: {
			type: String,
			required: true
		},
		projects: [{
			isCompleted: {
				type: Boolean,
				required: true,
				default: false
			},
			name: {
				type: String,
				required: true
			},
			link: {
				type: String,
				required: true
			}
		}],
		resources: [{
			isCompleted: {
				type: Boolean,
				required: true,
				default: false
			},
			name: {
				type: String,
				required: true
			},
			link: {
				type: String,
				required: true
			}
		}]
	}]
}, { timestamps: true })

const Curriculum = mongoose.model('Curriculum', CurriculumSchema);

module.exports = Curriculum