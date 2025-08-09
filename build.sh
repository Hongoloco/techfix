# Build script for Vercel deployment
# This ensures Prisma is properly set up before building

echo "🔧 Setting up Prisma for production build..."

# Generate Prisma client
npx prisma generate

echo "✅ Prisma client generated successfully"

# Build the Next.js application
echo "🚀 Building Next.js application..."
next build

echo "✅ Build completed successfully"
