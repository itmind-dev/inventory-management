# Define the target ZIP filename
$zipName = "BananaLeaf_Docker_Host.zip"
$currentPath = Get-Location

# Define items to include
$includeItems = @(
    "branch-sales-backend",
    "branch-sales-management",
    "docker-compose.yml",
    "README.md"
)

# Define items to exclude (patterns)
$excludePatterns = @(
    "node_modules",
    "target",
    ".git",
    ".idea",
    ".vscode",
    "*.log",
    "dist",
    "build"
)

Write-Host "Creating $zipName..." -ForegroundColor Cyan

# Remove existing zip if it exists
if (Test-Path $zipName) {
    Remove-Item $zipName
}

# Create a temporary directory for grouping files
$tempDir = Join-Path $env:TEMP "BananaLeaf_Host_Temp"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir

# Copy relevant files to the temp directory
foreach ($item in $includeItems) {
    if (Test-Path $item) {
        $destPath = Join-Path $tempDir $item
        Copy-Item -Path $item -Destination $destPath -Recurse -Exclude $excludePatterns
        
        # Manually cleanup common binary/unwanted directories if copy -Exclude didn't catch them deep
        Get-ChildItem -Path $destPath -Recurse -Directory | Where-Object { $_.Name -in $excludePatterns } | Remove-Item -Recurse -Force
    }
}

# Compress the temp directory into the ZIP file
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipName -Force

# Cleanup temp directory
Remove-Item -Recurse -Force $tempDir

Write-Host "Successfully created $zipName in current directory!" -ForegroundColor Green
