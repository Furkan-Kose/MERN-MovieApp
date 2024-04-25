const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const movieRoutes = require('./routes/movie');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');
const categoryRoutes = require('./routes/category');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", movieRoutes);
app.use("/api", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', commentRoutes);
app.use('/api', categoryRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connection successful'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

