#!/bin/bash

echo "🧹 Cleaning up old processes..."
pm2 delete django-backend 2>/dev/null
pm2 delete nextjs-frontend 2>/dev/null

echo "🚀 Starting Sport Event App..."

# Step 0: Ensure pm2 is installed
if ! command -v pm2 &> /dev/null
then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Step 1: Start MySQL Service (Mac/Linux)
echo "🛠️ Starting MySQL..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mysql
else
    sudo systemctl start mysql
fi

# Step 2: Activate Python Virtual Environment (Optional)
if [ -d "venv" ]; then
    echo "🐍 Activating virtual environment..."
    source venv/bin/activate
fi

# Step 3: Run Django Server
echo "🛠️ Starting Django Backend..."
cd backendpython || exit
pm2 start python3 --name "django-backend" -- manage.py runserver
cd ..

# Step 4: Run Next.js Frontend
echo "🌍 Starting Next.js Frontend..."
cd frontend || exit
npm install
pm2 start npm --name "nextjs-frontend" -- run dev
cd ..

# Step 5: Show status
pm2 status

echo "✅ App is Running!"
echo "🔗 Django API: http://127.0.0.1:8000/"
echo "🔗 Next.js Frontend: http://localhost:3000/"
