const express = require('express');
const cors = require('cors');
const { v4: uuidv4} =require('uuid');
const db = require('./db');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URK || '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString()});
});

// Sessions

app.get('/api/sessions', async (req, res) => {
    const filter = req.query.filter || '';
    const match = filter.match(/sessionId="([^"]+)"/);

    if(!match){
        return res.status(400).json({
            code: 400,
            message: 'Missing or invalid filter'
        })
    }

    const session = await db.findSessionBySessionId(match[1]);
    if(!session) {
        return res.status(404).json({
            code: 404,
            message: "The requested resource wasn't found. "
        })
    }

    res.json(session);
});

app.post('/api/sessions', async (req, res) => {
    const { sessionId, caseSelected = '', status = 'active' } = req.body;

    if(!sessionId){
        return res.status(400).json(
            {
                code: 400,
                message: 'sessionId is required'
            }
        )
    }

    const record = {
        id: uuidv4(),
        sessionId,
        caseSelected,
        status,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
    };

    const saved = await db.saveSession(record);
    res.status(201).json(saved);

});

app.patch('/api/sessions/:id', async (req, res) => {
    const record = await db.getSessionId(req.params.id);

    if(!record){
        return res.status(404).json({
            code: 404,
            message: 'Session not found'
        })
    }

    const updated = {
        ...record,
        ...req.body,
        id: record.id,
        updated: new Date().toISOString(),
    }

    const saved = await db.saveSession(updated);
    res.json(saved);
});

// Student Responses
app.post('/api/student_responses', async (req, res) => {
    const { sessionId, phase, responses, score, totalQuestions, correctAnswers } = req.body;

    if(!sessionId || !phase){
        return res.status(400).json({
            code: 400,
            message: 'sessionId and phase are required'
        });
    }

    const record = {
        id: uuidv4(),
        sessionId,
        phase,
        responses: responses || {},
        score: score ?? null,
        totalQuestions: totalQuestions ?? null,
        correctAnswers: correctAnswers ?? null,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
    };

    const saved = await db.saveStudentResponse(record);
    res.status(201).json(saved);

});

app.get('/api/student_responses', async (req, res) => {
    const { sessionId } = req.query;
    const results = sessionId
        ? await db.getStudentResponsesBySession(sessionId)
        : await db.getAllStudentResponses();
    res.json({ items: results, totalItems: results.length});
});

// Assessment Scores
app.post('/api/assessment_scores', async (req, res) => {
    const { sessionId, phase, score, totalQuestions } = req.body;

    if( !sessionId || !phase){
        return res.status(400).json({
            code: 400,
            message: 'sessionId and phase are required'
        });
    }

    const record = {
        id: uuidv4(),
        sessionId,
        phase,
        score: score ?? null,
        totalQuestions: totalQuestions ?? null,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
    };

    const saved = await db.saveAssessmentScore(record);
    res.status(201).json(saved);
});

app.get('/api/assessment_scores', async (req, res) => {
    const { sessionId } = req.query;
    const results = sessionId
        ? await db.getAssessmentScoresBySession(sessionId)
        : await db.getAllAssessmentScores();
    res.json({ items: results, totalItems: results.length});
});

//Fallbacks
app.use((req, res) => {
    res.status(404).json(
        {
            code: 404,
            message: 'Route not found'
        }
    );
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        code: 500,
        message: 'Internal Server Error'
    });
});

module.exports = app;