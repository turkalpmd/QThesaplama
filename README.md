<div align="center">
  <img src="QT-RRinterval.png" alt="QTcalc Banner" width="800" height="400" style="border-radius: 10px;" />
  
  # QTcalc - QTc Hesaplayıcı
  
  [![Capacitor](https://img.shields.io/badge/Capacitor-7.4.3-blue.svg)](https://capacitorjs.com/)
  [![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
  
  **EKG'de QT aralığını düzeltmek için kullanılan profesyonel tıbbi araç**
</div>

---

## 📱 Uygulama Hakkında

**QTcalc**, kardiyologlar, acil servis doktorları ve tıp öğrencileri için geliştirilmiş, EKG'de QT aralığını düzeltmek için kullanılan modern bir web ve mobil uygulamadır.

### ✨ Özellikler

- 🩺 **Çoklu Formül Desteği**: Bazett, Fridericia, Framingham, Hodges, Rautaharju
- 👥 **Cinsiyet Bazlı Hesaplama**: Erkek/Kadın için ayrı referans değerleri
- 📊 **Anlık Sonuç**: RR ve QT değerlerine göre anında QTc hesaplama
- 🎯 **Yorum Sistemi**: Hesaplanan değere göre klinik yorum
- 💊 **İlaç Uyarıları**: QTc uzatan ilaçlar hakkında bilgi
- 📱 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- 🔗 **CredibleMeds Entegrasyonu**: Güvenilir ilaç bilgisi kaynağı

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- **Node.js** (v18 veya üzeri)
- **npm** veya **yarn**
- **Android Studio** (mobil geliştirme için)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/yourusername/QTcalc.git
cd QTcalc
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:5173 adresinde açılacaktır.

---

## 🏗️ Build ve Dağıtım

### Web Build

```bash
npm run build
```

### Capacitor ile Mobil Build

```bash
# Android platformunu ekleyin
npm run cap:add:android

# Projeyi build edin ve senkronize edin
npm run cap:build

# Android Studio'da açın
npm run cap:open:android
```

### Kullanılabilir Scriptler

- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run cap:sync` - Capacitor senkronizasyonu
- `npm run cap:build` - Build ve senkronizasyon
- `npm run cap:open:android` - Android Studio'da aç

---

## 📱 Mobil Uygulama

QTcalc, Capacitor kullanılarak mobil platformlara taşınabilir:

- **Android**: APK ve App Bundle (.aab) desteği
- **iOS**: Xcode ile build edilebilir
- **PWA**: Progressive Web App olarak kullanılabilir

### Android Build

```bash
# Release APK oluşturma
cd android
./gradlew assembleRelease
```

---

## 🧮 Kullanım

### 1. Hasta Bilgileri
- **Yaş** girin
- **Cinsiyet** seçin (Erkek/Kadın)

### 2. EKG Değerleri
- **RR aralığı** (ms cinsinden)
- **QT aralığı** (ms cinsinden)

### 3. Formül Seçimi
- **Bazett**: En yaygın kullanılan formül
- **Fridericia**: Alternatif formül
- **Framingham**: Yaş bazlı düzeltme
- **Hodges**: RR bazlı düzeltme
- **Rautaharju**: Özel algoritma

### 4. Sonuç
- **Düzeltilmiş QT (QTc)** değeri
- **Klinik yorum** (Normal, Uzun, Çok Uzun)
- **Referans değerler**

---

## 🏥 Tıbbi Uyarı

**⚠️ ÖNEMLİ**: Bu uygulama sadece eğitim amaçlıdır ve profesyonel tıbbi tavsiye yerine geçmez.

- Tıbbi kararlar için her zaman bir sağlık uzmanına danışın
- Hesaplanan değerler sadece referans amaçlıdır
- Klinik kararlar için ek değerlendirme gerekebilir

---

## 🔧 Teknik Detaylar

### Teknoloji Stack'i

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **UI Framework**: Tailwind CSS
- **Mobile**: Capacitor 7
- **Platform**: Android, iOS, Web

### Proje Yapısı

```
QTcalc/
├── src/                    # Kaynak kodlar
├── public/                 # Statik dosyalar
│   ├── favicon/           # Uygulama ikonları
│   └── QT-RRinterval.png  # EKG örnek görseli
├── android/                # Android platform dosyaları
├── capacitor.config.ts     # Capacitor yapılandırması
└── package.json           # Proje bağımlılıkları
```

---

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir. Tıbbi kullanım için uygun değildir.

---

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

---

## 📞 İletişim

- **Proje**: [QTcalc Repository](https://github.com/yourusername/QTcalc)
- **Geliştirici**: [Your Name](https://github.com/yourusername)

---

<div align="center">
  <p>❤️ Tıp dünyasına katkıda bulunmak için geliştirildi</p>
</div>
