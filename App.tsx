import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [step, setStep] = useState<"otp" | "verify" | "recipes" | "details">(
    "otp"
  );
  const [email, setEmail] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [toast, setToast] = useState<string>("");

  // 🔔 Simple Toast function
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // 📨 Generate OTP
  const sendOtp = () => {
    if (!email.includes("@")) {
      showToast("Please enter a valid email");
      return;
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    showToast(`OTP sent to ${email}`);
    console.log("Generated OTP:", otp);
    setStep("verify");
  };

  // ✅ Verify OTP
  const verifyOtp = () => {
    console.log("Entered:", enteredOtp, "Generated:", generatedOtp);
    if (enteredOtp.trim() === generatedOtp.trim()) {
      showToast("✅ OTP Verified!");
      setTimeout(() => setStep("recipes"), 1200);
    } else {
      showToast("❌ Incorrect OTP");
    }
  };

  // 🍳 Fetch Recipes
  const fetchRecipes = async () => {
    if (!query) {
      showToast("Please enter an ingredient");
      return;
    }
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
    );
    const data = await res.json();
    if (data.meals) setRecipes(data.meals);
    else {
      setRecipes([]);
      showToast("🍳 No recipes found!");
    }
  };

  // 📖 Fetch Recipe Details
  const fetchRecipeDetails = async (id: string) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
      setSelectedRecipe(data.meals[0]);
      setStep("details");
    }
  };

  // ⏪ Exit to Home
  const resetApp = () => {
    setStep("otp");
    setEmail("");
    setGeneratedOtp("");
    setEnteredOtp("");
    setQuery("");
    setRecipes([]);
    setSelectedRecipe(null);
  };

  return (
    <div className="app-container">
      <h1>🍴 Taylor’s Kitchen</h1>

      {step === "otp" && (
        <div className="card">
          <h2>Enter your Email</h2>
          <input
            type="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {step === "verify" && (
        <div className="card">
          <h2>Enter OTP</h2>
          <input
            type="text"
            value={enteredOtp}
            placeholder="Enter 4-digit OTP"
            onChange={(e) => setEnteredOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify</button>
        </div>
      )}

      {step === "recipes" && (
        <div className="card">
          <h2>Welcome, {email.split("@")[0]} 👋</h2>
          <p>Find recipes based on what’s in your kitchen.</p>
          <input
            type="text"
            value={query}
            placeholder="e.g. chicken, rice, egg..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={fetchRecipes}>Search</button>

          <div className="recipes">
            {recipes.map((r) => (
              <div
                key={r.idMeal}
                className="recipe-card"
                onClick={() => fetchRecipeDetails(r.idMeal)}
              >
                <img src={r.strMealThumb} alt={r.strMeal} />
                <p>{r.strMeal}</p>
              </div>
            ))}
          </div>

          {recipes.length === 0 && (
            <p style={{ color: "#777" }}>🍳 No recipes found yet</p>
          )}

          <button className="exit" onClick={resetApp}>
            Exit
          </button>
        </div>
      )}

      {step === "details" && selectedRecipe && (
        <div className="card">
          <h2>{selectedRecipe.strMeal}</h2>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <p>{selectedRecipe.strInstructions}</p>
          <button onClick={() => setStep("recipes")}>Back</button>
        </div>
      )}

      {/* 🔔 Toast message */}
      {toast && <div className="toast">{toast}</div>}

      <p style={{ marginTop: 20, fontSize: 12, color: "#aaa" }}>
        © 2025 Taylor’s Kitchen
      </p>
    </div>
  );
}
