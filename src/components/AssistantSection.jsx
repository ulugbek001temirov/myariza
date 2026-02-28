import { useState } from 'react';
import { DOC_TYPES } from '../data';
import styles from './AssistantSection.module.css';

function Field({ children }) {
  return (
    <span className={styles.field}>{children}</span>
  );
}

const TEMPLATES = {
  ariza: (
    <div className={styles.templateText}>
      <div className={styles.templateRight}>
        <Field>[Tashkilot nomi]</Field> boshlig'iga<br />
        <Field>[F.I.O.]</Field> dan
      </div>
      <div className={styles.templateCenter}>A R I Z A</div>
      <p>
        Men, <Field>[F.I.O.]</Field>, <Field>[manzil]</Field> da yashayman.
        Sizdan <Field>[murojaat mavzusi]</Field> bo'yicha ko'maklashishingizni so'rayman.
      </p>
      <br />
      <p><Field>[Muammoni batafsil yozing]</Field></p>
      <br />
      <p>Iltimos, masalani ko'rib chiqib, tegishli qaror qabul qilishingizni so'rayman.</p>
      <div className={styles.templateFooter}>
        <span>Sana: <Field>[__.__.__]</Field></span>
        <span>Imzo: ___________</span>
      </div>
    </div>
  ),
  shikoyat: (
    <div className={styles.templateText}>
      <div className={styles.templateRight}>
        <Field>[Tashkilot nomi]</Field> rahbariga<br />
        <Field>[F.I.O.]</Field> dan · Tel: <Field>[telefon]</Field>
      </div>
      <div className={styles.templateCenter}>S H I K O Y A T</div>
      <p>
        Men, <Field>[F.I.O.]</Field>, Sizning tashkilotingiz xodimi <Field>[xodim F.I.O.]</Field> tomonidan{' '}
        <Field>[sana]</Field> kuni <Field>[muammo tavsifi]</Field> bo'lib o'tgan voqea yuzasidan shikoyat bildiraman.
      </p>
      <br />
      <p>Ushbu holat <Field>[qonun nomi]</Field> ga zid bo'lib, mening huquqlarimni buzadi.</p>
      <br />
      <p>So'rayman: <Field>[talab]</Field></p>
      <div className={styles.templateFooter}>
        <span>Sana: <Field>[__.__.__]</Field></span>
        <span>Imzo: ___________</span>
      </div>
    </div>
  ),
  sorov: (
    <div className={styles.templateText}>
      <div className={styles.templateRight}>
        <Field>[Tashkilot nomi]</Field> ga<br />
        <Field>[F.I.O.]</Field> dan
      </div>
      <div className={styles.templateCenter}>SO'ROV XATI</div>
      <p>
        O'zbekiston Respublikasi qonunchiligi asosida, Sizdan{' '}
        <Field>[ma'lumot turi]</Field> haqida rasmiy ma'lumot berishingizni so'rayman.
      </p>
      <br />
      <p>Ma'lumot talab qilinayotgan sabab: <Field>[sabab]</Field></p>
      <br />
      <p>Javob muddati: <Field>[muddat]</Field> ish kuni ichida.</p>
      <div className={styles.templateFooter}>
        <span>Sana: <Field>[__.__.__]</Field></span>
        <span>Imzo: ___________</span>
      </div>
    </div>
  ),
  malumotnoma: (
    <div className={styles.templateText}>
      <div className={styles.templateRight}>
        <Field>[Tashkilot nomi]</Field> boshlig'iga<br />
        <Field>[F.I.O.]</Field> dan
      </div>
      <div className={styles.templateCenter}>MA'LUMOTNOMA OLISH TO'G'RISIDA ARIZA</div>
      <p>
        Iltimos, menga <Field>[ma'lumotnoma turi]</Field> ni berish to'g'risida qaror qabul qilishingizni so'rayman.
      </p>
      <br />
      <p>Ma'lumotnoma taqdim etilishi kerak: <Field>[qayerga]</Field></p>
      <p>Maqsad: <Field>[maqsad]</Field></p>
      <div className={styles.templateFooter}>
        <span>Sana: <Field>[__.__.__]</Field></span>
        <span>Imzo: ___________</span>
      </div>
    </div>
  ),
};

export default function AssistantSection({ onUseTemplate }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.aiAvatar}>🤖</div>
          <div>
            <div className={styles.titleText}>AI Ariza va Shikoyat Yordamchisi</div>
            <div className={styles.subtitle}>Ariza turini tanlang — AI avtomatik shablon tuzib beradi</div>
          </div>
        </div>
        <div className={styles.aiBadge}>✨ AI tahlil yoqilgan</div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Doc types */}
        <div className={styles.docTypes}>
          <div className={styles.sectionLabel}>Hujjat turini tanlang</div>
          <div className={styles.docGrid}>
            {DOC_TYPES.map(doc => (
              <div
                key={doc.id}
                className={`${styles.docChip} ${selected === doc.id ? styles.docChipSelected : ''}`}
                onClick={() => setSelected(doc.id)}
              >
                <span>{doc.icon}</span>
                {doc.label}
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className={styles.preview}>
          <div className={styles.sectionLabel}>Hujjat ko'rinishi</div>
          <div className={styles.previewBox}>
            {!selected ? (
              <div className={styles.placeholder}>
                <span className={styles.placeholderIcon}>📄</span>
                <span>Chap tarafdan hujjat turini tanlang</span>
                <span className={styles.placeholderSub}>AI avtomatik shablon tuzadi</span>
              </div>
            ) : TEMPLATES[selected] ? (
              TEMPLATES[selected]
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.placeholderIcon}>🔧</span>
                <span>Bu shablon tez orada qo'shiladi</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button
          className={`${styles.btnUse} ${!selected ? styles.btnDisabled : ''}`}
          onClick={selected ? onUseTemplate : undefined}
          disabled={!selected}
        >
          📋 Murojaatga joylashtirish
        </button>
        <button
          className={`${styles.btnDownload} ${!selected ? styles.btnDisabled : ''}`}
          disabled={!selected}
        >
          ⬇️ Word (.docx) yuklab olish
        </button>
        <span className={styles.footerHint}>Shablon tanlangandan so'ng tahrirlash mumkin</span>
      </div>
    </div>
  );
}
