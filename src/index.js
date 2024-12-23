const dotenv = require('dotenv');
const { app } = require('./app.js');
const connectDB = require('./db/index.js')

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
})
.catch((err) => {
    console.log('MongoDB connection failed ', err);
})

app.get('/', (req, res) => {
    res.send('Healthcare api by Kundan')
})