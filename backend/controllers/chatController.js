const run = require("../geminiApi");

const chatWithGemini = async (req, res) => {
    try {
        const { prompt } = req.body; // prompt ko destructure kar rahe hain
        const response = await run(prompt);
        res.json({ response }); // Directly returning response
    } catch (error) {
        console.log("Error:", error); // Detailed error log
        res.status(500).json({ response: "Error processing request" }); // Sending response back
    }
};


module.exports = { chatWithGemini };
