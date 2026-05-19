command to run the aiservices:- uvicorn main:app --reload

for aiservices :-
1. make env first:- 
    python -m venv venv
    source venv\Scripts\activate

and then:-
 run uvicorn main:app --reload
and go to :- http://127.0.0.1:8000/docs



in backend:-
tsconfig.json should be something like:-
{
  "compilerOptions": {

    "target": "ES2020",

    "module": "commonjs",

    "moduleResolution": "node",

    "esModuleInterop": true,

    "strict": true,

    "skipLibCheck": true
  }
}

# AI-Powered Sentiment & Emotion Analysis Platform

## Features
- YouTube comment extraction
- Emotion detection using Transformers
- Emoji-aware sentiment analysis
- AI-generated summaries
- Positive/negative comment detection
- FastAPI AI microservice
- Node.js backend gateway

## Tech Stack
- React (upcoming)
- Node.js
- Express
- FastAPI
- Hugging Face Transformers
- MongoDB (upcoming)

## Architecture

Frontend
→ Node.js Backend
→ FastAPI AI Service
→ MongoDB

## AI Models
- j-hartmann/emotion-english-distilroberta-base
- sshleifer/distilbart-cnn-12-6