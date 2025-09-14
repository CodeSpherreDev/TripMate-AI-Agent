from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
import json
import time
from tenacity import retry, stop_after_attempt, wait_exponential
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Configuration from .env
CONFIG = {
    "API_KEY": os.getenv("API_KEY"),
    "PROJECT_ID": os.getenv("PROJECT_ID"),
    "DEPLOYMENT_ID": os.getenv("DEPLOYMENT_ID"),
    "REGION": os.getenv("REGION", "us-south"),
    "API_VERSION": os.getenv("API_VERSION", "2021-05-01"),
}

# Validate required configs
for k, v in CONFIG.items():
    if not v:
        raise ValueError(f"❌ Missing environment variable: {k}")

app = FastAPI()

# Data Models
class ChatMessage(BaseModel):
    message: str
    stream: bool = False

class ChatResponse(BaseModel):
    response: str
    status: str

class HealthResponse(BaseModel):
    status: str
    api_ready: bool

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint URLs
TOKEN_URL = "https://iam.cloud.ibm.com/identity/token"
BASE_ENDPOINT = f"https://{CONFIG['REGION']}.ml.cloud.ibm.com/ml/v4/deployments/{CONFIG['DEPLOYMENT_ID']}"
REGULAR_ENDPOINT = f"{BASE_ENDPOINT}/ai_service?version={CONFIG['API_VERSION']}"
STREAMING_ENDPOINT = f"{BASE_ENDPOINT}/ai_service_stream?version={CONFIG['API_VERSION']}"

# Token cache
token_cache = {"token": None, "expires_at": 0}

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10), reraise=True)
def get_ibm_token():
    """Get or refresh IBM IAM token"""
    if token_cache["token"] and token_cache["expires_at"] > time.time():
        return token_cache["token"]

    resp = requests.post(
        TOKEN_URL,
        data={
            "apikey": CONFIG["API_KEY"],
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        },
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        timeout=10,
    )
    resp.raise_for_status()
    token_data = resp.json()

    token_cache["token"] = token_data["access_token"]
    token_cache["expires_at"] = time.time() + 3600  # 1h
    return token_cache["token"]

def get_watsonx_payload(message: str):
    """Watsonx payload format"""
    return {
        "input": [
            {"role": "user", "content": [{"text": message}]}
        ],
        "project_id": CONFIG["PROJECT_ID"],
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 200,
            "min_new_tokens": 1,
            "temperature": 0.7,
            "top_p": 0.9,
            "repetition_penalty": 1.1,
        },
    }

def format_response(data: dict) -> str:
    """Extract assistant text"""
    try:
        return data["output"][0]["content"][0]["text"]
    except (KeyError, IndexError):
        return "⚠️ No response content found"

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check"""
    try:
        token = get_ibm_token()
        return {"status": "healthy", "api_ready": bool(token)}
    except Exception:
        return {"status": "unhealthy", "api_ready": False}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    """Chat endpoint"""
    if not message.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    token = get_ibm_token()
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = get_watsonx_payload(message.message)
    endpoint = STREAMING_ENDPOINT if message.stream else REGULAR_ENDPOINT

    logger.info(f"➡️ Sending to: {endpoint}")

    resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)

    if resp.status_code == 401:  # token expired
        token_cache["token"] = None
        token = get_ibm_token()
        headers["Authorization"] = f"Bearer {token}"
        resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)

    if not resp.ok:
        logger.error(f"❌ API error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    try:
        data = resp.json()
        reply = format_response(data)
        return ChatResponse(response=reply, status="success")
    except ValueError:
        raise HTTPException(status_code=502, detail="Invalid JSON from service")

if __name__ == "__main__":
    import uvicorn
    logger.info("🚀 Starting Watsonx Chat API")
    logger.info(f"✅ Regular endpoint: {REGULAR_ENDPOINT}")
    logger.info(f"✅ Streaming endpoint: {STREAMING_ENDPOINT}")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
