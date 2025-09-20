#!/bin/bash

# Script để push MIA.vn project lên GitHub
# Chạy script này sau khi đã tạo repository trên GitHub

echo "🚀 Pushing MIA.vn Business Management System to GitHub..."

# Thay đổi URL repository này thành URL repository thực tế của bạn
# Ví dụ: https://github.com/username/MIA.vn-Business-Management-System.git
REPO_URL="https://github.com/username/MIA.vn-Business-Management-System.git"

# Kiểm tra xem remote origin đã được thêm chưa
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "📡 Adding remote origin..."
    git remote add origin $REPO_URL
else
    echo "📡 Updating remote origin..."
    git remote set-url origin $REPO_URL
fi

# Push code lên GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 Repository URL: $REPO_URL"
echo ""
echo "📋 Next steps:"
echo "1. Verify your repository on GitHub"
echo "2. Set up GitHub Pages if needed"
echo "3. Configure branch protection rules"
echo "4. Add collaborators if needed"
