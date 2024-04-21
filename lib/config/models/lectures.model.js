const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  Course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses'
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

const Lecture = mongoose.models?.lectures || mongoose.model('lectures', LectureSchema);

module.exports = Lecture;
