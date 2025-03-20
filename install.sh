#!/bin/bash

# Sport Event App Setup Script

echo "🚀 Starting Sport Event App setup..."

# Step 1: Install Dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Step 2: Set up MySQL Database
echo "🛠️ Setting up MySQL database..."
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS sportapp_db;
CREATE USER IF NOT EXISTS 'django_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON sportapp_db.* TO 'django_user'@'localhost';
FLUSH PRIVILEGES;
EOF
echo "✅ MySQL database setup complete."

# Step 3: Apply Migrations
echo "🔄 Applying migrations..."
python manage.py makemigrations
python manage.py migrate

# Step 4: Create Superuser (Automated)
echo "👤 Creating superuser..."
python manage.py createsuperuser --noinput || echo "⚠️ Superuser creation skipped. You can create one manually using: python manage.py createsuperuser"

# Step 5: Start Server
echo "🚀 Starting Django server..."
python manage.py runserver

echo "✅ Setup Complete! Acce
