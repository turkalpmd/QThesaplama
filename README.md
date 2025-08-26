<div align="center">
  <img src="ECGsegments.jpg" alt="QTcalc Afişi" width="800" height="400" style="border-radius: 10px;" />
  
  # QTcalc – QTc Hesaplayıcı
  
  [![Capacitor](https://img.shields.io/badge/Capacitor-7.4.3-blue.svg)](https://capacitorjs.com/)
  [![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
  
  **EKG’de QT aralığının düzeltilmiş değerini (QTc) hesaplayan profesyonel klinik yardımcı araç**
</div>

---

## 📱 Uygulama Hakkında

**QTcalc**, kardiyologlar, acil tıp hekimleri ve tıp öğrencileri için tasarlanmış modern bir web ve mobil uygulamadır. EKG’de QT aralığını çeşitli formüllerle düzelterek **QTc** hesaplamasını hızlı ve anlaşılır biçimde sunar.

### ✨ Özellikler

- 🩺 **Birden Çok Formül**: Bazett, Fridericia, Framingham, Hodges, Rautaharju
- 👥 **Cinsiyete Göre Referans**: Erkek/Kadın için ayrı eşik ve yorumlar
- 📊 **Anlık Hesaplama**: RR ve QT girdilerine göre eşzamanlı QTc sonucu
- 🎯 **Klinik Yorum**: Sonuca göre otomatik ve kısa değerlendirme
- 💊 **İlaç Uyarıları**: QTc’yi uzattığı bilinen ilaçlara dair bilgi
- 📱 **Duyarlı Arayüz**: Tüm cihazlarda temiz ve akıcı görünüm
- 🔗 **CredibleMeds Entegrasyonu**: Güvenilir ilaç veri kaynağına bağlantı

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- **Node.js** (v18+)
- **npm** veya **yarn**
- **Android Studio** (mobil derleme için)

### 1) Projeyi Klonlayın

```bash
git clone https://github.com/yourusername/QTcalc.git
cd QTcalc
````

### 2) Bağımlılıkları Yükleyin

```bash
npm install
```

### 3) Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama **[http://localhost:5173](http://localhost:5173)** adresinde çalışacaktır.

---

## 🏗️ Derleme ve Dağıtım

### Web Derleme

```bash
npm run build
```

### Capacitor ile Mobil Derleme

```bash
# Android platformunu ekleyin
npm run cap:add:android

# Derleyin ve senkronize edin
npm run cap:build

# Android Studio’da açın
npm run cap:open:android
```

### Kullanılabilir Komutlar

* `npm run dev` – Geliştirme sunucusu
* `npm run build` – Üretim (production) derlemesi
* `npm run cap:sync` – Capacitor senkronizasyonu
* `npm run cap:build` – Derleme + senkronizasyon
* `npm run cap:open:android` – Android Studio’da açma

---

## 📱 Mobil Uygulama

QTcalc, **Capacitor** altyapısıyla mobil platformlara taşınabilir:

* **Android**: APK ve App Bundle (.aab) oluşturma
* **iOS**: Xcode ile derleme
* **PWA**: Progressive Web App olarak kullanılabilir

### Android (Release) Derleme

```bash
cd android
./gradlew assembleRelease
```

---

## 🧮 Kullanım

### 1) Hasta Bilgileri

* **Yaş** girin
* **Cinsiyet** seçin (Erkek/Kadın)

### 2) EKG Değerleri

* **RR aralığı** (ms)
* **QT aralığı** (ms)

### 3) Formül Seçimi

* **Bazett**, **Fridericia**, **Framingham**, **Hodges**, **Rautaharju**

### 4) Sonuçlar

* **Düzeltilmiş QT (QTc)** değeri
* **Klinik yorum** (Normal / Uzamış / Belirgin uzamış)
* **Referans aralıkları**

---

## 🏥 Tıbbi Uyarı

**⚠️ Önemli:** Bu uygulama eğitim amaçlıdır; **tıbbi tanı ve tedavinin yerine geçmez**.

* Klinik kararlar için her zaman yetkili bir sağlık profesyoneline danışın.
* Hesaplanan değerler **yalnızca referans** niteliğindedir.
* Klinik değerlendirme ve ek tetkikler gerekebilir.

---

## 🔧 Teknik Detaylar

### Teknoloji Yığını

* **Ön Yüz**: React 19 + TypeScript
* **Derleme Aracı**: Vite 6
* **UI**: Tailwind CSS
* **Mobil**: Capacitor 7
* **Platformlar**: Android, iOS, Web

### Proje Yapısı

```
QTcalc/
├── src/                     # Kaynak kod
├── public/                  # Statik dosyalar
│   ├── favicon/             # Uygulama ikonları
│   └── ECGsegments.jpg    # Örnek EKG görseli
├── android/                 # Android platform dosyaları
├── capacitor.config.ts      # Capacitor yapılandırması
└── package.json             # Bağımlılıklar ve komutlar
```

---

## 📄 Lisans

Bu proje **eğitim amaçlı** geliştirilmiştir; **klinik kullanım için uygun değildir**.
Geliştirme sürecinde **Google** ve **Cursor** araçlarından yararlanılmıştır.

---

## 🤝 Katkıda Bulunma

1. Depoyu fork’layın
2. Özellik dalı açın: `git checkout -b feature/AmazingFeature`
3. Değişikliklerinizi commit’leyin: `git commit -m 'Add some AmazingFeature'`
4. Dalı origin’e gönderin: `git push origin feature/AmazingFeature`
5. Pull Request oluşturun

---

## 📞 İletişim

* **Proje**: [Düzeltilmiş QT Hesaplama](https://github.com/turkalpmd/QThesaplama)
* **Geliştirici**: [İzzet Türkalp Akbaşlı](https://www.linkedin.com/in/turkalpmd/)

---

<div align="center">
  <p>❤️ Sağlık hizmetine katkı sunmak için geliştirildi</p>
</div>

