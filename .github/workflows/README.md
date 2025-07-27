# Docker Image CI/CD

This repository includes automated Docker image building and publishing using GitHub Actions.

## 🚀 Features

- **Multi-architecture support**: Builds for both `linux/amd64` and `linux/arm64`
- **Automated tagging**: Smart tag generation based on git tags and branches
- **GitHub Container Registry**: Images are published to `ghcr.io`
- **Security scanning**: Automatic vulnerability scanning with Trivy
- **Build caching**: Optimized builds using GitHub Actions cache
- **Attestations**: Cryptographic proof of build provenance

## 📋 Workflow Triggers

### Automatic (Tag Push)
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Manual (Workflow Dispatch)
1. Go to Actions tab in GitHub
2. Select "Build and Push Docker Image"
3. Click "Run workflow"
4. Enter desired tag (default: "latest")

## 🏷️ Tag Strategy

The workflow automatically generates tags based on:

- **Semantic versioning** from git tags:
  - `v1.2.3` → `1.2.3`, `1.2`, `1`, `latest`
- **Branch names** for development:
  - `main` → `latest`
  - `develop` → `develop`
- **Pull requests**:
  - `pr-123` → `pr-123`

## 📦 Published Images

Images are published to GitHub Container Registry:

```bash
# Pull the latest image
docker pull ghcr.io/yourusername/discourse-connect:latest

# Pull a specific version
docker pull ghcr.io/yourusername/discourse-connect:1.0.0

# Pull ARM64 image specifically
docker pull ghcr.io/yourusername/discourse-connect:latest --platform linux/arm64
```

## 🔐 Security

- **Vulnerability scanning**: Every built image is scanned for security vulnerabilities
- **SARIF reports**: Results are uploaded to GitHub Security tab
- **Attestations**: Build provenance is cryptographically signed and attached

## 🛠️ Local Development

### Build locally
```bash
# Build for current platform
docker build -t discourse-connect .

# Build for multiple platforms (requires buildx)
docker buildx build --platform linux/amd64,linux/arm64 -t discourse-connect .
```

### Test the image
```bash
docker run -p 3000:3000 discourse-connect
```

## 📊 Build Information

Each image includes metadata labels:
- Build timestamp
- Git commit SHA
- Version information
- Source repository

View image metadata:
```bash
docker inspect ghcr.io/yourusername/discourse-connect:latest
```

## 🚦 Permissions Required

The workflow requires the following GitHub token permissions:
- `contents: read` - Access repository contents
- `packages: write` - Push to GitHub Container Registry
- `security-events: write` - Upload security scan results
- `id-token: write` - Generate attestations

## 📝 Notes

- Build time varies by architecture (ARM64 typically takes longer)
- Images use Node.js 18 Alpine Linux base for minimal size
- Multi-stage builds optimize final image size
- Caching reduces subsequent build times