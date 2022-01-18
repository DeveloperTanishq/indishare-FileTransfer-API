const File = require('./models/file')
const fs = require('fs')
const connectDB = require('./config/db')
connectDB();

async function deleteData(){
    //fetch 24 hours old files
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const files = await File.find({creadetAt:{$lt: pastDate}})

    if(files.length){
        for(const file of files){
               try{
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfully Deleted ${file.filename}`);
               }catch(err){
                console.log(`Error While Deleting File ${err}`);
               }
        }
        console.log('job done');
    }
}


deleteData().then(process.exit);