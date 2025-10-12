import { Router } from 'express';
import type { Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const router = Router();
router.use(authMiddleware);
router.post('/enhance-bullet', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 10) {
    return res.status(400).json({ error: 'Please provide a valid bullet point to enhance.' });
  }

  const prompt = `
    You are an expert career coach and professional resume writer.
    Your task is to rewrite the following resume bullet point to be more impactful, professional, and results-oriented.
    Guidelines:
    - Start with a strong action verb.
    - Quantify the results or impact where possible.
    - Use professional, industry-standard language.
    - Keep it concise and to a single sentence.
    - Return exactly 3 distinct variations.
    Original bullet point: "${text}"
    Your response MUST be only a valid JSON array of strings, inside a json markdown block, like this: \`\`\`json["variation 1", "variation 2", "variation 3"]\`\`\`
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponseText = response.text();
    
    let suggestions;
    try {
      const jsonMatch = aiResponseText.match(/```json\s*([\s\S]*?)\s*```/);
      
      let cleanedText: string;
      if (jsonMatch && jsonMatch[1]) {
        cleanedText = jsonMatch[1];
      } else {
        cleanedText = aiResponseText;
      }
      
      suggestions = JSON.parse(cleanedText);

    } catch (parseError) {
      console.error("Failed to parse Gemini response:", aiResponseText);
      throw new Error('AI returned a response in an unexpected format.');
    }

    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      throw new Error('AI did not return a valid array of suggestions.');
    }

    res.status(200).json({ suggestions });

  } catch (error) {
    console.error('Google AI API request failed:', error);
    res.status(500).json({ error: 'Failed to enhance bullet point with AI.' });
  }
});
router.post('/generate-summary', async (req: Request, res: Response) => {
  const { workExperience, jobTitle } = req.body;

  if (!workExperience || !Array.isArray(workExperience) || workExperience.length === 0) {
    return res.status(400).json({ error: 'Valid work experience is required.' });
  }
  if (!jobTitle) {
    return res.status(400).json({ error: 'A target job title is required.' });
  }
  const experienceString = workExperience.map(exp => 
    `- ${exp.jobTitle} at ${exp.company}: ${exp.description.join(', ')}`
  ).join('\n');
  const prompt = `
    You are an expert career coach specializing in writing high-impact professional summaries for resumes.
    
    Based on the following work experience and the target role, write a compelling, 3-sentence professional summary.

    Guidelines:
    - The summary should be concise, confident, and tailored to the target role.
    - Start with a strong statement of profession and years of experience.
    - Highlight 2-3 key skills or major accomplishments from the provided work history that are relevant to the target role.
    - End with a statement about career goals or the value the candidate brings.
    - The tone should be highly professional.
    - Return ONLY the generated summary as a single string of text, with no extra formatting or comments.

    Target Role: "${jobTitle}"
    
    Work Experience:
    ${experienceString}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const summaryText = response.text();

    if (!summaryText) {
      throw new Error('AI did not return a valid response.');
    }
    res.status(200).json({ summary: summaryText.trim() });

  } catch (error) {
    console.error('Google AI API request failed for summary generation:', error);
    res.status(500).json({ error: 'Failed to generate summary with AI.' });
  }
});

router.post('/tailor', async (req: Request, res: Response) => {
  const { resumeData, jobDescription } = req.body;
  if (!resumeData) {
    return res.status(400).json({ error: 'Resume data is required.' });
  }
  if (!jobDescription || jobDescription.trim().length < 50) {
    return res.status(400).json({ error: 'A valid job description (minimum 50 characters) is required.' });
  }
  const prompt = `
    You are an expert AI career coach with deep knowledge of Applicant Tracking Systems (ATS) and what recruiters look for.
    Your task is to analyze a user's resume against a target job description and provide a comprehensive, structured analysis.

    **Step 1: Keyword Analysis**
    Analyze the provided "Job Description" and extract the top 10 most important keywords and skills. These should be a mix of technical skills, soft skills, and key responsibilities.

    **Step 2: Resume Comparison**
    Carefully compare the extracted keywords against the provided "Resume Data" (including the summary, experience, and skills sections).

    **Step 3: Generate Analysis**
    Based on your analysis, generate a response in the following JSON format. Do not include any text, comments, or markdown formatting outside of the main JSON object.

    Your response MUST be ONLY a valid JSON object with the following structure:
    {
      "matchScore": <A percentage score from 0 to 100 representing how well the resume matches the job description. Be critical and realistic.>,
      "missingKeywords": <An array of up to 5 key skills or qualifications from the job description that are completely missing from the resume.>,
      "suggestions": [
        {
          "experienceId": "<The 'id' of the work experience entry from the original resume data>",
          "originalBullet": "<The original bullet point text from the resume>",
          "suggestedRewrite": "<A rewritten version of the bullet point that better incorporates keywords and aligns with the job description.>"
        }
      ]
    }

    **Guidelines for Suggestions:**
    - Provide rewrite suggestions for 2-3 of the most relevant bullet points.
    - The suggested rewrites should be natural and contextually appropriate. Do not just stuff keywords.
    - Focus on aligning the user's accomplishments with the responsibilities mentioned in the job description.

    ---
    **Job Description:**
    ${jobDescription}

    ---
    **Resume Data (JSON):**
    ${JSON.stringify(resumeData)}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponseText = response.text();
    let analysis;
    try {
      const cleanedText = aiResponseText.replace(/```json\s*|```/g, '');
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse Gemini tailor response:", aiResponseText);
      throw new Error('AI returned a response in an unexpected format.');
    }

    res.status(200).json(analysis);

  } catch (error) {
    console.error('Google AI API request failed for tailor analysis:', error);
    res.status(500).json({ error: 'Failed to generate resume analysis with AI.' });
  }
});
export default router;