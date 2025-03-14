const app = require("./app");  // Import the app
const port = process.env.PORT || 8009;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
