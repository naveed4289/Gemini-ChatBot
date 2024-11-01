
require("dotenv/config");

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });
        
        const result = await chatSession.sendMessage(prompt);
        // console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("Run function error:", error);
        throw error; // Rethrow to handle it in the chatWithGemini
    }
}

  module.exports =run;
  
//   run();