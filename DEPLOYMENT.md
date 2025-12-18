# Deployment Rehberi

## Vercel ile Ücretsiz Yayınlama

### 1. GitHub'a Yükleme

```bash
# Projeyi GitHub'a push edin
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/fanzone.git
git push -u origin main
```

### 2. Vercel'e Deploy

1. https://vercel.com adresine gidin
2. GitHub hesabınızla giriş yapın
3. "Add New Project" → Repository'nizi seçin
4. Ayarları kontrol edin:
   - Framework: Next.js (otomatik)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Environment Variables ekleyin (gerekirse):
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = API key'iniz
6. "Deploy" butonuna tıklayın

### 3. Domain

- Vercel otomatik olarak `proje-adi.vercel.app` domain'i verir
- Özel domain eklemek için: Project Settings → Domains

### 4. Otomatik Deploy

Her GitHub push'unda otomatik olarak yeni versiyon deploy edilir.

## Alternatif: Netlify

1. https://netlify.com → "Add new site"
2. GitHub repository'nizi bağlayın
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Domain: `proje-adi.netlify.app`

## Önemli Notlar

- Google Maps API key kullanıyorsanız, Environment Variables'a ekleyin
- Ücretsiz plan yeterlidir
- SSL sertifikası otomatik olarak eklenir

