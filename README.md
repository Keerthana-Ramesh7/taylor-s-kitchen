
# Taylors-kitchen
React Recipe Finder App with OTP verification(UI challenge Project)
🍳 Taylor’s Kitchen
Project Type: React Web App
Demo Link: https://codesandbox.io/p/sandbox/taylorss-kitchen-r6c9pn

👤 User Persona
Name: Taylor
Occupation: Busy Professional
Need: Taylor wants to help in the kitchen when he comes home. He wants to cook based on the ingredients he already has.
This app helps him search for recipes quickly and easily using available ingredients.

🎯 Project Goal
Build a responsive recipe application that allows users like Taylor to search recipes by ingredients, verify login through OTP, 
and view cooking instructions.
⚙ Features
✅ Welcome screen with friendly intro
✅ Login screen (Email)
✅ OTP verification with timer + resend OTP option
✅ Recipe search using ingredient(s)
✅ Fetch recipes from TheMealDB API
✅ Detailed meal preview with image, instructions, and YouTube link
✅ Logout/Exit feature
✅ Mobile-style responsive design
✅ Loading spinner during recipe fetching

🧠 API Used
TheMealDB API:
https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}
Replace {ingredient} with the user’s input.
Example:
https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken

🧩 Tech Stack
React (TypeScript)
CSS (Inline styles)
TheMealDB API (Public API)

🧑‍🍳 How It Works
User enters their name and phone number.
System generates a random 4-digit OTP (shown via alert/console).
After verifying the OTP, user can search for recipes by ingredient.
App fetches results from TheMealDB API.
Clicking on a meal shows more info and YouTube tutorial link.
User can log out to go back to the welcome screen.

🧾 Folder Structure
taylors-kitchen/
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md

💡 Notes
OTP is simulated (not real SMS/email OTP).
Designed to demonstrate UI/UX and API integration skills.
Works both on desktop and mobile devices.

🚀 Author
Keerthana Ramesh
👩‍💻 Frontend Developer | React Enthusiast
