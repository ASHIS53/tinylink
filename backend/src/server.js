const app = require("./app");

// Render always provides PORT
const PORT = process.env.PORT;

if (!PORT) {
  console.error(
    "❌ ERROR: process.env.PORT is missing! Render requires a PORT."
  );
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on Render port ${PORT}`);
});
