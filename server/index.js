const express = require("express") ;
const app = express();
//midleware

app.use(express.json());
const bookshelfRoutes = require("./routes/bookshelfroutes")
app.use("/api/v1",bookshelfRoutes);

require('dotenv').config()
const PORT = process.env.PORT ||4000 ;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})

const dbconnect = require("./config/database");
dbconnect()