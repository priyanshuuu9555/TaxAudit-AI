# TaxAudit AI 🧾

**Machine Learning-Based Tax Risk Analysis & Explainability Platform**

TaxAudit AI is a web-based application designed to analyze taxpayer records and identify potentially high-risk cases using Machine Learning, expert rule-based scoring, and explainable AI.

The platform combines predictive ML models with domain-inspired rules to provide risk scores, risk classifications, and explanations of the factors influencing predictions.

## 🚀 Features

- **Taxpayer Analysis:** Analyze taxpayer records and their financial attributes.
- **Machine Learning Predictions:** Predict potential tax audit risk using trained ML models.
- **Hybrid Risk Scoring:** Combine machine learning predictions with expert rule-based scoring.
- **Risk Classification:** Categorize taxpayers into risk levels such as Low, Medium, High, and Critical.
- **Explainable AI:** Use SHAP to understand the features influencing model predictions.
- **Audit Queue:** Identify and review high-risk taxpayer records.
- **Dashboard & Analytics:** Visualize taxpayer data and risk insights.
- **REST API:** Connect frontend components with backend prediction and analysis services.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Vite
- CSS
- Axios

### Backend
- Python
- Django
- Django REST Framework

### Machine Learning & Data Analysis
- Scikit-learn
- XGBoost
- Pandas
- NumPy
- SHAP

### Database
- MySQL

## 🧠 Machine Learning Approach

The project uses multiple machine learning models for taxpayer risk prediction:

- Logistic Regression
- Random Forest
- XGBoost

The models are trained on taxpayer-related features and used to predict risk classifications.

### Hybrid Risk Engine

The system combines ML model predictions with rule-based checks to generate an additional risk score.

This approach helps combine data-driven predictions with predefined risk indicators instead of relying solely on a machine learning model.

### Explainability with SHAP

SHAP (SHapley Additive exPlanations) is used to understand how individual features contribute to a model's prediction.

It helps users interpret why a taxpayer record may receive a higher or lower predicted risk.

## 🏗️ Architecture

```text
React Frontend
      |
      | REST API Requests
      v
Django Backend
      |
      ├── Taxpayer Management
      ├── Prediction API
      ├── Risk Analysis
      ├── Hybrid Risk Engine
      └── SHAP Explainability
                |
                v
       Machine Learning Models
       ├── Logistic Regression
       ├── Random Forest
       └── XGBoost
                |
                v
          MySQL Database
```

## 📂 Project Structure

```text
TaxAudit-AI/
│
├── backend/
│   ├── audit/
│   ├── config/
│   ├── ml/
│   │   ├── data/
│   │   │   ├── generate_dataset.py
│   │   │   └── taxpayer_dataset.csv
│   │   ├── models/
│   │   │   ├── logistic_regression.pkl
│   │   │   ├── random_forest.pkl
│   │   │   ├── xgboost.pkl
│   │   │   └── scaler.pkl
│   │   ├── explain_prediction.py
│   │   ├── hybrid_score.py
│   │   ├── risk_engine.py
│   │   └── train_models.py
│   ├── predictions/
│   ├── rules/
│   ├── taxpayers/
│   └── manage.py
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/priyanshuuu9555/TaxAudit-AI.git
cd TaxAudit-AI
```

### 2. Frontend Setup

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required Python dependencies.

If a `requirements.txt` file is available:

```bash
pip install -r requirements.txt
```

Configure your database settings in Django's `settings.py` and ensure your MySQL server is running.

Run database migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

Backend will run at:

```text
http://127.0.0.1:8000
```

## 📊 Workflow

1. Load taxpayer data into the system.
2. Retrieve taxpayer records through the backend API.
3. Process relevant features using trained ML models.
4. Generate machine learning predictions.
5. Calculate additional risk using hybrid rule-based scoring.
6. Generate explanations using SHAP.
7. Display risk classifications and analysis in the React dashboard.

## 🎯 Project Objective

The objective of TaxAudit AI is to demonstrate how Machine Learning, rule-based reasoning, and explainable AI can be combined to build an analytical system for identifying and interpreting potentially high-risk taxpayer records.

## 🔮 Future Improvements

- Authentication and role-based access control.
- More comprehensive tax compliance rules.
- Model performance monitoring.
- Improved data validation and preprocessing.
- Deployment using cloud infrastructure.
- Automated testing and CI/CD integration.

## ⚠️ Disclaimer

TaxAudit AI is an educational project and prototype developed for learning and demonstration purposes. Its predictions and risk scores are not official tax audit decisions, financial advice, or legal conclusions.

---

## 👨‍💻 Author

**Priyanshu Kumar Singh**

B.Tech Computer Science & Engineering

GitHub: [@priyanshuuu9555](https://github.com/priyanshuuu9555)

Project Repository: [TaxAudit-AI](https://github.com/priyanshuuu9555/TaxAudit-AI)