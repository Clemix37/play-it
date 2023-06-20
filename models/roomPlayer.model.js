const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const RoomPlayerSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    points: {
        type: Number,
    },
    roomId: {
        type: ObjectId,
        ref: "Room",
    },
    estAdmin: {
        type: Boolean,
        default: false,
    }
});

const RoomPlayer = mongoose.model("RoomPlayer", RoomPlayerSchema);

module.exports = RoomPlayer;