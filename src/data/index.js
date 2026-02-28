export const CATEGORIES = [
  {
    id: 'health',
    icon: '🏥',
    name: "Sog'liqni saqlash",
    color: '#1a9fff',
    items: ['Tibbiy xizmat sifati', "Dori-darmon ta'minot", 'Klinika muammolari'],
  },
  {
    id: 'edu',
    icon: '🎓',
    name: "Ta'lim",
    color: '#0dd1a0',
    items: ['Maktab muammolari', 'Universitetlar', 'Stipendiyalar'],
  },
  {
    id: 'housing',
    icon: '🏠',
    name: 'Uy-joy va kommunal',
    color: '#f5a623',
    items: ["Suv ta'minoti", 'Elektr uzilishlari', "Yo'l ta'mirlash"],
  },
  {
    id: 'law',
    icon: '⚖️',
    name: 'Adliya va huquq',
    color: '#ff5078',
    items: ['Hujjatlashtirish', 'Huquqiy yordam', 'Sud masalalari'],
  },
  {
    id: 'eco',
    icon: '🌿',
    name: 'Ekologiya',
    color: '#a06eff',
    items: ['Havoning ifloslanishi', "Chiqindilar", 'Daraxt kesish'],
  },
  {
    id: 'labor',
    icon: '💼',
    name: 'Mehnat va bandlik',
    color: '#00c8ff',
    items: ["Ish bilan ta'minlash", 'Nafaqalar', 'Mehnat huquqi'],
  },
  {
    id: 'tax',
    icon: '💰',
    name: 'Soliq va subsidiya',
    color: '#f5a623',
    items: ["Soliq to'lovlari", 'Imtiyozlar', 'Subsidiyalar'],
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    name: 'Oila va bolalar',
    color: '#50c864',
    items: ["Bog'cha joylari", 'Ijtimoiy nafaqalar', 'Ona va bola'],
  },
];

export const PLACES = [
  { id: 1, type: 'court',      name: 'Toshkent Shahar Sudi',      addr: "Yunusobod, Amir Temur 108",          x: 27, y: 34 },
  { id: 2, type: 'court',      name: 'Chilonzor Tuman Sudi',       addr: 'Chilonzor tumani, 9-kvartal',        x: 56, y: 67 },
  { id: 3, type: 'notary',     name: '1-Notarius Idorasi',         addr: "Mirzo Ulug'bek, Mustaqillik 54",     x: 42, y: 30 },
  { id: 4, type: 'notary',     name: 'Notarius Xaydarov',          addr: "Shayxontohur, Navoiy 12",            x: 70, y: 55 },
  { id: 5, type: 'notary',     name: '3-Notarius Idorasi',         addr: 'Uchtepa tumani, Bunyodkor 7',        x: 20, y: 60 },
  { id: 6, type: 'realty',     name: 'Ipoteka Agentligi',          addr: 'Yunusobod, Movarounnahr 1',          x: 60, y: 32 },
  { id: 7, type: 'realty',     name: 'Baraka Agentligi',           addr: "Sergeli tumani, Yangi hayot 3",      x: 35, y: 68 },
  { id: 8, type: 'mahalla',    name: "Bog'ishamol Mahalla",        addr: "Mirzo Ulug'bek tumani, 45-uy",       x: 48, y: 48 },
  { id: 9, type: 'mahalla',    name: 'Olmazar Mahalla',            addr: "Olmazar tumani, Registon 2",         x: 82, y: 68 },
  { id: 10, type: 'hokimiyat', name: 'Shahar Hokimiyati',          addr: "Islam Karimov ko'chasi 6",           x: 25, y: 52 },
  { id: 11, type: 'hokimiyat', name: 'Yunusobod Hokimiyati',       addr: 'Yunusobod tumani, 7-kvartal',        x: 78, y: 35 },
];

export const PIN_COLORS = {
  court:      { bg: '#e74c3c', label: 'Sud',       icon: '⚖️' },
  notary:     { bg: '#8e44ad', label: 'Notarius',  icon: '📜' },
  realty:     { bg: '#27ae60', label: 'Agentlik',  icon: '🏢' },
  mahalla:    { bg: '#2980b9', label: 'Mahalla',   icon: '🏘️' },
  hokimiyat:  { bg: '#d35400', label: 'Hokimiyat', icon: '🏛️' },
};

export const MAP_FILTERS = [
  { key: 'all',        label: 'Barchasi' },
  { key: 'court',      label: '⚖️ Sudlar' },
  { key: 'notary',     label: '📜 Notariuslar' },
  { key: 'realty',     label: "🏢 Ko'chmas mulk" },
  { key: 'mahalla',    label: '🏘️ Mahalla' },
  { key: 'hokimiyat',  label: '🏛️ Hokimiyat' },
];

export const DOC_TYPES = [
  { id: 'ariza',        icon: '📝', label: 'Ariza' },
  { id: 'shikoyat',     icon: '📣', label: 'Shikoyat' },
  { id: 'sorov',        icon: '❓', label: "So'rov xati" },
  { id: 'taklif',       icon: '💡', label: 'Taklif' },
  { id: 'tuzatish',     icon: '🔄', label: "Tuzatish so'rovi" },
  { id: 'rahmat',       icon: '🙏', label: 'Minnatdorlik xati' },
  { id: 'ijara',        icon: '🏠', label: 'Ijara arizasi' },
  { id: 'malumotnoma',  icon: '📋', label: "Ma'lumotnoma olish" },
];

export const RECENT_APPEALS = [
  { num: '#2024-0047', title: "Ko'cha chirog'i ishlamayapti",      meta: 'Kommunal xizmat · 2 kun oldin',      status: "Ko'rib chiqilmoqda" },
  { num: '#2024-0041', title: 'Mahalla shifoxonasidagi muammo',    meta: "Sog'liqni saqlash · 5 kun oldin",    status: 'Hal qilindi' },
  { num: '#2024-0038', title: "Yo'l tuzatish haqida murojaat",     meta: 'Transport · 8 kun oldin',            status: 'Yuborildi' },
  { num: '#2024-0029', title: "Ijtimoiy nafaqa haqida so'rov",     meta: 'Ijtimoiy himoya · 14 kun oldin',     status: 'Rad etildi' },
];

export const STATUS_STYLES = {
  "Ko'rib chiqilmoqda": { bg: 'rgba(245,166,35,0.15)',  color: '#f5a623' },
  'Hal qilindi':         { bg: 'rgba(13,209,160,0.15)',  color: '#0dd1a0' },
  'Yuborildi':           { bg: 'rgba(26,159,255,0.15)',  color: '#1a9fff' },
  'Rad etildi':          { bg: 'rgba(255,80,80,0.15)',   color: '#ff6060' },
};
