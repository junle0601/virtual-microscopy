require('dotenv').config();

const app = require('./src/server');

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
})