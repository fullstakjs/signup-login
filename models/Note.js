const mongoose=require('mongoose');
const Note=mongoose.model("Note",{
    title:{type: String},
    content:{type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }

})

module.exports=Note;