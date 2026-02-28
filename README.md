# murojaat.uz — Fuqarolar Murojaat Platformasi

Davlat tashkilotlariga murojaat yuborish uchun React platforma.

## Texnologiyalar

- React 18
- CSS Modules
- Create React App

## Ishga tushirish

```bash
# 1. Papkaga kiring
cd murojaat-portal

# 2. Paketlarni o'rnating
npm install

# 3. Ishga tushiring
npm start
```

Brauzer avtomatik ravishda `http://localhost:3000` da ochiladi.

## Build qilish (production)

```bash
npm run build
```

## Loyiha strukturasi

```
murojaat-portal/
├── public/
│   └── index.html
├── src/
│   ├── data/
│   │   └── index.js          # Barcha ma'lumotlar (kategoriyalar, joylar va h.k.)
│   ├── components/
│   │   ├── Sidebar.jsx        # Yon panel navigatsiya
│   │   ├── Sidebar.module.css
│   │   ├── Header.jsx         # Yuqori qism
│   │   ├── Header.module.css
│   │   ├── Hero.jsx           # Bosh banner
│   │   ├── Hero.module.css
│   │   ├── StatsRow.jsx       # Statistika kartochkalari
│   │   ├── StatsRow.module.css
│   │   ├── CategoriesGrid.jsx # Sohalar panjarasi
│   │   ├── CategoriesGrid.module.css
│   │   ├── MapSection.jsx     # Interaktiv xarita
│   │   ├── MapSection.module.css
│   │   ├── AssistantSection.jsx  # AI ariza yordamchisi
│   │   ├── AssistantSection.module.css
│   │   ├── RecentAppeals.jsx  # So'nggi murojaatlar + tezkor forma
│   │   ├── RecentAppeals.module.css
│   │   ├── SubmitModal.jsx    # Murojaat yuborish modali
│   │   └── SubmitModal.module.css
│   ├── App.jsx                # Asosiy komponent
│   ├── App.module.css
│   ├── index.js               # Kirish nuqtasi
│   └── index.css              # Global uslublar
└── package.json
```

## Asosiy xususiyatlar

- 📨 **Murojaat yuborish** — 3 bosqichli forma, AI tahlil
- 🗺️ **Interaktiv xarita** — sud, notarius, ko'chmas mulk agentliklari
- 🤖 **AI Yordamchi** — ariza, shikoyat, so'rov xati shablonlari
- 📊 **Statistika** — murojaatlar holati
- 🔔 **Bildirishnomalar** — SMS va push
