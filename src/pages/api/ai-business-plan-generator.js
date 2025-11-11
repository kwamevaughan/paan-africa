import OpenAI from 'openai';

// Fallback business plan generator when OpenAI is unavailable
function generateFallbackBusinessPlan(data) {
  const {
    businessName,
    businessType,
    industry,
    location,
    businessDescription,
    targetMarket,
    valueProposition,
    businessModel,
    competition,
    competitiveAdvantage,
    startupCosts,
    revenueProjections,
    fundingNeeds,
    marketingStrategy,
    operationsPlan,
    managementTeam,
    goals,
    timeline,
    additionalDetails
  } = data;

  return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                              BUSINESS PLAN                                   ║
║                                                                              ║
║  ${businessName || 'Business Name'}                                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

EXECUTIVE SUMMARY
┌─────────────────────────────────────────────────────────────────────────────┐
│ Business Name: ${businessName || 'N/A'}                                    │
│ Business Type: ${businessType || 'Not specified'}                          │
│ Industry: ${industry || 'Not specified'}                                   │
│ Location: ${location || 'Not specified'}                                   │
│                                                                             │
│ ${businessDescription || 'Business description not provided'}             │
│                                                                             │
│ ${valueProposition || 'Value proposition not specified'}                  │
└─────────────────────────────────────────────────────────────────────────────┘

BUSINESS DESCRIPTION
┌─────────────────────────────────────────────────────────────────────────────┐
│ ${businessDescription || 'Business description not provided'}             │
│                                                                             │
│ Business Model: ${businessModel || 'Not specified'}                        │
└─────────────────────────────────────────────────────────────────────────────┘

MARKET ANALYSIS
┌─────────────────────────────────────────────────────────────────────────────┐
│ Target Market:                                                              │
│ ${targetMarket || 'Target market information not provided'}                │
│                                                                             │
│ Competition:                                                                │
│ ${competition || 'Competition analysis not provided'}                       │
│                                                                             │
│ Competitive Advantage:                                                      │
│ ${competitiveAdvantage || 'Competitive advantage not specified'}            │
└─────────────────────────────────────────────────────────────────────────────┘

FINANCIAL INFORMATION
┌─────────────────────────────────────────────────────────────────────────────┐
│ Startup Costs:                                                              │
│ ${startupCosts || 'Startup costs not specified'}                           │
│                                                                             │
│ Revenue Projections:                                                        │
│ ${revenueProjections || 'Revenue projections not provided'}                │
│                                                                             │
│ Funding Needs:                                                              │
│ ${fundingNeeds || 'Funding needs not specified'}                           │
└─────────────────────────────────────────────────────────────────────────────┘

MARKETING & OPERATIONS
┌─────────────────────────────────────────────────────────────────────────────┐
│ Marketing Strategy:                                                         │
│ ${marketingStrategy || 'Marketing strategy not provided'}                  │
│                                                                             │
│ Operations Plan:                                                            │
│ ${operationsPlan || 'Operations plan not provided'}                         │
└─────────────────────────────────────────────────────────────────────────────┘

MANAGEMENT & TEAM
┌─────────────────────────────────────────────────────────────────────────────┐
│ Management Team:                                                             │
│ ${managementTeam || 'Management team information not provided'}            │
└─────────────────────────────────────────────────────────────────────────────┘

GOALS & TIMELINE
┌─────────────────────────────────────────────────────────────────────────────┐
│ Goals & Objectives:                                                         │
│ ${goals || 'Goals not specified'}                                           │
│                                                                             │
│ Timeline:                                                                   │
│ ${timeline || 'Timeline not specified'}                                     │
└─────────────────────────────────────────────────────────────────────────────┘

${additionalDetails ? `
ADDITIONAL DETAILS
┌─────────────────────────────────────────────────────────────────────────────┐
│ ${additionalDetails}                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
` : ''}

╔══════════════════════════════════════════════════════════════════════════════╗
║                           POWERED BY PAAN AFRICA                             ║
║                                                                              ║
║  Generated with PAAN AI Business Plan Generator | paan.africa                ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `.trim();
}

export default async function handler(req, res) {
  console.log('API endpoint called with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Request body:', req.body);

  const { 
    businessName,
    businessType,
    industry,
    location,
    businessDescription,
    targetMarket,
    valueProposition,
    businessModel,
    competition,
    competitiveAdvantage,
    startupCosts,
    revenueProjections,
    fundingNeeds,
    marketingStrategy,
    operationsPlan,
    managementTeam,
    goals,
    timeline,
    additionalDetails
  } = req.body;
  
  console.log('Destructured data:', {
    businessName,
    industry,
    businessDescription
  });

  // Validate required fields
  if (!businessName || !industry || !businessDescription) {
    return res.status(400).json({ 
      message: 'Missing required fields: businessName, industry, businessDescription' 
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
    console.log('Starting business plan generation with data:', {
      businessName,
      industry,
      businessDescription
    });
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create a comprehensive prompt for the AI
    const prompt = `
Create a comprehensive, professional business plan for a business. Use the following information to generate a detailed, investor-ready business plan:

BUSINESS INFORMATION:
- Business Name: ${businessName}
- Business Type: ${businessType || 'Not specified'}
- Industry: ${industry}
- Location: ${location || 'Not specified'}
- Business Description: ${businessDescription}

VALUE PROPOSITION & BUSINESS MODEL:
- Value Proposition: ${valueProposition || 'Not provided'}
- Business Model: ${businessModel || 'Not provided'}

MARKET ANALYSIS:
- Target Market: ${targetMarket || 'Not provided'}
- Competition: ${competition || 'Not provided'}
- Competitive Advantage: ${competitiveAdvantage || 'Not provided'}

FINANCIAL INFORMATION:
- Startup Costs: ${startupCosts || 'Not provided'}
- Revenue Projections: ${revenueProjections || 'Not provided'}
- Funding Needs: ${fundingNeeds || 'Not provided'}

STRATEGY & OPERATIONS:
- Marketing Strategy: ${marketingStrategy || 'Not provided'}
- Operations Plan: ${operationsPlan || 'Not provided'}
- Management Team: ${managementTeam || 'Not provided'}

GOALS & TIMELINE:
- Goals & Objectives: ${goals || 'Not provided'}
- Timeline: ${timeline || 'Not provided'}

ADDITIONAL DETAILS:
${additionalDetails || 'No additional details provided'}

Please create a comprehensive business plan with the following structure:
1. EXECUTIVE SUMMARY - Brief overview of the business, key highlights, and summary
2. BUSINESS DESCRIPTION - Detailed description of the business, mission, vision, and business model
3. MARKET ANALYSIS - Target market analysis, competition analysis, and competitive positioning
4. MARKETING & SALES STRATEGY - Marketing channels, sales strategy, and customer acquisition
5. OPERATIONS PLAN - Day-to-day operations, processes, and operational requirements
6. MANAGEMENT TEAM - Key team members, organizational structure, and expertise
7. FINANCIAL PROJECTIONS - Startup costs, revenue projections, funding needs, and financial forecasts
8. GOALS & MILESTONES - Short-term and long-term goals, key milestones, and timeline
9. APPENDIX - Additional information, supporting documents, and references

Make the business plan look professional, comprehensive, and ready for investor presentation. Use professional language, clear formatting, and include actionable insights. Ensure all sections are well-developed and provide value to potential investors or stakeholders.
`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timed out')), 60000)
    );

    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional business consultant specializing in creating comprehensive, investor-ready business plans. You understand business strategy, market analysis, financial planning, and professional presentation. Your goal is to create detailed business plans that are professional, comprehensive, and ready for investor or stakeholder presentation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2500,
        temperature: 0.7,
      }),
      timeoutPromise
    ]);

    const text = completion.choices[0].message.content;
    
    // Create a summary for the business plan
    const summary = `Comprehensive business plan for ${businessName} in the ${industry} industry${location ? ` located in ${location}` : ''}. Includes market analysis, financial projections, marketing strategy, operations plan, and management team overview.`;

    res.status(200).json({
      success: true,
      businessPlan: text,
      summary: summary,
      timestamp: new Date().toISOString(),
      planDetails: {
        businessName,
        industry,
        location: location || 'Not specified',
        businessType: businessType || 'Not specified'
      }
    });

  } catch (error) {
    console.error('Full error details:', error);
    console.error('Error message:', error.message);
    console.error('Error type:', typeof error);
    
    if (error.message && error.message.includes('timed out')) {
      return res.status(504).json({
        message: 'AI service timed out. Please try again or reduce your input size.',
      });
    }
    
    // Handle OpenAI quota exceeded or API unavailable - provide fallback
    if (error.message && (error.message.includes('quota') || error.message.includes('429'))) {
      console.error('OpenAI quota exceeded, using fallback template:', error);
      
      try {
        console.log('Attempting fallback generation with data:', {
          businessName,
          industry,
          businessDescription
        });
        
        // Generate a fallback business plan using a template
        const fallbackPlan = generateFallbackBusinessPlan({
          businessName,
          businessType,
          industry,
          location,
          businessDescription,
          targetMarket,
          valueProposition,
          businessModel,
          competition,
          competitiveAdvantage,
          startupCosts,
          revenueProjections,
          fundingNeeds,
          marketingStrategy,
          operationsPlan,
          managementTeam,
          goals,
          timeline,
          additionalDetails
        });
        
        console.log('Fallback business plan generated successfully');
        
        const summary = `Comprehensive business plan for ${businessName} in the ${industry} industry${location ? ` located in ${location}` : ''}. Includes market analysis, financial projections, marketing strategy, operations plan, and management team overview.`;
        
        return res.status(200).json({
          success: true,
          businessPlan: fallbackPlan,
          summary: summary,
          timestamp: new Date().toISOString(),
          planDetails: {
            businessName,
            industry,
            location: location || 'Not specified',
            businessType: businessType || 'Not specified'
          },
          fallback: true
        });
      } catch (fallbackError) {
        console.error('Fallback business plan generation failed:', fallbackError);
        return res.status(500).json({
          message: 'Failed to generate business plan. Please try again.',
          error: 'Both AI and fallback generation failed'
        });
      }
    }
    
    console.error('OpenAI API error:', error);

    // Always return JSON, and include error details in development
    return res.status(500).json({ 
      message: 'An error occurred while generating your business plan. Please try again.',
      error: typeof error === 'string' ? error : error.message || error.toString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

