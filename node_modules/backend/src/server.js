const express = require('express');
const cors = require('cors');
const { v4: uuidv4} =require('uuid');
const db = require('./db');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
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
    try{
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
    }
    catch (err){
        console.error('POST /api/sessions error:', err);
        res.status(500).json({
            code: 500,
            message: err.message || 'Internal Server Error'})
    }
    

});

app.patch('/api/sessions/:id', async (req, res) => {
    try{

        const record = await db.getSessionId(req.params.id);

        if(!record){
            return res.status(404).json({
                code: 404,
                message: 'Session not found'
            })
        }

        const updated = {
            id:           existing.id,
            sessionId:    existing.session_id,
            caseSelected: req.body.caseSelected ?? existing.case_selected,
            status:       req.body.status ?? existing.status,
        }

        const saved = await db.saveSession(updated);
        res.json(saved);
    }
    catch (err){
        console.error(`PATCH /api/sessions/${req.params.id} error:`, err);
        return res.status(500).json({
            code: 500,
            message: err.message || 'Internal Server Error'
        });
    }

    
});

// Student Responses
app.post('/api/student_responses', async (req, res) => {
    try {
        const { sessionId, phase, responses, score, totalQuestions, correctAnswers } = req.body;
        if (!sessionId || !phase) return res.status(400).json({ code: 400, message: 'sessionId and phase are required' });

        const record = {
            id: uuidv4(), sessionId, phase,
            responses: responses || {},
            score: score ?? null,
            totalQuestions: totalQuestions ?? null,
            correctAnswers: correctAnswers ?? null,
        };

        const saved = await db.saveStudentResponse(record);
        res.status(201).json(saved);
    } catch (err) {
        console.error('POST /api/student_responses error:', err);
        res.status(500).json({ code: 500, message: err.message });
    }
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
    try {
        const { sessionId, phase, score, totalQuestions } = req.body;
        if (!sessionId || !phase) return res.status(400).json({ code: 400, message: 'sessionId and phase are required' });

        const record = {
            id: uuidv4(), sessionId, phase,
            score: score ?? null,
            totalQuestions: totalQuestions ?? null,
        };

        const saved = await db.saveAssessmentScore(record);
        res.status(201).json(saved);
    } catch (err) {
        console.error('POST /api/assessment_scores error:', err);
        res.status(500).json({ code: 500, message: err.message });
    }
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