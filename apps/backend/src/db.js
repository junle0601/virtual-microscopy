const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
        realtime: {
            transport: ws
        }
    }
);

// Sessions

async function findSessionBySessionId(sessionId) {
    const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

    if(error) return null;
    return data;
}

async function getSessionId(id) {
    const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', id)
        .single();

    if(error) return null;
    return data;
}

async function saveSession(record){
    const { data, error } = await supabase
        .from('sessions')
        .upsert({
            id: record.id,
            session_id: record.sessionId,
            case_selected: record.caseSelected,
            status: record.status,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' })
        .select()
        .single();

    if(error) throw error;
    return data;
}


//Student Responses
async function saveStudentResponse(record){
    const { data, error } = await supabase
        .from('student_responses')
        .insert({
            id: record.id,
            session_id: record.sessionId,
            phase: record.phase,
            responses: record.responses,
            score: record.score,
            total_questions: record.totalQuestions,
            correct_answers: record.correctAnswers
        })
        .select()
        .single();

    if(error) throw error;
    return data;
}

async function getStudentResponsesBySession(sessionId){
    const { data, error} = await supabase
        .from('student_responses')
        .select('*')
        .eq('session_id', sessionId);

    if(error) return [];
    return data;
}

async function getAllStudentResponses() {
    const { data, error } = await supabase
        .from('student_responses')
        .select('*');

    if(error) return [];
    return data;
}

// Assessment Scores
async function saveAssessmentScore(record){
    const { data, error } = await supabase
        .from('assessment_scores')
        .insert({
            id: record.id,
            session_id: record.sessionId,
            phase: record.phase,
            score: record.score,
            total_questions: record.totalQuestions
        })
        .select()
        .single();

    if(error) throw error;
    return data;
}

async function getAssessmentScoresBySession(sessionId){
    const { data, error } = await supabase
        .from('assessment_scores')
        .select('*')
        .eq('session_id', sessionId);

    if(error) return [];
    return data;
}

async function getAllAssessmentScores() {
    const { data, error } = await supabase
        .from('assessment_scores')
        .select('*');

      if(error) return [];
      return data;  
}

module.exports = {
    findSessionBySessionId,
    getSessionId,
    saveSession,
    saveStudentResponse,
    getStudentResponsesBySession,
    getAllStudentResponses,
    saveAssessmentScore,
    getAssessmentScoresBySession,
    getAllAssessmentScores
}

// const fs = require('fs');
// const path = require('path');

// const DATA_DIR = path.join(__dirname, '..', 'data');

// //Ensure data directorey exists
// if(!fs.existsSync(DATA_DIR)){
//     fs.mkdirSync(DATA_DIR, { recursive: true});
// }

// //Helpers
// function readCollection(name) {
//   const file = path.join(DATA_DIR, `${name}.json`);
//   if (!fs.existsSync(file)) return [];
//   try {
//     return JSON.parse(fs.readFileSync(file, 'utf8'));
//   } catch {
//     return [];
//   }
// }

// function writeCollection(name, records) {
//     const file = path.join(DATA_DIR, `${name}.json`);
//     fs.writeFileSync(file, JSON.stringify(records, null, 2), 'utf8');
// }

// // Sessions
// function findSessionBySessionId(sessionId){
//     const records = readCollection('sessions');
//     return records.find(r => r.sessionId === sessionId) || null;
// }

// function getSessionById(id){
//     const records = readCollection('sessions');
//     return records.find(r => r.id === id) || null;
// }

// function saveSession(record){
//     const records = readCollection('sessions');
//     const idx = records.findIndex(r => r.id === record.id)
//     if(idx >= 0){
//         records[idx] = record;
//     }else {
//         records.push(record);
//     }
//     writeCollection('sessions', records);
//     return record;
// }

// // Student responses
// function saveStudentResponse(record) {
//     const records = readCollection('student_responses');
//     records.push(record);
//     writeCollection('student_responses', records);
//     return record;
// }

// function getStudentResponsesBySession(sessionId){
//     return readCollection('student_responses').filter(r => r.sessionId === sessionId);
// }

// function getAllStudentResponses() {
//     return readCollection('student_responses');
// }

// //Assessment Scores

// function saveAssessmentScore(record){
//     const records = readCollection('assessment_scores');
//     records.push(record);
//     writeCollection('assessment_scores', records);
//     return record;
// }

// function getAssessmentScoresBySession(sessionId){
//     return readCollection('assessment_scores').filter(r => r.sessionId === sessionId);
// }

// function getAllAssessmentScores() {
//     return readCollection('assessment_scores').filter(r => r.sessionId === sessionId);
// }

// module.exports = {
//     findSessionBySessionId,
//     getSessionById,
//     saveSession,
//     saveStudentResponse,
//     getStudentResponsesBySession,
//     getAllStudentResponses,
//     saveAssessmentScore,
//     getAssessmentScoresBySession,
//     getAllAssessmentScores,
// };