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
    },
  },
  {
    id: "protestant",
    name: "Protestant",
    parentId: "christianity",
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
