import mongoose from "mongoose";

const msgSchema=new mongoose.Schema({
    senderId: {
        type: String,
        requred: true,
      },
      receiverId:{
        type: String,
        requred: true,
      },
      context:{
        type:String,
        // requred:true,
        // validate: {
        //   validator: function(value) {
        //     return value.trim().length !== 0;
        //   },
        //   message: 'Context must contain non-space characters'
        // }
      },
      createAt: {
        type: Date,
        default: Date.now,
      },
});

const message=mongoose.model("msg",msgSchema);
export default message;