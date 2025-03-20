#!/bin/bash

echo "🚀 Starting Sport Event App..."

# Step 1: Start MySQL Service (Mac/Linux)
echo "🛠️ Starting MySQL..."
brew services start mysql || sudo systemctl start mysql

# Step 2: Activate Python Virtual Environment (Optional)
if [ -d "venv" ]; then
    echo "🐍 Activating virtual environment..."
    source venv/bin/activate
fi

# Step 3: Run Django Server
echo "🛠️ Starting Django Backend..."
cd backendpython
python3 manage.py runserver &

# Step 4: Run Next.js Frontend
echo "🌍 Starting Next.js Frontend..."
cd ../frontend
npm install  # Ensure dependencies are installed
npm run dev &

echo "✅ App is Running!"
echo "🔗 Django API: http://127.0.0.1:8000/"
echo "🔗 Next.js Frontend: http://localhost:3000/"
