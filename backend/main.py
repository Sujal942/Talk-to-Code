from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Code Analysis API", description="API for ingesting Git repositories and analyzing code using QA models", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://talk-to-code-7tcv.vercel.app","https://talk-to-code.vercel.app", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models for request validation
class IngestRequest(BaseModel):
    repo_url: str
    exclude: str = "*.md,*.test.js"
    max_size_kb: int = 50

    class Config:
        schema_extra = {
            "example": {
                "repo_url": "https://github.com/user/repo.git",
                "exclude": "*.md,*.test.js",
                "max_size_kb": 50
            }
        }

class AnalyzeRequest(BaseModel):
    code: str
    question: str

    class Config:
        schema_extra = {
            "example": {
                "code": "def add(a, b): return a + b",
                "question": "What does this function do?"
            }
        }

# Lazy load the QA model
qa_model = None

def get_qa_model():
    global qa_model
    if qa_model is None:
        try:
            logger.info("Loading QA model...")
            qa_model = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")
            logger.info("QA model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load QA model: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to initialize QA model: {str(e)}")
    return qa_model

# Custom module for ingesting Git repositories (assuming it exists)
try:
    from gitingest import ingest
except ImportError as e:
    logger.error(f"Failed to import gitingest: {str(e)}")
    raise HTTPException(status_code=500, detail=f"Dependency error: {str(e)}")

import json

@app.post("/ingest", summary="Ingest a Git repository", response_description="Returns repository analysis")
async def ingest_repo(request: IngestRequest):
    try:
        logger.info(f"Ingesting repository: {request.repo_url}")
        summary, tree, content = ingest(
            request.repo_url,
            exclude=request.exclude.split(",") if request.exclude else [],
            max_size_kb=request.max_size_kb
        )
        return {
            "repoName": request.repo_url.split("/")[-1].replace(".git", ""),
            "directoryStructure": str(tree) if tree else "No structure available",
            "filesContent": content if content else {},
            "filesAnalyzed": summary.get("files_analyzed", 0),
            "estimatedTokens": summary.get("estimated_tokens", 0)
        }
    except Exception as e:
        logger.error(f"Error ingesting repository: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error ingesting repository: {str(e)}")

@app.post("/analyze", summary="Analyze code with a question", response_description="Returns answer and confidence")
async def analyze_code(request: AnalyzeRequest):
    try:
        logger.info("Analyzing code...")
        model = get_qa_model()
        result = model(question=request.question, context=request.code)
        return {
            "answer": result["answer"],
            "confidence": result["score"]
        }
    except Exception as e:
        logger.error(f"Error analyzing code: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

if __name__ == "__main__":
    logger.info("Starting FastAPI application...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
