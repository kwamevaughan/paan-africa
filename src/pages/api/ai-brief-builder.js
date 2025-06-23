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
    const prompt = `As a senior creative strategist at PAAN (Pan-African Agency Network), create a comprehensive creative brief for a client project. 

PROJECT DETAILS:
- Project Type: ${projectType}
- Industry: ${industry}
- Target Audience: ${targetAudience}
- Project Goals: ${projectGoals}
- Budget: ${budget || 'Not specified'}
- Timeline: ${timeline || 'Not specified'}
- Additional Details: ${additionalDetails || 'None provided'}

Please create a professional creative brief that includes:

1. PROJECT OVERVIEW
   - Clear project description
   - Key objectives and success metrics

2. TARGET AUDIENCE ANALYSIS
   - Detailed audience personas
   - Behavioral insights
   - Pain points and motivations

3. CREATIVE DIRECTION
   - Brand voice and tone recommendations
   - Visual style guidelines
   - Key messaging pillars

4. DELIVERABLES & TIMELINE
   - Recommended deliverables
   - Project phases
   - Timeline considerations

5. SUCCESS METRICS
   - KPIs to measure success
   - Performance indicators

6. BUDGET CONSIDERATIONS
   - Resource allocation recommendations
   - Cost optimization suggestions

7. RISK ASSESSMENT
   - Potential challenges
   - Mitigation strategies

Format the response as a clean, professional brief that a creative team can immediately use to start working on the project. Focus on actionable insights and clear direction.`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timed out')), 55000)
    );

    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a senior creative strategist with 15+ years of experience in the African market. You specialize in creating comprehensive creative briefs that drive results for brands across Africa and the diaspora. Your briefs are known for being thorough, actionable, and culturally relevant."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
      timeoutPromise
    ]);

    const generatedBrief = completion.choices[0].message.content;

    // Also generate a summary for quick reference
    const summaryPrompt = `Create a concise 3-4 sentence summary of this creative brief for quick reference:

${generatedBrief}

Focus on the key objectives, target audience, and main deliverables.`;

    const summaryCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: summaryPrompt
        }
      ],
      max_tokens: 150,
      temperature: 0.5,
    });

    const summary = summaryCompletion.choices[0].message.content;

    res.status(200).json({
      success: true,
      brief: generatedBrief,
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