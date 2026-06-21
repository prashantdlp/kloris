from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms
import io

from api.architecture import MyCNN, dataset_clases, ImageSize

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = MyCNN
model.load_state_dict(torch.load("models/model1.pth", map_location="cpu"))
model.eval()

transform = transforms.Compose([
    transforms.Resize(ImageSize),
    transforms.ToTensor() 
])

@app.get("/")
async def hello():
    return {"Hello" : "World"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        return {"error": "Invalid image file"}
    
    tensor = transform(image).unsqueeze(0)

    device = torch.device("cpu")
    tensor = tensor.to(device)
    model.to(device)

    with torch.no_grad():
        outputs = model(tensor)

        probabilities = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
        
        pred_class = predicted.item()
        confidence = confidence.item()

    return {
        "pred_class": dataset_clases[pred_class],
        "confidence": confidence
    }