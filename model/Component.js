const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create users schema

const ComponentSchema = new Schema({
  component_name: {
    type: String,
    required: true
  },
  git_url: {
    type: String,
    required: true
  },
  docker_compose_data: {
    type: String
  }
});

module.exports = Component = mongoose.model('component', ComponentSchema);
