import Question from '../models/question.model.js';

const questionData = {
  beginner: [
    {
      question_text: "What is the first pillar of Islam?",
      options: [
        { text: "Shahada (Declaration of Faith)", is_correct: true },
        { text: "Salah (Prayer)", is_correct: false },
        { text: "Zakat (Charity)", is_correct: false },
        { text: "Hajj (Pilgrimage)", is_correct: false }
      ]
    },
    {
      question_text: "How many times a day do Muslims pray?",
      options: [
        { text: "3 times", is_correct: false },
        { text: "5 times", is_correct: true },
        { text: "7 times", is_correct: false },
        { text: "10 times", is_correct: false }
      ]
    },
    {
      question_text: "What is the holy book of Islam?",
      options: [
        { text: "Bible", is_correct: false },
        { text: "Torah", is_correct: false },
        { text: "Quran", is_correct: true },
        { text: "Vedas", is_correct: false }
      ]
    },
    {
      question_text: "What is the Arabic word for God?",
      options: [
        { text: "Allah", is_correct: true },
        { text: "Yahweh", is_correct: false },
        { text: "Brahman", is_correct: false },
        { text: "Buddha", is_correct: false }
      ]
    },
    {
      question_text: "In which month do Muslims fast?",
      options: [
        { text: "Rajab", is_correct: false },
        { text: "Ramadan", is_correct: true },
        { text: "Shawwal", is_correct: false },
        { text: "Muharram", is_correct: false }
      ]
    },
    {
      question_text: "What is the direction Muslims face when praying?",
      options: [
        { text: "East", is_correct: false },
        { text: "West", is_correct: false },
        { text: "Towards Mecca (Qibla)", is_correct: true },
        { text: "North", is_correct: false }
      ]
    },
    {
      question_text: "What is the pilgrimage to Mecca called?",
      options: [
        { text: "Umrah", is_correct: false },
        { text: "Hajj", is_correct: true },
        { text: "Ziyarah", is_correct: false },
        { text: "Safar", is_correct: false }
      ]
    },
    {
      question_text: "What is the name of the Prophet of Islam?",
      options: [
        { text: "Jesus", is_correct: false },
        { text: "Moses", is_correct: false },
        { text: "Muhammad (PBUH)", is_correct: true },
        { text: "Abraham", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic greeting?",
      options: [
        { text: "Hello", is_correct: false },
        { text: "Assalamu Alaikum", is_correct: true },
        { text: "Good morning", is_correct: false },
        { text: "Namaste", is_correct: false }
      ]
    },
    {
      question_text: "What is the first month of the Islamic calendar?",
      options: [
        { text: "Ramadan", is_correct: false },
        { text: "Muharram", is_correct: true },
        { text: "Rajab", is_correct: false },
        { text: "Shawwal", is_correct: false }
      ]
    },
    {
      question_text: "What is the call to prayer called?",
      options: [
        { text: "Adhan", is_correct: true },
        { text: "Takbir", is_correct: false },
        { text: "Dhikr", is_correct: false },
        { text: "Dua", is_correct: false }
      ]
    },
    {
      question_text: "How many pillars of Islam are there?",
      options: [
        { text: "3", is_correct: false },
        { text: "4", is_correct: false },
        { text: "5", is_correct: true },
        { text: "6", is_correct: false }
      ]
    },
    {
      question_text: "What is charity called in Islam?",
      options: [
        { text: "Sadaqah", is_correct: false },
        { text: "Zakat", is_correct: true },
        { text: "Khums", is_correct: false },
        { text: "Fitrah", is_correct: false }
      ]
    },
    {
      question_text: "What is the night journey of Prophet Muhammad (PBUH) called?",
      options: [
        { text: "Hijrah", is_correct: false },
        { text: "Isra and Mi'raj", is_correct: true },
        { text: "Laylat al-Qadr", is_correct: false },
        { text: "Mawlid", is_correct: false }
      ]
    },
    {
      question_text: "What is the building where Muslims worship called?",
      options: [
        { text: "Church", is_correct: false },
        { text: "Mosque", is_correct: true },
        { text: "Temple", is_correct: false },
        { text: "Synagogue", is_correct: false }
      ]
    },
    {
      question_text: "What does 'Islam' mean?",
      options: [
        { text: "Peace and submission to Allah", is_correct: true },
        { text: "Holy war", is_correct: false },
        { text: "Charity", is_correct: false },
        { text: "Prayer", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic month of pilgrimage?",
      options: [
        { text: "Ramadan", is_correct: false },
        { text: "Dhul Hijjah", is_correct: true },
        { text: "Muharram", is_correct: false },
        { text: "Rajab", is_correct: false }
      ]
    },
    {
      question_text: "What is the fast-breaking meal called?",
      options: [
        { text: "Suhur", is_correct: false },
        { text: "Iftar", is_correct: true },
        { text: "Qiyam", is_correct: false },
        { text: "Tahajjud", is_correct: false }
      ]
    },
    {
      question_text: "What is the pre-dawn meal during Ramadan called?",
      options: [
        { text: "Iftar", is_correct: false },
        { text: "Suhur", is_correct: true },
        { text: "Isha", is_correct: false },
        { text: "Fajr", is_correct: false }
      ]
    },
    {
      question_text: "How many chapters (Surahs) are in the Quran?",
      options: [
        { text: "110", is_correct: false },
        { text: "114", is_correct: true },
        { text: "120", is_correct: false },
        { text: "99", is_correct: false }
      ]
    },
    {
      question_text: "What is the first chapter of the Quran called?",
      options: [
        { text: "Al-Baqarah", is_correct: false },
        { text: "Al-Fatihah", is_correct: true },
        { text: "Al-Ikhlas", is_correct: false },
        { text: "An-Nas", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic festival celebrating the end of Ramadan?",
      options: [
        { text: "Eid al-Fitr", is_correct: true },
        { text: "Eid al-Adha", is_correct: false },
        { text: "Mawlid", is_correct: false },
        { text: "Laylat al-Qadr", is_correct: false }
      ]
    },
    {
      question_text: "What is the minimum age for performing Hajj?",
      options: [
        { text: "Any age if able", is_correct: true },
        { text: "18 years", is_correct: false },
        { text: "21 years", is_correct: false },
        { text: "16 years", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic concept of community called?",
      options: [
        { text: "Ummah", is_correct: true },
        { text: "Jamaat", is_correct: false },
        { text: "Majlis", is_correct: false },
        { text: "Halaqah", is_correct: false }
      ]
    },
    {
      question_text: "What does 'Allahu Akbar' mean?",
      options: [
        { text: "Allah is Great", is_correct: true },
        { text: "Praise be to Allah", is_correct: false },
        { text: "Allah is merciful", is_correct: false },
        { text: "Allah is one", is_correct: false }
      ]
    },
    {
      question_text: "What is the Arabic term for pilgrimage other than Hajj?",
      options: [
        { text: "Ziyarah", is_correct: false },
        { text: "Umrah", is_correct: true },
        { text: "Safar", is_correct: false },
        { text: "Rihlah", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic new year celebration called?",
      options: [
        { text: "Hijri New Year", is_correct: true },
        { text: "Eid al-Fitr", is_correct: false },
        { text: "Mawlid", is_correct: false },
        { text: "Laylat al-Qadr", is_correct: false }
      ]
    },
    {
      question_text: "What is the righteous deed done in secret called?",
      options: [
        { text: "Sadaqah", is_correct: true },
        { text: "Zakat", is_correct: false },
        { text: "Khums", is_correct: false },
        { text: "Ushr", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic term for God's oneness?",
      options: [
        { text: "Shirk", is_correct: false },
        { text: "Tawhid", is_correct: true },
        { text: "Bid'ah", is_correct: false },
        { text: "Kufr", is_correct: false }
      ]
    },
    {
      question_text: "What is the migration of Prophet Muhammad (PBUH) from Mecca to Medina called?",
      options: [
        { text: "Hijrah", is_correct: true },
        { text: "Isra", is_correct: false },
        { text: "Mi'raj", is_correct: false },
        { text: "Safar", is_correct: false }
      ]
    }
  ],
  intermediate: [
    {
      question_text: "How many times is the word 'Allah' mentioned in the Quran?",
      options: [
        { text: "2698 times", is_correct: true },
        { text: "2500 times", is_correct: false },
        { text: "3000 times", is_correct: false },
        { text: "2800 times", is_correct: false }
      ]
    },
    {
      question_text: "What is the longest Surah in the Quran?",
      options: [
        { text: "Al-Fatihah", is_correct: false },
        { text: "Al-Baqarah", is_correct: true },
        { text: "Al-Imran", is_correct: false },
        { text: "An-Nisa", is_correct: false }
      ]
    },
    {
      question_text: "Which angel brought revelations to Prophet Muhammad (PBUH)?",
      options: [
        { text: "Mikail (Michael)", is_correct: false },
        { text: "Israfil (Raphael)", is_correct: false },
        { text: "Jibril (Gabriel)", is_correct: true },
        { text: "Azrail (Azrael)", is_correct: false }
      ]
    },
    {
      question_text: "What is the night of power/decree called?",
      options: [
        { text: "Laylat al-Mi'raj", is_correct: false },
        { text: "Laylat al-Qadr", is_correct: true },
        { text: "Laylat al-Isra", is_correct: false },
        { text: "Laylat al-Bara'at", is_correct: false }
      ]
    },
    {
      question_text: "How many Rakats are in the Fajr prayer?",
      options: [
        { text: "2 Rakats", is_correct: true },
        { text: "3 Rakats", is_correct: false },
        { text: "4 Rakats", is_correct: false },
        { text: "1 Rakat", is_correct: false }
      ]
    },
    {
      question_text: "What is the last revealed verse of the Quran?",
      options: [
        { text: "Ayat al-Kursi", is_correct: false },
        { text: "The verse about debt in Al-Baqarah", is_correct: true },
        { text: "The verse about perfection of religion", is_correct: false },
        { text: "The first verse of Al-Fatihah", is_correct: false }
      ]
    },
    {
      question_text: "What is the Arabic term for Islamic jurisprudence?",
      options: [
        { text: "Fiqh", is_correct: true },
        { text: "Hadith", is_correct: false },
        { text: "Tafsir", is_correct: false },
        { text: "Sunnah", is_correct: false }
      ]
    },
    {
      question_text: "How many years did it take for the Quran to be revealed?",
      options: [
        { text: "20 years", is_correct: false },
        { text: "23 years", is_correct: true },
        { text: "25 years", is_correct: false },
        { text: "30 years", is_correct: false }
      ]
    },
    {
      question_text: "What is the cave where Prophet Muhammad (PBUH) received the first revelation?",
      options: [
        { text: "Cave of Thawr", is_correct: false },
        { text: "Cave of Hira", is_correct: true },
        { text: "Cave of Uhud", is_correct: false },
        { text: "Cave of Badr", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic month of fasting?",
      options: [
        { text: "Sha'ban", is_correct: false },
        { text: "Ramadan", is_correct: true },
        { text: "Dhul Qi'dah", is_correct: false },
        { text: "Rajab", is_correct: false }
      ]
    },
    {
      question_text: "How many authentic books of Hadith are there?",
      options: [
        { text: "4", is_correct: false },
        { text: "6", is_correct: true },
        { text: "8", is_correct: false },
        { text: "10", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic term for consensus of scholars?",
      options: [
        { text: "Ijma", is_correct: true },
        { text: "Qiyas", is_correct: false },
        { text: "Ijtihad", is_correct: false },
        { text: "Istihsan", is_correct: false }
      ]
    },
    {
      question_text: "What is the battle that marked the first Muslim victory?",
      options: [
        { text: "Battle of Uhud", is_correct: false },
        { text: "Battle of Badr", is_correct: true },
        { text: "Battle of Khandaq", is_correct: false },
        { text: "Battle of Hunayn", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic term for analogy in jurisprudence?",
      options: [
        { text: "Ijma", is_correct: false },
        { text: "Qiyas", is_correct: true },
        { text: "Istihsan", is_correct: false },
        { text: "Ijtihad", is_correct: false }
      ]
    },
    {
      question_text: "What is the minimum amount of wealth to pay Zakat?",
      options: [
        { text: "Nisab", is_correct: true },
        { text: "Hawl", is_correct: false },
        { text: "Fidyah", is_correct: false },
        { text: "Kaffarah", is_correct: false }
      ]
    },
    {
      question_text: "How many names of Allah (Asma ul Husna) are there?",
      options: [
        { text: "95", is_correct: false },
        { text: "99", is_correct: true },
        { text: "100", is_correct: false },
        { text: "101", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic calendar based on?",
      options: [
        { text: "Solar year", is_correct: false },
        { text: "Lunar year", is_correct: true },
        { text: "Solar-lunar combination", is_correct: false },
        { text: "Star movements", is_correct: false }
      ]
    },
    {
      question_text: "What is the first university in the world?",
      options: [
        { text: "Al-Azhar University", is_correct: false },
        { text: "University of Al Quaraouiyine", is_correct: true },
        { text: "House of Wisdom", is_correct: false },
        { text: "Bayt al-Hikmah", is_correct: false }
      ]
    },
    {
      question_text: "What is the term for the community prayer on Friday?",
      options: [
        { text: "Salat al-Eid", is_correct: false },
        { text: "Salat al-Jumu'ah", is_correct: true },
        { text: "Salat al-Tarawih", is_correct: false },
        { text: "Salat al-Janazah", is_correct: false }
      ]
    },
    {
      question_text: "What is the punishment for theft in Islamic law?",
      options: [
        { text: "Imprisonment", is_correct: false },
        { text: "Amputation of hand", is_correct: true },
        { text: "Fine", is_correct: false },
        { text: "Public humiliation", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic term for the prophetic traditions?",
      options: [
        { text: "Quran", is_correct: false },
        { text: "Hadith", is_correct: true },
        { text: "Fiqh", is_correct: false },
        { text: "Tafsir", is_correct: false }
      ]
    },
    {
      question_text: "Which wife of the Prophet was known as 'Mother of the Believers'?",
      options: [
        { text: "Khadijah (RA)", is_correct: false },
        { text: "All of them", is_correct: true },
        { text: "Aisha (RA)", is_correct: false },
        { text: "Hafsa (RA)", is_correct: false }
      ]
    },
    {
      question_text: "What is the Arabic term for Islamic theology?",
      options: [
        { text: "Fiqh", is_correct: false },
        { text: "Aqidah", is_correct: true },
        { text: "Tafsir", is_correct: false },
        { text: "Hadith", is_correct: false }
      ]
    },
    {
      question_text: "What is the term for ritual purification before prayer?",
      options: [
        { text: "Ghusl", is_correct: false },
        { text: "Wudu", is_correct: true },
        { text: "Tayammum", is_correct: false },
        { text: "Istinja", is_correct: false }
      ]
    },
    {
      question_text: "How many categories of Tawhid are there?",
      options: [
        { text: "2", is_correct: false },
        { text: "3", is_correct: true },
        { text: "4", is_correct: false },
        { text: "5", is_correct: false }
      ]
    },
    {
      question_text: "What is the Islamic term for innovation in religion?",
      options: [
        { text: "Sunnah", is_correct: false },
        { text: "Bid'ah", is_correct: true },
        { text: "Ijma", is_correct: false },
        { text: "Qiyas", is_correct: false }
      ]
    },
    {
      question_text: "What is the term for the Islamic creed?",
      options: [
        { text: "Shahada", is_correct: true },
        { text: "Takbir", is_correct: false },
        { text: "Tahmid", is_correct: false },
        { text: "Tahlil", is_correct: false }
      ]
    },
    {
      question_text: "What is the term for the annual pilgrimage to Mecca?",
      options: [
        { text: "Umrah", is_correct: false },
        { text: "Hajj", is_correct: true },
        { text: "Ziyarah", is_correct: false },
        { text: "Tawaf", is_correct: false }
      ]
    },
    {
      question_text: "What is the Arabic term for the Islamic way of life?",
      options: [
        { text: "Deen", is_correct: true },
        { text: "Iman", is_correct: false },
        { text: "Islam", is_correct: false },
        { text: "Ihsan", is_correct: false }
      ]
    },
    {
      question_text: "How many times should a Muslim perform Hajj in their lifetime?",
      options: [
        { text: "Once if able", is_correct: true },
        { text: "Three times", is_correct: false },
        { text: "Five times", is_correct: false },
        { text: "Seven times", is_correct: false }
      ]
    }
  ],
  advanced: [
    {
      question_text: "What is the concept of 'Wahdatul Wujud' in Islamic philosophy?",
      options: [
        { text: "Unity of Being", is_correct: true },
        { text: "Unity of Action", is_correct: false },
        { text: "Unity of Attributes", is_correct: false },
        { text: "Unity of Creation", is_correct: false }
      ]
    },
    {
      question_text: "Who is the author of 'Ihya Ulum al-Din'?",
      options: [
        { text: "Ibn Sina", is_correct: false },
        { text: "Al-Ghazali", is_correct: true },
        { text: "Ibn Rushd", is_correct: false },
        { text: "Al-Farabi", is_correct: false }
      ]
    },
    {
      question_text: "What is the principle of Maslaha in Islamic jurisprudence?",
      options: [
        { text: "Public Interest", is_correct: true },
        { text: "Analogical reasoning", is_correct: false },
        { text: "Consensus", is_correct: false },
        { text: "Preference", is_correct: false }
      ]
    },
    {
      question_text: "What is the highest level of certainty (Yaqin) in Islamic epistemology?",
      options: [
        { text: "Ilm al-Yaqin", is_correct: false },
        { text: "Ayn al-Yaqin", is_correct: false },
        { text: "Haqq al-Yaqin", is_correct: true },
        { text: "Nur al-Yaqin", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Tajdid' in Islamic thought?",
      options: [
        { text: "Religious Renewal", is_correct: true },
        { text: "Religious Innovation", is_correct: false },
        { text: "Religious Orthodoxy", is_correct: false },
        { text: "Religious Mysticism", is_correct: false }
      ]
    },
    {
      question_text: "Who established the four sources of Islamic law in order of priority?",
      options: [
        { text: "Imam Abu Hanifa", is_correct: false },
        { text: "Imam Shafi'i", is_correct: true },
        { text: "Imam Malik", is_correct: false },
        { text: "Imam Ahmad", is_correct: false }
      ]
    },
    {
      question_text: "What is the doctrine of 'Istikhārah' in Islamic practice?",
      options: [
        { text: "Seeking Allah's guidance", is_correct: true },
        { text: "Seeking forgiveness", is_correct: false },
        { text: "Seeking knowledge", is_correct: false },
        { text: "Seeking wealth", is_correct: false }
      ]
    },
    {
      question_text: "What is the term for the esoteric interpretation of Quran?",
      options: [
        { text: "Tafsir", is_correct: false },
        { text: "Ta'wil", is_correct: true },
        { text: "Tadabbur", is_correct: false },
        { text: "Tartil", is_correct: false }
      ]
    },
    {
      question_text: "What is the principle of 'La Darar wa la Dirar' in Islamic law?",
      options: [
        { text: "No harm and no reciprocal harm", is_correct: true },
        { text: "No compulsion in religion", is_correct: false },
        { text: "No excess in religion", is_correct: false },
        { text: "No innovation in worship", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Barzakh' in Islamic eschatology?",
      options: [
        { text: "The afterlife", is_correct: false },
        { text: "The intermediate realm", is_correct: true },
        { text: "Paradise", is_correct: false },
        { text: "Hell", is_correct: false }
      ]
    },
    {
      question_text: "Who is considered the 'Seal of Saints' (Khatam al-Awliya)?",
      options: [
        { text: "Ibn Arabi", is_correct: true },
        { text: "Al-Ghazali", is_correct: false },
        { text: "Rumi", is_correct: false },
        { text: "Al-Hallaj", is_correct: false }
      ]
    },
    {
      question_text: "What is the highest stage in the Sufi path according to most orders?",
      options: [
        { text: "Fana", is_correct: false },
        { text: "Baqa", is_correct: true },
        { text: "Hal", is_correct: false },
        { text: "Maqam", is_correct: false }
      ]
    },
    {
      question_text: "What is the principle of 'Sadd al-Dhara'i' in Islamic jurisprudence?",
      options: [
        { text: "Blocking the means to evil", is_correct: true },
        { text: "Opening paths to good", is_correct: false },
        { text: "Preferential treatment", is_correct: false },
        { text: "Gradual application", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Fitrah' in Islamic anthropology?",
      options: [
        { text: "Human nature/primordial state", is_correct: true },
        { text: "Divine attributes", is_correct: false },
        { text: "Prophetic tradition", is_correct: false },
        { text: "Natural law", is_correct: false }
      ]
    },
    {
      question_text: "What is the term 'Mukashafah' in Sufi terminology?",
      options: [
        { text: "Spiritual struggle", is_correct: false },
        { text: "Divine unveiling", is_correct: true },
        { text: "Ritual prayer", is_correct: false },
        { text: "Sacred dance", is_correct: false }
      ]
    },
    {
      question_text: "What is the doctrine of 'Jabr' in Islamic theology?",
      options: [
        { text: "Predestination", is_correct: true },
        { text: "Free will", is_correct: false },
        { text: "Divine justice", is_correct: false },
        { text: "Divine mercy", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Hikmah' in Islamic philosophy?",
      options: [
        { text: "Wisdom", is_correct: true },
        { text: "Knowledge", is_correct: false },
        { text: "Understanding", is_correct: false },
        { text: "Intelligence", is_correct: false }
      ]
    },
    {
      question_text: "What is the term for the special knowledge given to Prophets?",
      options: [
        { text: "Ilm al-Ghayb", is_correct: false },
        { text: "Wahy", is_correct: true },
        { text: "Kashf", is_correct: false },
        { text: "Ilham", is_correct: false }
      ]
    },
    {
      question_text: "What is the principle of 'Istishab' in Islamic jurisprudence?",
      options: [
        { text: "Presumption of continuity", is_correct: true },
        { text: "Presumption of innocence", is_correct: false },
        { text: "Presumption of validity", is_correct: false },
        { text: "Presumption of priority", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Sirr' in Sufi psychology?",
      options: [
        { text: "The secret/innermost heart", is_correct: true },
        { text: "The rational soul", is_correct: false },
        { text: "The animal soul", is_correct: false },
        { text: "The spiritual heart", is_correct: false }
      ]
    },
    {
      question_text: "What is the doctrine of 'Hulul' in Islamic mysticism?",
      options: [
        { text: "Divine indwelling", is_correct: true },
        { text: "Divine transcendence", is_correct: false },
        { text: "Divine immanence", is_correct: false },
        { text: "Divine unity", is_correct: false }
      ]
    },
    {
      question_text: "What is the term 'Mujaddid' in Islamic tradition?",
      options: [
        { text: "Renewer of faith", is_correct: true },
        { text: "Scholar of law", is_correct: false },
        { text: "Mystic saint", is_correct: false },
        { text: "Political leader", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Wajib al-Wujud' in Islamic philosophy?",
      options: [
        { text: "Necessary Being (God)", is_correct: true },
        { text: "Possible being", is_correct: false },
        { text: "Impossible being", is_correct: false },
        { text: "Contingent being", is_correct: false }
      ]
    },
    {
      question_text: "What is the principle of 'Al-Ashbah wa'l-Naza'ir' in Islamic law?",
      options: [
        { text: "Legal similarities and parallels", is_correct: true },
        { text: "Legal differences", is_correct: false },
        { text: "Legal priorities", is_correct: false },
        { text: "Legal preferences", is_correct: false }
      ]
    },
    {
      question_text: "What is the term 'Qutb' in Sufi hierarchy?",
      options: [
        { text: "The spiritual axis/pole", is_correct: true },
        { text: "The ascetic", is_correct: false },
        { text: "The teacher", is_correct: false },
        { text: "The disciple", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Tawakkul' in Islamic spirituality?",
      options: [
        { text: "Trust in Allah", is_correct: true },
        { text: "Fear of Allah", is_correct: false },
        { text: "Love of Allah", is_correct: false },
        { text: "Knowledge of Allah", is_correct: false }
      ]
    },
    {
      question_text: "What is the doctrine of 'I'tizal' historically known for?",
      options: [
        { text: "Rational theology", is_correct: true },
        { text: "Scriptural literalism", is_correct: false },
        { text: "Mystical experience", is_correct: false },
        { text: "Legal formalism", is_correct: false }
      ]
    },
    {
      question_text: "What is the term 'Barakah' in Islamic spirituality?",
      options: [
        { text: "Divine blessing/grace", is_correct: true },
        { text: "Divine wrath", is_correct: false },
        { text: "Divine knowledge", is_correct: false },
        { text: "Divine power", is_correct: false }
      ]
    },
    {
      question_text: "What is the concept of 'Kashf' in Sufi epistemology?",
      options: [
        { text: "Mystical unveiling", is_correct: true },
        { text: "Rational deduction", is_correct: false },
        { text: "Scriptural interpretation", is_correct: false },
        { text: "Empirical observation", is_correct: false }
      ]
    },
    {
      question_text: "What is the principle of 'Takhayyur' in Islamic jurisprudence?",
      options: [
        { text: "Selection among opinions", is_correct: true },
        { text: "Rejection of all opinions", is_correct: false },
        { text: "Creation of new opinion", is_correct: false },
        { text: "Following majority opinion", is_correct: false }
      ]
    }
  ]
};

export const seedQuestions = async () => {
  try {
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert beginner questions
    const beginnerQuestions = questionData.beginner.map(q => ({ ...q, level: 'beginner' }));
    await Question.insertMany(beginnerQuestions);
    console.log(`Inserted ${beginnerQuestions.length} beginner questions`);

    // Insert intermediate questions
    const intermediateQuestions = questionData.intermediate.map(q => ({ ...q, level: 'intermediate' }));
    await Question.insertMany(intermediateQuestions);
    console.log(`Inserted ${intermediateQuestions.length} intermediate questions`);

    // Insert advanced questions
    const advancedQuestions = questionData.advanced.map(q => ({ ...q, level: 'advanced' }));
    await Question.insertMany(advancedQuestions);
    console.log(`Inserted ${advancedQuestions.length} advanced questions`);

    console.log('Successfully seeded all Islamic questions!');
    return { success: true, message: 'Islamic questions seeded successfully' };
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error;
  }
};