export const en = {
  header: {
    title: 'Huyền Phong Phật Đạo',
    subtitle: 'Destiny Analysis - Illuminating the Future',
  },
  tabs: {
    horoscope: 'Horoscope',
    divination: 'Divination',
    date_selection: 'Auspicious Date',
    talisman: 'Talisman',
    chat: 'AI Sage',
  },
  footer: {
    copyright: 'Huyền Phong Phật Đạo. All rights reserved.',
  },
  modal: {
    close: 'Close modal',
  },
  audio: {
    mute: 'Mute background music',
    unmute: 'Unmute background music',
  },
  loader: {
    component: 'Loading Wisdom...',
  },
  horoscope: {
    form: {
      title: 'Enter Your Birth Information',
      description: 'Provide accurate birth details to receive the most precise analysis of your astrological chart.',
      dob: 'Date of Birth',
      day: 'Day',
      month: 'Month',
      year: 'Year',
      tob: 'Time of Birth',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      submitButton: 'Analyze Destiny',
      loadingButton: 'Analyzing...',
    },
    loaderMessage: 'The AI Sage is analyzing your chart. This may take a moment...',
    result: {
      tabs: {
        summary: 'Summary',
        lifetime: 'Lifetime Analysis',
        lucky: 'Lucky Guide'
      },
      summary: {
        title: 'Destiny Overview',
        mainElement: 'Main Element',
        zodiacAnimal: 'Zodiac Animal',
        westernZodiac: 'Western Zodiac',
        destinyPalace: 'Destiny Palace',
      },
      lifetime: {
        title: 'Lifetime Analysis',
        overview: 'Overview',
        career: 'Career',
        wealth: 'Wealth',
        love: 'Love & Marriage',
        health: 'Health',
        family: 'Family',
        synthesis: 'Synthesis & Holistic View',
        keyPeriodsTitle: 'Key Life Periods',
        youth: 'Youth Period (Ages 18-35)',
        middleAge: 'Middle Age (Ages 36-55)',
        oldAge: 'Old Age (Ages 56+)',
      },
      lucky: {
        title: 'Auspicious Guide',
        numbers: 'Lucky Numbers',
        colors: 'Lucky Colors',
        zodiacs: 'Compatible Zodiacs',
        dos: 'Things to Do',
        donts: 'Things to Avoid',
      },
    },
    support: {
      button: 'Offer a Donation',
      modalTitle: 'Support the Path of Dharma',
      modalText1: 'This analysis is a gift of knowledge. If you find it helpful and wish to sow good karma for the platform to continue growing and spreading value, you may offer a small donation.',
      modalText2: 'Every contribution, no matter how small, is a precious source of encouragement. We sincerely appreciate your merit!',
    },
    pdf: {
      button: 'Download Horoscope PDF',
      modalTitle: 'Download Your Horoscope',
      modalText: 'Your detailed horoscope is ready for download. To help the dharma spread, we kindly ask you to sow a little good karma with a donation before downloading.',
      completeButton: 'Complete & Download',
      loadingButton: 'Creating PDF...',
      errorNotFound: 'Could not find content to create PDF.',
      errorGeneric: 'An error occurred while creating the PDF file. Please try again.',
    }
  },
  chat: {
    initialMessage: 'Amitabha! I am Thien Giac, the AI Sage. How may I illuminate your path regarding destiny, feng shui, or life philosophy?',
    placeholder: 'Ask about destiny, life path, decisions...',
    sendButton: 'Send',
    starterPrompts: [
      "What does my birth date say about my career?",
      "How can I improve my luck and fortune?",
      "Explain the concept of Karma.",
      "What is my life's purpose?"
    ],
    error: {
        unknown: 'Unknown server error.',
        server: 'Server error',
        generic: 'Sorry, an error has occurred. Please try again.',
    }
  },
  divination: {
    initial: {
      title: 'Sincerely Request a Hexagram',
      description: 'First, calm your mind and focus on the question you wish to ask. Let your heart be clear and your intention sincere.',
      alt: 'Divination Sticks Container',
      button: 'Begin Divination',
      focusMessage: 'Once your mind is calm and your question is clear, shake the container to receive guidance.',
      shakeButton: 'Shake the Container',
      loadingButton: 'Casting...',
    },
    result: {
      stickNumberLabel: 'Oracle Stick Number',
      poemTitle: 'Interpretive Poem',
      interpretationTitle: 'Detailed Interpretation',
      adviceTitle: "The Sage's Advice",
      newButton: 'Cast a New Hexagram',
    },
    support: {
      title: 'Sow Good Karma, Attain Full Blessings',
      description: 'This hexagram is a form of guidance. If it has brought you clarity, consider sowing good karma so that blessings may be fulfilled and benevolent values spread.',
    },
  },
  dateSelection: {
    tabTitle: 'Auspicious Date',
    form: {
        title: 'Select an Auspicious Date',
        description: 'Choose your event and provide your details to find the most prosperous dates for your important occasion.',
        eventType: 'Event Type',
        birthDate: 'Your Date of Birth',
        targetMonth: 'Target Month',
        targetYear: 'Target Year',
        submitButton: 'Find Good Dates',
        loadingButton: 'Searching...',
        eventTypes: {
            wedding: 'Wedding',
            groundbreaking: 'Groundbreaking Ceremony',
            grandOpening: 'Grand Opening',
            movingHouse: 'Moving to a New House',
            contractSigning: 'Signing Contracts',
            travel: 'Starting a Journey',
        }
    },
    results: {
        title: 'List of Auspicious Dates',
        noResults: 'No highly auspicious dates were found for this event in the selected month. Please try another month.',
        lunarDate: 'Lunar Date',
        goodHours: 'Auspicious Hours',
        explanation: 'Explanation',
        conflictingZodiacs: 'Conflicting Zodiacs',
        auspiciousStars: 'Auspicious Stars',
        inauspiciousStars: 'Inauspicious Stars',
    },
    loaderMessage: 'The AI Sage is calculating celestial energies to find the best date for you...',
  },
  talisman: {
    form: {
      title: 'Request a Lucky Talisman',
      description: 'Enter your information and make a sincere wish. The AI Sage will craft a unique protective talisman imbued with auspicious energy for you.',
      name: 'Your Full Name',
      dob: 'Your Date of Birth',
      wish: 'Your Wish',
      submitButton: 'Sincerely Request Talisman',
      loadingButton: 'Crafting...',
    },
    wishTypes: {
      overall_luck: 'Overall Luck & Peace',
      career: 'Career & Success',
      wealth: 'Wealth & Prosperity',
      love: 'Love & Relationships',
      health: 'Health & Safety',
      education: 'Education & Exams',
    },
    loaderMessage: 'The AI Sage is chanting mantras and drawing your protective talisman...',
    result: {
      title: 'Your Protective Talisman',
      downloadButton: 'Download Talisman',
      newButton: 'Request a New Talisman',
      symbolismTitle: 'Talisman Symbolism',
      instructionsTitle: 'Instructions for Use',
    },
  },
  support: {
    copy: 'Copy',
    copied: 'Copied',
    copyError: 'Could not copy. Please try again.',
    vcb: {
      bank: 'Vietcombank',
      nameLabel: 'Account Holder',
      name: 'HA VAN TOAN',
      accountLabel: 'Account Number',
    },
    zalo: {
      wallet: 'ZaloPay Wallet',
      phoneLabel: 'Phone Number',
    }
  },
  printable: {
    title: 'Lifetime Horoscope Analysis',
    userInfo: 'Personal Information',
    footer: 'Analyzed by Huyền Phong Phật Đạo © {{year}}. This content is for reference and contemplation purposes only.',
  },
  quotes: [
    { text: "As you sow, so shall you reap. Your destiny today is the result of your past thoughts and actions.", author: "Law of Karma" },
    { text: "A peaceful mind leads to a peaceful life. True tranquility comes from within, not from external circumstances.", author: "Buddha's Teachings" },
    { text: "The root of all suffering is attachment. Let go, and you will find peace.", author: "Eastern Philosophy" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Dhammapada" },
    { text: "Forgive others, not because they deserve forgiveness, but because you deserve peace.", author: "Thich Nhat Hanh" },
    { text: "To understand everything is to forgive everything.", author: "Words of Wisdom" }
  ],
};