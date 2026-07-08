# Kloris — Potato Leaf Disease Detector

## Overview

**Kloris** is an AI-powered potato leaf disease detection application that uses a **Convolutional Neural Network (CNN)** to identify diseases from leaf images. The project provides predictions through a FastAPI backend and is accessible via both a React web application and a cross-platform mobile application built with Expo.

The complete system follows an end-to-end machine learning deployment pipeline, from model training to backend API development, frontend integration, cloud deployment, and mobile application delivery.

---

## Features

* Potato leaf disease detection using Deep Learning
* CNN model achieving **97%+ classification accuracy**
* FastAPI backend for serving predictions
* React-based web interface
* Expo React Native mobile application
* Backend deployed on Render
* REST API integration between frontend and backend
* API tested using Postman
* Mobile application bundled as an APK
* Successfully installed and tested on a **physical Android device**

---

## Project Architecture

```text
                Leaf Image
                     │
                     ▼
              React Web App
                     │
                     │
        Expo Mobile Application
                     │
                     ▼
              FastAPI Backend (deployed on render)
                     │
                     ▼
          CNN Disease Prediction Model
                     │
                     ▼
          Predicted Disease Class
```

---

## Tech Stack

### Machine Learning

* Python
* Pytorch
* Convolutional Neural Networks (CNN)

### Backend

* FastAPI
* Uvicorn

### Frontend

* React
* Tailwind CSS

### Mobile

* React Native
* Expo Framework

### Deployment & Tools

* Render
* Postman
* Git
* GitHub

---

## Model Performance

| Metric                  |                              Value |
| ----------------------- | ---------------------------------: |
| Model                   | Convolutional Neural Network (CNN) |
| Classification Accuracy |                          **≥ 97%** |
| Input                   |                  Potato Leaf Image |
| Output                  |     Disease Prediction, Confidence |

---

## Future Improvements

* Support additional crop diseases
* Real-time camera-based prediction
* Offline inference using TensorFlow Lite
* User history and prediction logs
* Farmer recommendation system
* Multilingual support
* Authentication & Authorization 
---

## Learning Outcomes

This project provided practical experience in:

* Deep Learning with CNNs
* Image Classification
* FastAPI backend development
* REST API design
* API testing using Postman
* React frontend development
* React Native (Expo) mobile development
* Cloud deployment with Render
* End-to-end Machine Learning application deployment
* Mobile application packaging and testing on real hardware

---

## Acknowledgements

Kloris was developed as an end-to-end AI application demonstrating the complete workflow of training a deep learning model, exposing it through a production-ready API, deploying it to the cloud, and consuming it through both web and mobile clients.
