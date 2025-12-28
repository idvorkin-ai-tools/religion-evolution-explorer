export interface Concept {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ConceptView {
  summary: string;
  details?: string;
}

export interface Religion {
  id: string;
  name: string;
  parentId: string | null;
  foundedYear: number; // negative for BCE
  founder?: string;
  adherents?: number; // millions
  color: string;
  concepts: Record<string, ConceptView>;
}

// Key concepts we're tracking across religions
export const concepts: Concept[] = [
  {
    id: "hell",
    name: "Hell",
    description: "Beliefs about punishment and the afterlife for the wicked",
    icon: "🔥",
  },
  {
    id: "forgiveness",
    name: "Forgiveness",
    description: "How sins are forgiven and atonement achieved",
    icon: "🕊️",
  },
  {
    id: "salvation",
    name: "Salvation",
    description: "Path to salvation or spiritual liberation",
    icon: "✨",
  },
  {
    id: "afterlife",
    name: "Afterlife",
    description: "What happens after death",
    icon: "☁️",
  },
  {
    id: "messiah",
    name: "Messiah",
    description: "Beliefs about the messiah or savior figure",
    icon: "👑",
  },
  {
    id: "scripture",
    name: "Scripture",
    description: "Sacred texts and their authority",
    icon: "📜",
  },
  {
    id: "originalsin",
    name: "Original Sin",
    description: "View of human nature and inherited sinfulness",
    icon: "🍎",
  },
  {
    id: "prayer",
    name: "Prayer",
    description: "How believers communicate with the divine",
    icon: "🙏",
  },
];

// The religion family tree
export const religions: Religion[] = [
  {
    id: "judaism",
    name: "Judaism",
    parentId: null,
    foundedYear: -2000,
    founder: "Abraham/Moses",
    adherents: 15,
    color: "#1E40AF",
    concepts: {
      hell: {
        summary: "Sheol - a shadowy realm; Gehenna for purification (not eternal)",
        details:
          "Traditional Judaism focuses less on hell. Sheol is the abode of the dead. Gehenna is a place of purification, typically lasting up to 12 months, not eternal torment.",
      },
      forgiveness: {
        summary: "Teshuvah (repentance) + Yom Kippur + making amends",
        details:
          "Forgiveness comes through genuine repentance (teshuvah), prayer, and making amends to those wronged. Yom Kippur is the annual day of atonement.",
      },
      salvation: {
        summary: "Following Torah and mitzvot (commandments)",
        details:
          "Judaism focuses on this-worldly righteous living rather than individual salvation. Following the 613 mitzvot and living ethically.",
      },
      afterlife: {
        summary: "Olam Ha-Ba (World to Come); resurrection of the dead",
        details:
          "Beliefs vary. Many believe in Olam Ha-Ba (World to Come) and bodily resurrection. Focus is more on legacy and this life.",
      },
      messiah: {
        summary: "Future human king who will restore Israel; not divine",
        details:
          "The Messiah will be a human descendant of David who will rebuild the Temple, gather exiles, and bring world peace. Not a divine figure.",
      },
      scripture: {
        summary: "Torah (Written) + Talmud (Oral tradition)",
        details:
          "The Tanakh (Hebrew Bible) with Torah as most sacred. Talmud contains rabbinic discussions and interpretations.",
      },
      originalsin: {
        summary: "No inherited sin; yetzer hara (evil inclination) balanced by yetzer tov",
        details:
          "Humans are born neutral with both good and evil inclinations. Adam's sin affected humanity but doesn't condemn individuals.",
      },
      prayer: {
        summary: "Three daily prayers; Hebrew liturgy; direct to God",
        details:
          "Shacharit (morning), Mincha (afternoon), Ma'ariv (evening). Siddur (prayer book). No intermediary needed.",
      },
    },
  },
  {
    id: "christianity",
    name: "Early Christianity",
    parentId: "judaism",
    foundedYear: 30,
    founder: "Jesus of Nazareth",
    adherents: 50, // early movement
    color: "#7C3AED",
    concepts: {
      hell: {
        summary: "Eternal separation from God; debated nature",
        details:
          "Early Christians had varied views. Some saw it as eternal conscious torment, others as destruction (annihilationism).",
      },
      forgiveness: {
        summary: "Through faith in Jesus's sacrifice",
        details:
          "Jesus's death atones for sin. Forgiveness through faith, repentance, and baptism.",
      },
      salvation: {
        summary: "Faith in Jesus as Messiah and Son of God",
        details:
          "Salvation through grace by faith in Jesus Christ. Emphasis on personal relationship with God through Jesus.",
      },
      afterlife: {
        summary: "Heaven with God; bodily resurrection at end times",
        details:
          "Believers join God in heaven. Bodily resurrection expected at Christ's return. New heaven and new earth.",
      },
      messiah: {
        summary: "Jesus is the Messiah and divine Son of God",
        details:
          "Jesus fulfilled messianic prophecies. He is the Son of God, part of the Trinity, who died and rose again.",
      },
      scripture: {
        summary: "Hebrew Bible + New Testament",
        details:
          "Old Testament (Hebrew Bible) plus New Testament writings (Gospels, Letters, Revelation).",
      },
      originalsin: {
        summary: "Developing doctrine; humanity fallen through Adam",
        details:
          "Paul teaches all sinned in Adam. Baptism cleanses from sin. Full doctrine developed over centuries.",
      },
      prayer: {
        summary: "Lord's Prayer; spontaneous and liturgical",
        details:
          "Jesus taught the Lord's Prayer. Both formal and spontaneous prayer. Prayer in Jesus's name.",
      },
    },
  },
  {
    id: "catholic",
    name: "Catholic Church",
    parentId: "christianity",
    foundedYear: 325,
    founder: "Constantine/Church Councils",
    adherents: 1300,
    color: "#DC2626",
    concepts: {
      hell: {
        summary: "Eternal conscious separation from God",
        details:
          "Hell is eternal. Purgatory exists for purification before heaven. Mortal sin without confession leads to hell.",
      },
      forgiveness: {
        summary: "Confession to priest + penance + absolution",
        details:
          "Sacrament of Reconciliation: confess to priest, receive penance, and absolution. Mortal sins require confession.",
      },
      salvation: {
        summary: "Faith + works + sacraments; Church as vehicle",
        details:
          "Salvation through faith and works, mediated through the seven sacraments. The Church is the ordinary means of salvation.",
      },
      afterlife: {
        summary: "Heaven, Hell, or Purgatory; saints intercede",
        details:
          "Heaven for the saved, hell for the damned, purgatory for purification. Saints can intercede for the living.",
      },
      messiah: {
        summary: "Jesus is God incarnate; Trinity doctrine",
        details:
          "Jesus is the second person of the Trinity, fully God and fully human. Nicene Creed defines orthodox belief.",
      },
      scripture: {
        summary: "Bible + Sacred Tradition + Magisterium",
        details:
          "Scripture and Tradition are equal sources. The Magisterium (teaching authority) interprets both.",
      },
      originalsin: {
        summary: "Augustine's doctrine; inherited guilt removed by baptism",
        details:
          "All inherit Adam's sin and guilt. Baptism removes original sin. Concupiscence (tendency to sin) remains.",
      },
      prayer: {
        summary: "Mass; Rosary; Liturgy of Hours; saints intercede",
        details:
          "Eucharistic celebration central. Prayers to saints and Mary for intercession. Seven daily prayer hours.",
      },
    },
  },
  {
    id: "orthodox",
    name: "Eastern Orthodox",
    parentId: "christianity",
    foundedYear: 1054,
    founder: "Great Schism",
    adherents: 220,
    color: "#059669",
    concepts: {
      hell: {
        summary: "Experience of God's love as torment for the unrepentant",
        details:
          "Hell is not a place but the experience of God's presence as burning for those who rejected Him. Theosis vs. torment.",
      },
      forgiveness: {
        summary: "Confession + repentance; Mystery of Repentance",
        details:
          "Confession to a priest (spiritual father). Focus on healing rather than legal absolution. Ongoing repentance.",
      },
      salvation: {
        summary: "Theosis - becoming one with God's energies",
        details:
          "Salvation as theosis (divinization) - becoming partakers of divine nature. Synergy of grace and human will.",
      },
      afterlife: {
        summary: "Theosis continues; resurrection of all",
        details:
          "The journey toward God continues after death. Universal resurrection. Less defined than Western Christianity.",
      },
      messiah: {
        summary: "Jesus as God incarnate; emphasis on resurrection",
        details:
          "Christ's resurrection defeats death. Strong emphasis on Incarnation and Resurrection over atonement theory.",
      },
      scripture: {
        summary: "Bible + Holy Tradition + Church Councils",
        details:
          "Scripture interpreted through Holy Tradition. Seven Ecumenical Councils are authoritative.",
      },
      originalsin: {
        summary: "Ancestral sin; inherited mortality, not guilt",
        details:
          "Reject Augustine's inherited guilt. Adam's sin brought death and tendency to sin, not personal guilt.",
      },
      prayer: {
        summary: "Divine Liturgy; Jesus Prayer; icons aid worship",
        details:
          "Divine Liturgy is mystical participation in heaven. Jesus Prayer for unceasing prayer. Icons as windows to heaven.",
      },
    },
  },
  {
    id: "greek_orthodox",
    name: "Greek Orthodox",
    parentId: "orthodox",
    foundedYear: 1054,
    founder: "Ecumenical Patriarchate",
    adherents: 20,
    color: "#0D9488",
    concepts: {
      hell: {
        summary: "Experience of God's love as fire for the unprepared",
        details:
          "Hell is not separation from God but experiencing His presence without preparation. Theosis is the goal.",
      },
      forgiveness: {
        summary: "Confession to priest; emphasis on spiritual healing",
        details:
          "Regular confession to spiritual father. Focus on healing rather than juridical absolution.",
      },
      salvation: {
        summary: "Theosis through sacraments and ascetic life",
        details:
          "Participation in divine nature. Sacramental life, fasting, and prayer lead to deification.",
      },
      afterlife: {
        summary: "Continued journey toward God; resurrection",
        details:
          "Death is not the end but continuation. Prayers for the dead. Universal bodily resurrection.",
      },
      messiah: {
        summary: "Christ the Logos incarnate; Resurrection central",
        details:
          "Pascha (Easter) is the feast of feasts. Christ's resurrection defeats death for all.",
      },
      scripture: {
        summary: "Septuagint + New Testament; Tradition interprets",
        details:
          "Greek Septuagint is the Old Testament. Holy Tradition and Fathers guide interpretation.",
      },
      originalsin: {
        summary: "Ancestral sin; mortality inherited, not guilt",
        details:
          "Humans inherit consequences of Adam's sin (death, corruption) but not personal guilt.",
      },
      prayer: {
        summary: "Byzantine Liturgy; monasticism; Philokalia",
        details:
          "Divine Liturgy of St. John Chrysostom. Rich monastic tradition. Hesychasm and Jesus Prayer.",
      },
    },
  },
  {
    id: "russian_orthodox",
    name: "Russian Orthodox",
    parentId: "orthodox",
    foundedYear: 988,
    founder: "Prince Vladimir of Kiev",
    adherents: 100,
    color: "#047857",
    concepts: {
      hell: {
        summary: "Separation from God's grace; self-chosen",
        details:
          "Hell is the soul's rejection of God's love. Not a place God sends people but one they choose.",
      },
      forgiveness: {
        summary: "Confession; Forgiveness Sunday; mutual forgiveness",
        details:
          "Forgiveness Sunday before Lent - all ask forgiveness of each other. Regular sacramental confession.",
      },
      salvation: {
        summary: "Sobornost (catholicity); communal salvation",
        details:
          "Salvation in community, not isolation. The Church saves. Strong emphasis on liturgical life.",
      },
      afterlife: {
        summary: "Prayers for dead; toll houses debated",
        details:
          "Extensive prayers for the departed. Some teach aerial toll houses after death (controversial).",
      },
      messiah: {
        summary: "Christ as suffering servant; kenosis",
        details:
          "Emphasis on Christ's self-emptying (kenosis). Russian spirituality values humility and suffering.",
      },
      scripture: {
        summary: "Church Slavonic Bible; living Tradition",
        details:
          "Scriptures in Church Slavonic liturgically. Russian theological tradition and saints' writings.",
      },
      originalsin: {
        summary: "Fallen nature inherited; struggle with passions",
        details:
          "Human nature wounded but not totally depraved. Ascetic struggle against passions (nepsis).",
      },
      prayer: {
        summary: "Lengthy services; icons; prostrations",
        details:
          "Long liturgical services. Icon veneration central. Full prostrations. Akathist hymns.",
      },
    },
  },
  {
    id: "coptic_orthodox",
    name: "Coptic Orthodox",
    parentId: "christianity",
    foundedYear: 451,
    founder: "St. Mark the Evangelist (tradition)",
    adherents: 20,
    color: "#7C3AED",
    concepts: {
      hell: {
        summary: "Eternal separation; prayers for mercy",
        details:
          "Hell is real. Coptic prayers emphasize God's mercy. Focus on preparation through holy life.",
      },
      forgiveness: {
        summary: "Confession to priest; fasting as preparation",
        details:
          "Confession before communion. Extensive fasting (over 200 days/year) as spiritual discipline.",
      },
      salvation: {
        summary: "Sacraments + asceticism; desert spirituality",
        details:
          "Birthplace of Christian monasticism. Desert Fathers tradition. Seven sacraments essential.",
      },
      afterlife: {
        summary: "Paradise for faithful; martyrdom honored",
        details:
          "Strong martyr tradition. Paradise awaits the faithful. Prayers for departed souls.",
      },
      messiah: {
        summary: "Christ one nature (miaphysite); fully divine and human",
        details:
          "One united nature of Christ (not Chalcedonian two natures). Rejected by Council of Chalcedon.",
      },
      scripture: {
        summary: "Coptic Bible; ancient manuscripts",
        details:
          "Preserves ancient biblical texts. Coptic language liturgy. Apostolic tradition from St. Mark.",
      },
      originalsin: {
        summary: "Human nature weakened; baptism restores",
        details:
          "Adam's sin weakened humanity. Baptism and chrismation restore divine image.",
      },
      prayer: {
        summary: "Ancient liturgy; Agpeya (hours); Coptic chant",
        details:
          "Liturgy of St. Basil and St. Gregory. Seven daily prayer hours. Distinctive Coptic music.",
      },
    },
  },
  {
    id: "protestant",
    name: "Protestant",
    parentId: "catholic",
    foundedYear: 1517,
    founder: "Martin Luther",
    adherents: 400,
    color: "#EA580C",
    concepts: {
      hell: {
        summary: "Eternal punishment; varies by denomination",
        details:
          "Most affirm hell as eternal. Some denominations (Adventists) teach annihilationism. Universalism is minority view.",
      },
      forgiveness: {
        summary: "Direct to God through Jesus; no priest needed",
        details:
          "Priesthood of all believers. Confess directly to God. Jesus is the only mediator.",
      },
      salvation: {
        summary: "Sola fide - by faith alone, not works",
        details:
          "Salvation by grace alone through faith alone in Christ alone. Works are fruit of salvation, not cause.",
      },
      afterlife: {
        summary: "Heaven or hell; no purgatory",
        details:
          "Binary afterlife - heaven for believers, hell for unbelievers. No intermediate state of purgatory.",
      },
      messiah: {
        summary: "Jesus as personal Lord and Savior",
        details:
          "Personal relationship with Jesus Christ. Accept him as Lord and Savior. Less emphasis on institutional mediation.",
      },
      scripture: {
        summary: "Sola scriptura - Bible alone is authority",
        details:
          "Scripture alone is the ultimate authority. No tradition or church has equal authority to the Bible.",
      },
      originalsin: {
        summary: "Total depravity; all inherit Adam's guilt",
        details:
          "Luther and Calvin taught total depravity. Humans cannot save themselves. Only grace can overcome sin nature.",
      },
      prayer: {
        summary: "Direct to God; no saints; congregational and private",
        details:
          "No intermediaries needed. Both formal worship and spontaneous prayer. Hymns important.",
      },
    },
  },
  {
    id: "evangelical",
    name: "Evangelical",
    parentId: "protestant",
    foundedYear: 1730,
    founder: "Great Awakening movements",
    adherents: 300,
    color: "#F59E0B",
    concepts: {
      hell: {
        summary: "Literal eternal conscious torment",
        details:
          "Strong emphasis on hell as real, eternal, conscious torment. Major motivation for evangelism and conversion.",
      },
      forgiveness: {
        summary: "Accept Jesus as personal savior; born again",
        details:
          "Pray the sinner's prayer. Accept Jesus into your heart. Experience of being 'born again' is central.",
      },
      salvation: {
        summary: "Personal decision to accept Christ; born-again experience",
        details:
          "Must make personal decision for Christ. Conversion experience often dramatic. Assurance of salvation emphasized.",
      },
      afterlife: {
        summary: "Heaven for saved; often belief in Rapture",
        details:
          "Clear heaven/hell distinction. Many believe in Rapture and premillennial return of Christ.",
      },
      messiah: {
        summary: "Personal relationship with Jesus; imminent return",
        details:
          "Jesus as personal Lord and Savior. Strong expectation of Christ's imminent return. Active evangelism.",
      },
      scripture: {
        summary: "Biblical inerrancy; literal interpretation",
        details:
          "Bible is inerrant and infallible. Often literal interpretation. Scripture as direct word of God.",
      },
      originalsin: {
        summary: "Total depravity; must be born again",
        details:
          "Strong emphasis on sinful nature inherited from Adam. Must be spiritually reborn to be saved.",
      },
      prayer: {
        summary: "Spontaneous and fervent; praise and worship",
        details:
          "Emotional, spontaneous prayer. Contemporary worship music. Prayer meetings and revivals.",
      },
    },
  },
  {
    id: "lutheran",
    name: "Lutheran",
    parentId: "protestant",
    foundedYear: 1517,
    founder: "Martin Luther",
    adherents: 80,
    color: "#8B5CF6",
    concepts: {
      hell: {
        summary: "Eternal separation from God",
        details:
          "Hell is real and eternal. Those who reject Christ face eternal separation from God.",
      },
      forgiveness: {
        summary: "Grace through faith; confession available but not required",
        details:
          "Forgiveness through faith in Christ. Individual confession available but general confession in worship common.",
      },
      salvation: {
        summary: "Sola gratia, sola fide - grace alone through faith alone",
        details:
          "Salvation is entirely God's work through grace. Humans cannot earn salvation. Baptism conveys grace.",
      },
      afterlife: {
        summary: "Heaven or hell; resurrection of the body",
        details:
          "Believers enter heaven after death. Bodily resurrection at Christ's return. No purgatory.",
      },
      messiah: {
        summary: "Christ present in Word and Sacraments",
        details:
          "Jesus is truly present in Eucharist (real presence). Emphasis on Christ's work rather than decision theology.",
      },
      scripture: {
        summary: "Scripture alone, but guided by confessions",
        details:
          "Bible is sole authority. Lutheran Confessions (Book of Concord) help interpret scripture.",
      },
      originalsin: {
        summary: "Total depravity; simul justus et peccator",
        details:
          "Humans are totally depraved. Believers are simultaneously sinners and justified (saint and sinner).",
      },
      prayer: {
        summary: "Liturgical worship; hymns central; Lord's Supper",
        details:
          "Formal liturgy preserved. Rich hymn tradition (Luther wrote many). Weekly communion in many churches.",
      },
    },
  },
  {
    id: "anglican",
    name: "Anglican/Episcopal",
    parentId: "catholic",
    foundedYear: 1534,
    founder: "Henry VIII / Thomas Cranmer",
    adherents: 85,
    color: "#0EA5E9",
    concepts: {
      hell: {
        summary: "Varies widely; eternal separation or remedial",
        details:
          "Broad church tradition allows diverse views. Some affirm traditional hell, others lean toward universalism.",
      },
      forgiveness: {
        summary: "Confession to priest or general confession",
        details:
          "Both private confession to priest and general confession in liturgy. Via media between Catholic and Protestant.",
      },
      salvation: {
        summary: "Faith and sacraments; 'via media' approach",
        details:
          "Middle way between Catholic and Protestant. Scripture, tradition, and reason all inform faith.",
      },
      afterlife: {
        summary: "Heaven; prayers for dead but purgatory optional",
        details:
          "Prayers for departed common. Purgatory neither affirmed nor denied. Resurrection hope central.",
      },
      messiah: {
        summary: "Christ in sacraments; diverse Christologies",
        details:
          "Real presence in Eucharist variously understood. Room for Anglo-Catholic and Evangelical interpretations.",
      },
      scripture: {
        summary: "Scripture primary, tradition and reason support",
        details:
          "Three-legged stool: Scripture, Tradition, Reason. Scripture is primary but not alone.",
      },
      originalsin: {
        summary: "Varied views; Articles allow latitude",
        details:
          "39 Articles affirm original sin. Broad church allows range from Augustinian to more moderate views.",
      },
      prayer: {
        summary: "Book of Common Prayer; Eucharist; daily offices",
        details:
          "Common Prayer book structures worship. Morning and Evening Prayer. Eucharist central but frequency varies.",
      },
    },
  },
  {
    id: "baptist",
    name: "Baptist",
    parentId: "protestant",
    foundedYear: 1609,
    founder: "John Smyth / Thomas Helwys",
    adherents: 100,
    color: "#EF4444",
    concepts: {
      hell: {
        summary: "Eternal conscious punishment for unbelievers",
        details:
          "Strong belief in literal hell. Eternal separation from God. Major impetus for evangelism.",
      },
      forgiveness: {
        summary: "Direct to God through repentance and faith",
        details:
          "No intermediary needed. Personal confession to God. Believer's baptism follows conversion.",
      },
      salvation: {
        summary: "Personal faith in Christ; believer's baptism",
        details:
          "Must make personal decision for Christ. Baptism doesn't save but is obedient response to salvation.",
      },
      afterlife: {
        summary: "Heaven for believers; hell for unbelievers",
        details:
          "Clear distinction between saved and lost. Bodily resurrection. Various views on millennium.",
      },
      messiah: {
        summary: "Personal Lord and Savior; soul competency",
        details:
          "Each person directly accountable to God. No priestly mediation. Jesus as personal savior.",
      },
      scripture: {
        summary: "Bible alone; no creeds have authority",
        details:
          "Scripture is sole authority. 'No creed but Christ, no book but the Bible.' Local church autonomy.",
      },
      originalsin: {
        summary: "Inherited sinful nature; need for conversion",
        details:
          "All are born with sinful nature. Personal conversion necessary. Age of accountability before guilt applies.",
      },
      prayer: {
        summary: "Spontaneous congregational prayer; altar calls",
        details:
          "Non-liturgical worship. Spontaneous prayer valued. Altar calls for public commitment. Prayer meetings.",
      },
    },
  },
  {
    id: "methodist",
    name: "Methodist",
    parentId: "anglican",
    foundedYear: 1738,
    founder: "John Wesley",
    adherents: 80,
    color: "#14B8A6",
    concepts: {
      hell: {
        summary: "Real but God's grace extends to all",
        details:
          "Hell is real. Prevenient grace reaches all people. God desires all to be saved.",
      },
      forgiveness: {
        summary: "Grace-enabled repentance; sanctification journey",
        details:
          "God's grace enables repentance. Ongoing process of sanctification and growth in holiness.",
      },
      salvation: {
        summary: "Prevenient, justifying, and sanctifying grace",
        details:
          "Three works of grace. Arminian theology - salvation offered to all, can be resisted or lost.",
      },
      afterlife: {
        summary: "Heaven; resurrection; some openness on hell's nature",
        details:
          "Hope for all. Resurrection of body. Some Methodists open to conditional immortality.",
      },
      messiah: {
        summary: "Christ as savior; emphasis on personal experience",
        details:
          "Warm-hearted religion. Personal experience of Christ. Heart 'strangely warmed' at Aldersgate.",
      },
      scripture: {
        summary: "Scripture primary in Wesleyan Quadrilateral",
        details:
          "Scripture, Tradition, Reason, Experience - with Scripture primary. Practical holiness emphasized.",
      },
      originalsin: {
        summary: "Prevenient grace counters; entire sanctification possible",
        details:
          "Original sin real but prevenient grace enables response. Entire sanctification (Christian perfection) possible.",
      },
      prayer: {
        summary: "Hymns; class meetings; social holiness",
        details:
          "Wesley's hymns central. Small group accountability. Prayer combines personal piety and social action.",
      },
    },
  },
  {
    id: "pentecostal",
    name: "Pentecostal",
    parentId: "protestant",
    foundedYear: 1901,
    founder: "Charles Parham / Azusa Street Revival",
    adherents: 280,
    color: "#F97316",
    concepts: {
      hell: {
        summary: "Literal eternal fire and torment",
        details:
          "Strong belief in literal hell. Urgency of salvation message. Evangelism critical.",
      },
      forgiveness: {
        summary: "Repentance and Spirit baptism",
        details:
          "Forgiveness through accepting Christ. Spirit baptism with evidence of tongues often follows.",
      },
      salvation: {
        summary: "Born again + Spirit baptism with tongues",
        details:
          "Initial salvation plus second blessing of Spirit baptism. Speaking in tongues as evidence.",
      },
      afterlife: {
        summary: "Heaven for saved; imminent return of Christ",
        details:
          "Pre-millennial return of Christ expected soon. Rapture theology common.",
      },
      messiah: {
        summary: "Living Christ active through Holy Spirit",
        details:
          "Jesus saves, heals, baptizes in Spirit, and is coming again. Emphasis on Spirit's current work.",
      },
      scripture: {
        summary: "Bible inerrant; Spirit illuminates",
        details:
          "Scripture is inerrant. Holy Spirit helps interpret and apply. Prophecy and revelation continue.",
      },
      originalsin: {
        summary: "Total depravity; Spirit empowers victory over sin",
        details:
          "Inherited sin nature is real. But Spirit baptism empowers believers to live victoriously over sin.",
      },
      prayer: {
        summary: "Tongues; prophecy; spontaneous worship; healing",
        details:
          "Speaking in tongues in prayer. Prophecy in worship. Laying on hands for healing. Exuberant praise.",
      },
    },
  },
  {
    id: "islam",
    name: "Islam",
    parentId: "judaism",
    foundedYear: 622,
    founder: "Prophet Muhammad",
    adherents: 1900,
    color: "#10B981",
    concepts: {
      hell: {
        summary: "Jahannam - may be temporary for Muslims, eternal for others",
        details:
          "Jahannam has levels of punishment. Some Muslims may be purified and leave. Unbelievers face eternal torment.",
      },
      forgiveness: {
        summary: "Allah forgives through repentance (tawbah)",
        details:
          "Sincere repentance (tawbah) directly to Allah. No intermediary needed. Allah is Oft-Forgiving, Most Merciful.",
      },
      salvation: {
        summary: "Submission to Allah; Five Pillars; good deeds outweigh bad",
        details:
          "Submit to Allah's will. Follow Five Pillars. Good deeds weighed against bad on Day of Judgment.",
      },
      afterlife: {
        summary: "Jannah (paradise) or Jahannam (hell); physical pleasures",
        details:
          "Paradise includes physical pleasures - gardens, rivers, companionship. Bodily resurrection on Last Day.",
      },
      messiah: {
        summary: "Jesus (Isa) was prophet, not divine; Muhammad is final prophet",
        details:
          "Jesus was a prophet and messiah, but not divine or Son of God. Did not die on cross. Muhammad is seal of prophets.",
      },
      scripture: {
        summary: "Quran is literal word of Allah; uncreated and perfect",
        details:
          "Quran is Allah's final revelation, dictated to Muhammad. Previous scriptures (Torah, Gospel) were corrupted.",
      },
      originalsin: {
        summary: "No original sin; humans born pure (fitra)",
        details:
          "Adam sinned but didn't pass guilt to descendants. All are born in state of purity (fitra). Satan tempts.",
      },
      prayer: {
        summary: "Five daily prayers (salat); Friday congregational",
        details:
          "Salat five times daily facing Mecca. Ablution required. Friday Jumu'ah prayer. Du'a for personal requests.",
      },
    },
  },
  {
    id: "sunni",
    name: "Sunni Islam",
    parentId: "islam",
    foundedYear: 632,
    founder: "Followers of Abu Bakr",
    adherents: 1600,
    color: "#22C55E",
    concepts: {
      hell: {
        summary: "Jahannam with levels; intercession possible",
        details:
          "Seven levels of hell. Muhammad may intercede for Muslims. Even some in hell may eventually be released.",
      },
      forgiveness: {
        summary: "Tawbah + good deeds; Prophet's intercession hoped",
        details:
          "Sincere repentance to Allah. Good deeds recommended. Hope in Prophet's intercession on Day of Judgment.",
      },
      salvation: {
        summary: "Five Pillars + following Sunnah of Prophet",
        details:
          "Follow Quran and Sunnah (Prophet's example). Hadith collections are authoritative. Four schools of law.",
      },
      afterlife: {
        summary: "Paradise based on faith and deeds; resurrection",
        details:
          "Physical paradise with gardens and rivers. Bodily resurrection. Scales weigh good vs. bad deeds.",
      },
      messiah: {
        summary: "Mahdi will come before Day of Judgment; Jesus returns",
        details:
          "Await the Mahdi (guided one). Jesus (Isa) will return to defeat the Antichrist and establish justice.",
      },
      scripture: {
        summary: "Quran + Hadith + consensus of scholars",
        details:
          "Quran is primary. Six major hadith collections (especially Bukhari and Muslim). Ijma (consensus) matters.",
      },
      originalsin: {
        summary: "No original sin; fitra + personal accountability",
        details:
          "Born pure. Each person accountable only for their own sins. Following Sunnah helps avoid sin.",
      },
      prayer: {
        summary: "Five prayers; tarawih in Ramadan; emphasis on Sunnah",
        details:
          "Five daily prayers plus Sunnah prayers. Special tarawih prayers during Ramadan. Following Prophet's example.",
      },
    },
  },
  {
    id: "shia",
    name: "Shia Islam",
    parentId: "islam",
    foundedYear: 632,
    founder: "Followers of Ali",
    adherents: 250,
    color: "#84CC16",
    concepts: {
      hell: {
        summary: "Jahannam; Imams can intercede",
        details:
          "Hell exists for unbelievers and sinners. The Imams have power to intercede for believers.",
      },
      forgiveness: {
        summary: "Repentance + intercession of Imams and Ahl al-Bayt",
        details:
          "Sincere repentance to Allah. Intercession (shafa'a) of the Prophet and Imams is powerful.",
      },
      salvation: {
        summary: "Faith + following the Imams; love of Ahl al-Bayt",
        details:
          "Devotion to the Prophet's family (Ahl al-Bayt) is essential. Following the guidance of the Imams.",
      },
      afterlife: {
        summary: "Paradise; resurrection; reward for loving Ahl al-Bayt",
        details:
          "Paradise for faithful. Special reward for devotion to the Prophet's family. Martyrdom highly honored.",
      },
      messiah: {
        summary: "Hidden Imam (Mahdi) will return to establish justice",
        details:
          "The 12th Imam is in occultation and will return as the Mahdi. Central to Twelver Shia theology.",
      },
      scripture: {
        summary: "Quran + Hadith from Ahl al-Bayt + Imams' teachings",
        details:
          "Quran is primary. Hadith from Prophet's family preferred. Teachings of Imams are authoritative.",
      },
      originalsin: {
        summary: "No original sin; guidance of Imams helps avoid sin",
        details:
          "Born pure. Imams provide guidance for righteous living. Devotion to Ahl al-Bayt protects from error.",
      },
      prayer: {
        summary: "Five prayers (three times); turbah; Ashura mourning",
        details:
          "Combine prayers to three times. Pray on turbah (clay tablet). Mourning rituals on Ashura for Husayn.",
      },
    },
  },
  {
    id: "sufi",
    name: "Sufism",
    parentId: "islam",
    foundedYear: 800,
    founder: "Various mystics (Rabi'a, al-Hallaj, Rumi)",
    adherents: 150,
    color: "#A855F7",
    concepts: {
      hell: {
        summary: "Separation from the Beloved; love transcends fear",
        details:
          "Focus less on fear of hell, more on love of God. Rabi'a: serve God for love, not fear of hell.",
      },
      forgiveness: {
        summary: "Divine love overcomes sin; purification of heart",
        details:
          "God's mercy and love are infinite. Spiritual practices purify the heart. Love covers sins.",
      },
      salvation: {
        summary: "Union with the Divine (fana); annihilation of ego",
        details:
          "Goal is fana (annihilation of self) and baqa (subsistence in God). Mystical union with the Beloved.",
      },
      afterlife: {
        summary: "Return to the Beloved; stages of spiritual ascent",
        details:
          "Death is reunion with God. Focus on spiritual states in this life that preview paradise.",
      },
      messiah: {
        summary: "Inner spiritual guide; the Perfect Human",
        details:
          "Focus on the inner path. The Perfect Human (al-Insan al-Kamil) as spiritual ideal. Living masters guide.",
      },
      scripture: {
        summary: "Quran's inner meaning; poetry and spiritual texts",
        details:
          "Quran has outer (zahir) and inner (batin) meanings. Poetry of Rumi, Hafiz, Ibn Arabi revered.",
      },
      originalsin: {
        summary: "Ego (nafs) is the enemy; purification through love",
        details:
          "The lower self (nafs) causes sin. Through spiritual practice and divine love, the nafs is purified.",
      },
      prayer: {
        summary: "Dhikr (remembrance); sama (whirling); muraqaba",
        details:
          "Repetitive remembrance of God's names. Music and dance in some orders. Meditation (muraqaba). Sufi retreats.",
      },
    },
  },
  {
    id: "reform_judaism",
    name: "Reform Judaism",
    parentId: "judaism",
    foundedYear: 1810,
    founder: "Abraham Geiger / Isaac Mayer Wise",
    adherents: 2,
    color: "#3B82F6",
    concepts: {
      hell: {
        summary: "De-emphasized; focus on ethical living now",
        details:
          "Afterlife beliefs are varied and not dogmatically required. Focus on making this world better.",
      },
      forgiveness: {
        summary: "Teshuvah; ethical repair; Yom Kippur",
        details:
          "Repentance and making amends. Yom Kippur for reflection. Personal autonomy in religious practice.",
      },
      salvation: {
        summary: "Tikkun olam - repairing the world; ethical action",
        details:
          "Focus on social justice and ethical living. Salvation is communal, through making the world better.",
      },
      afterlife: {
        summary: "Varies; many agnostic; legacy and impact emphasized",
        details:
          "Wide range of beliefs acceptable. Many focus on living on through good deeds and memory.",
      },
      messiah: {
        summary: "Messianic age rather than personal messiah",
        details:
          "Hope for a messianic era of peace, not necessarily a personal messiah figure.",
      },
      scripture: {
        summary: "Torah inspired but not literally dictated",
        details:
          "Torah is divinely inspired but written by humans. Historical-critical study embraced. Evolving revelation.",
      },
      originalsin: {
        summary: "No original sin; human capacity for good emphasized",
        details:
          "Reject any inherited guilt. Humans are essentially good with free will. Focus on ethical action.",
      },
      prayer: {
        summary: "Adapted liturgy; English common; egalitarian",
        details:
          "Modified traditional prayers. Much in vernacular. Men and women worship together equally. Organ music.",
      },
    },
  },
  {
    id: "conservative_judaism",
    name: "Conservative Judaism",
    parentId: "judaism",
    foundedYear: 1886,
    founder: "Solomon Schechter",
    adherents: 1.5,
    color: "#6366F1",
    concepts: {
      hell: {
        summary: "Traditional Gehenna; purification not eternal",
        details:
          "Maintain traditional views on Gehenna as purification. Not a central focus of teaching.",
      },
      forgiveness: {
        summary: "Teshuvah + Yom Kippur; balance of tradition and ethics",
        details:
          "Traditional repentance process. Yom Kippur central. Ethics informed by halacha (Jewish law).",
      },
      salvation: {
        summary: "Following halacha as it evolves; covenantal living",
        details:
          "Living according to Jewish law as interpreted by modern scholarship. Covenant with God remains central.",
      },
      afterlife: {
        summary: "Olam Ha-Ba; resurrection; range of views accepted",
        details:
          "Traditional beliefs maintained but not strictly defined. Focus on this-worldly observance.",
      },
      messiah: {
        summary: "Hope for messiah; national restoration",
        details:
          "Maintain messianic hope. Prayer for restoration of Israel. Personal messiah still expected by many.",
      },
      scripture: {
        summary: "Torah divine but interpreted through scholarship",
        details:
          "Torah is from God but understanding evolves through scholarship. Halacha can change through proper process.",
      },
      originalsin: {
        summary: "Traditional view of yetzer hara; balance emphasized",
        details:
          "Maintain traditional teaching on good and evil inclinations. No inherited guilt but tendency to sin recognized.",
      },
      prayer: {
        summary: "Traditional Hebrew liturgy; some modifications",
        details:
          "Mostly Hebrew prayers. Some egalitarian congregations. Traditional siddur with some updates.",
      },
    },
  },
  {
    id: "orthodox_judaism",
    name: "Orthodox Judaism",
    parentId: "judaism",
    foundedYear: 1800,
    founder: "Response to Reform (Chatam Sofer, etc.)",
    adherents: 2,
    color: "#1D4ED8",
    concepts: {
      hell: {
        summary: "Gehenna for purification up to 12 months",
        details:
          "Gehenna cleanses souls before entering Olam Ha-Ba. Maximum 12 months for most. Purely wicked destroyed.",
      },
      forgiveness: {
        summary: "Teshuvah + Yom Kippur + Temple sacrifices (in messianic age)",
        details:
          "Full teshuvah for interpersonal and sins against God. Yom Kippur for atonement. Temple service awaited.",
      },
      salvation: {
        summary: "Strict observance of 613 mitzvot; Torah study",
        details:
          "Rigorous observance of halacha (Jewish law). Torah study as highest mitzvah. All 613 commandments binding.",
      },
      afterlife: {
        summary: "Olam Ha-Ba; bodily resurrection; Gan Eden",
        details:
          "World to Come for righteous. Bodily resurrection when Messiah comes. Garden of Eden for souls.",
      },
      messiah: {
        summary: "Await human messiah from David's line",
        details:
          "Messiah will be human descendant of David. Will rebuild Temple, gather exiles, bring world peace.",
      },
      scripture: {
        summary: "Torah given literally by God to Moses",
        details:
          "Torah Mi-Sinai - Torah given verbatim at Sinai. Oral Torah equally authoritative. No changes permitted.",
      },
      originalsin: {
        summary: "Yetzer hara balanced by yetzer tov and Torah",
        details:
          "Both inclinations present from birth. Torah study and mitzvot strengthen the good inclination. No inherited guilt.",
      },
      prayer: {
        summary: "Three daily prayers; full Hebrew; men and women separate",
        details:
          "Complete traditional liturgy in Hebrew. Mechitza separates men and women. Minyan required for some prayers.",
      },
    },
  },
];

// Helper to build the tree structure
export function buildReligionTree(
  religions: Religion[]
): Map<string, Religion[]> {
  const childrenMap = new Map<string, Religion[]>();

  religions.forEach((religion) => {
    const parentId = religion.parentId || "root";
    if (!childrenMap.has(parentId)) {
      childrenMap.set(parentId, []);
    }
    childrenMap.get(parentId)!.push(religion);
  });

  return childrenMap;
}

// Get all ancestors of a religion
export function getAncestors(
  religionId: string,
  religions: Religion[]
): Religion[] {
  const religionMap = new Map(religions.map((r) => [r.id, r]));
  const ancestors: Religion[] = [];

  let current = religionMap.get(religionId);
  while (current?.parentId) {
    const parent = religionMap.get(current.parentId);
    if (parent) {
      ancestors.unshift(parent);
      current = parent;
    } else {
      break;
    }
  }

  return ancestors;
}
