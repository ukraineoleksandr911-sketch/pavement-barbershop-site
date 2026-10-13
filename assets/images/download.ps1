$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$wc = New-Object System.Net.WebClient

$images = @(
    "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1200&q=80|hero.jpg",
    "https://images.unsplash.com/photo-1672642150228-3fcd5826ec26?auto=format&fit=crop&w=600&q=80|barber-alexi.jpg",
    "https://images.unsplash.com/photo-1605497787865-e6d4762b386f?auto=format&fit=crop&w=600&q=80|barber-aleks.jpg",
    "https://images.unsplash.com/photo-1589985494639-69e60c82cab2?auto=format&fit=crop&w=600&q=80|barber-mehdi.jpg",
    "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?auto=format&fit=crop&w=600&q=80|classic-1.jpg",
    "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80|fade-1.jpg",
    "https://images.unsplash.com/photo-1553521041-d168abd31de3?auto=format&fit=crop&w=800&q=80|beard-1.jpg",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80|fade-2.jpg",
    "https://images.unsplash.com/photo-1657105052497-f996284ffff8?auto=format&fit=crop&w=600&q=80|classic-2.jpg",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80|beard-2.jpg",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80|inchair.jpg",
    "https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=1000&q=80|interior.jpg",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80|strip-tools.jpg",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80|strip-chair.jpg",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80|strip-inchair.jpg",
    "https://images.unsplash.com/photo-1678356164573-9a534fe43958?auto=format&fit=crop&w=400&q=80|strip-exterior.jpg",
    "https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=400&q=80|strip-interior.jpg",
    "https://images.unsplash.com/photo-1592647420148-bfcc177e2117?auto=format&fit=crop&w=400&q=80|strip-redchair.jpg"
)

foreach ($entry in $images) {
    $parts = $entry -split "\|"
    $url = $parts[0]
    $file = $parts[1]
    $dest = Join-Path $dir $file
    Write-Host "Downloading $file..." -NoNewline
    try {
        $wc.DownloadFile($url, $dest)
        Write-Host " OK" -ForegroundColor Green
    } catch {
        Write-Host " FAILED" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Done! Now run:" -ForegroundColor Cyan
Write-Host "  git add assets/images/"
Write-Host "  git commit -m feat: add local images"
Write-Host "  git push"
