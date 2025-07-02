import os
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from src.routers.patient_router import patient_route
from src.routers.cita_router import cita_route
from src.routers.doctor_router import doctor_route
from src.routers.tratamiento_router import tratamiento_route
from src.routers import auth
from src.utils.database import Base, engine
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Create database tables
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully")
except Exception as e:
    logger.error(f"Error creating database tables: {str(e)}")
    raise

# FastAPI App
app = FastAPI()

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Configura Jinja2Templates para apuntar al directorio dist
templates = Jinja2Templates(directory="../dist")

# Monta el directorio dist para servir archivos estáticos
app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

# Include routers
app.include_router(patient_route, prefix="/api/pacientes", tags=["pacientes"])
app.include_router(cita_route, prefix="/api/citas", tags=["citas"])
app.include_router(doctor_route, prefix="/api/doctores", tags=["doctores"])
app.include_router(tratamiento_route, prefix="/api/tratamientos", tags=["tratamientos"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error handler caught: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again later."},
    )


@app.exception_handler(404)
async def exception_404_handler(request, exc):
    return FileResponse("dist/index.html")


@app.get("/")
async def serve_react():
    return HTMLResponse(open("dist/index.html").read())
