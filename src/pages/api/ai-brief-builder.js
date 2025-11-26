import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    projectType, 
    industry, 
    targetAudience, 
    projectGoals, 
    budget, 
    timeline,
    additionalDetails 
  } = req.body;

  // Validate required fields
  if (!projectType || !industry || !targetAudience || !projectGoals) {
    return res.status(400).json({ 
      message: 'Missing required fields: projectType, industry, targetAudience, projectGoals' 
    });
  }

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return res.status(500).json({ 
      message: 'AI service is currently unavailable. Please try again later.' 
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create a comprehensive prompt for the AI
    const prompt = `
As a client seeking to engage an agency through PAAN (Pan-African Agency Network), create a comprehensive project brief that will help match you with the ideal agency partner.

PROJECT DETAILS:
- Project Type: ${projectType}
- Industry: ${industry}
- Target Audience: ${targetAudience}
- Project Goals: ${projectGoals}
- Budget: ${budget || 'Not specified'}
- Timeline: ${timeline || 'Not specified'}
- Additional Details: ${additionalDetails || 'None provided'}

First, provide a 3-4 sentence summary of your project needs for quick agency matching.
Then, provide a detailed project brief with the following sections:
1. PROJECT BACKGROUND & OBJECTIVES
2. TARGET AUDIENCE INSIGHTS
3. DESIRED OUTCOMES & DELIVERABLES
4. TIMELINE & MILESTONES
5. BUDGET ALLOCATION
6. AGENCY REQUIREMENTS & PREFERENCES
7. EVALUATION CRITERIA

Format your response as:
SUMMARY:
[summary here]

BRIEF:
[full brief here]
`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timed out')), 55000)
    );

    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a business leader seeking agency services through PAAN. You understand your business needs well and can articulate project requirements clearly. Your goal is to create a comprehensive brief that will help PAAN match you with the most suitable agency partner from their network across Africa."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 900,
        temperature: 0.7,
      }),
      timeoutPromise
    ]);

    const text = completion.choices[0].message.content;
    // Split summary and brief
    const summaryMatch = text.match(/SUMMARY:(.*)BRIEF:/s);
    const summary = summaryMatch ? summaryMatch[1].trim() : '';
    const brief = text.split('BRIEF:')[1]?.trim() || '';

    res.status(200).json({
      success: true,
      brief: brief,
      summary: summary,
      timestamp: new Date().toISOString(),
      projectDetails: {
        projectType,
        industry,
        targetAudience,
        projectGoals,
        budget,
        timeline
      }
    });

  } catch (error) {
    if (error.message && error.message.includes('timed out')) {
      return res.status(504).json({
        message: 'AI service timed out. Please try again or reduce your input size.',
      });
    }
    console.error('OpenAI API error:', error);

    // Always return JSON, and include error details in development
    return res.status(500).json({ 
      message: 'An error occurred while generating your brief. Please try again.',
      error: typeof error === 'string' ? error : error.message || error.toString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
} 