const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://task1:bkh-z9CDHsg2436@cluster0.bkamjqt.mongodb.net/collage?retryWrites=true&w=majority&appName=Cluster0"
  )
  // .connect(
  //   "mongodb+srv://petereshak11:MONAUAcCokAeChS5@collagetask.cby0ekd.mongodb.net/?retryWrites=true&w=majority&appName=CollageTask"
  // )
  // .connect(
  //   "mongodb+srv://atlas-sample-dataset-load-680bde14305c556457e67583:MONAUAcCokAeChS5@collagetask.cby0ekd.mongodb.net/?retryWrites=true&w=majority&appName=CollageTask"
  // )
  .then(() => console.log("DB is now connected"))
  .catch((err) => console.log("YOU HAVE ERROR", err));
