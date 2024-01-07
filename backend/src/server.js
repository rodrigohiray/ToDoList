const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3333;
console.log("✈️  Starting express");
app.listen(PORT, () => {
    console.log(`💡 Express listening at http://localhost:${PORT}`);
  });