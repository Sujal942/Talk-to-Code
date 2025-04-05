from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gitingest import ingest
from transformers import pipeline

app = FastAPI()

# Enable CORS for your Next.js app (update with your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for your Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models for request validation
class IngestRequest(BaseModel):
    repo_url: str
    exclude: str = "*.md,*.test.js"  # Default exclude pattern
    max_size_kb: int = 50  # Default max file size in KB

class AnalyzeRequest(BaseModel):
    code: str
    question: str

# Initialize AI model for question answering (optional)
qa_model = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

@app.post("/ingest")
async def ingest_repo(request: IngestRequest):
    try:
        summary, tree, content = ingest(
            request.repo_url,
            exclude=request.exclude.split(","),
            max_size_kb=request.max_size_kb
        )
        return {
            "repoName": request.repo_url.split("/")[-1],
            "directoryStructure": str(tree),  # Convert tree to string for JSON serialization
            "filesContent": content,
            "filesAnalyzed": summary.get("files_analyzed", 0),
            "estimatedTokens": summary.get("estimated_tokens", 0)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ingesting repository: {str(e)}")

@app.post("/analyze")
async def analyze_code(request: AnalyzeRequest):
    try:
        result = qa_model(question=request.question, context=request.code)
        return {
            "answer": result["answer"],
            "confidence": result["score"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)