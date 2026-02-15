import type { CardItem } from "../components/ui/card-stack";

/**
 * 88 IAU constellations organized into 9 levels.
 * Level 1–3: Popular/well-known constellations (Easy)
 * Level 4–6: Moderately known (Medium)
 * Level 7–9: Obscure/difficult (Hard)
 *
 * Each level introduces exactly 10 new constellations (level 9 has 8).
 * The quiz pool for a level = all constellations from level 1 up to that level.
 */

/* ── Level definitions ── */
const LEVEL_1: CardItem[] = [
    { id: 1, title: "Orion", description: "The greatest hunter standing fearless among stars.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Orion_IAU.svg" },
    { id: 2, title: "Ursa Major", description: "The legendary Great Bear guiding explorers.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ursa_Major_IAU.svg" },
    { id: 3, title: "Scorpius", description: "A deadly cosmic scorpion guarding ancient secrets.", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Scorpius_IAU.svg" },
    { id: 4, title: "Leo", description: "The fearless lion roaring across the galaxy.", image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Leo_IAU.svg" },
    { id: 5, title: "Cassiopeia", description: "The proud queen sits upon her throne in the sky.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Cassiopeia_IAU.svg" },
    { id: 6, title: "Gemini", description: "The immortal twins standing side by side forever.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Gemini_IAU.svg" },
    { id: 7, title: "Taurus", description: "A powerful bull charging through space.", image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Taurus_IAU.svg" },
    { id: 8, title: "Pegasus", description: "The legendary winged horse soaring endlessly.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Pegasus_IAU.svg" },
    { id: 9, title: "Cygnus", description: "The graceful swan gliding across the Milky Way.", image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Cygnus_IAU.svg" },
    { id: 10, title: "Aquarius", description: "The cosmic water bearer pours streams of stardust across the universe.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Aquarius_IAU.svg" },
];

const LEVEL_2: CardItem[] = [
    { id: 11, title: "Andromeda", description: "A brave princess chained to the stars — find her before the cosmic sea monster does.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Andromeda_IAU.svg" },
    { id: 12, title: "Aries", description: "The fearless ram charges headfirst into the darkness of space.", image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Aries_IAU.svg" },
    { id: 13, title: "Sagittarius", description: "The legendary archer aiming at the galaxy center.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Sagittarius_IAU.svg" },
    { id: 14, title: "Pisces", description: "Two cosmic fish swimming through infinity.", image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Pisces_IAU.svg" },
    { id: 15, title: "Virgo", description: "The cosmic maiden guarding galaxy clusters.", image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Virgo_IAU.svg" },
    { id: 16, title: "Libra", description: "The cosmic scales balancing light and darkness.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Libra_IAU.svg" },
    { id: 17, title: "Capricornus", description: "The sea goat climbs from cosmic oceans into starry heights.", image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Capricornus_IAU.svg" },
    { id: 18, title: "Cancer", description: "The cosmic crab moves sideways through the galaxy, hiding secrets.", image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Cancer_IAU.svg" },
    { id: 19, title: "Draco", description: "A massive dragon winding between constellations.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Draco_IAU.svg" },
    { id: 20, title: "Lyra", description: "A celestial harp playing music across the stars.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Lyra_IAU.svg" },
];

const LEVEL_3: CardItem[] = [
    { id: 21, title: "Canis Major", description: "Home of Sirius — the brightest star guiding space explorers.", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Canis_Major_IAU.svg" },
    { id: 22, title: "Perseus", description: "The brave hero frozen forever in victory.", image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Perseus_IAU.svg" },
    { id: 23, title: "Hercules", description: "The strongest hero ever written in the stars.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Hercules_IAU.svg" },
    { id: 24, title: "Ursa Minor", description: "Home of Polaris, the North Star.", image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Ursa_Minor_IAU.svg" },
    { id: 25, title: "Aquila", description: "A powerful eagle flying across the Milky Way — its wings guard ancient secrets.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Aquila_IAU.svg" },
    { id: 26, title: "Ophiuchus", description: "The legendary serpent bearer mastering cosmic forces.", image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Ophiuchus_IAU.svg" },
    { id: 27, title: "Centaurus", description: "A mighty centaur warrior guarding southern skies.", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Centaurus_IAU.svg" },
    { id: 28, title: "Crux", description: "The legendary Southern Cross guiding lost explorers.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Crux_IAU.svg" },
    { id: 29, title: "Bootes", description: "The great celestial guardian watches silently over the northern skies.", image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Bootes_IAU.svg" },
    { id: 30, title: "Canis Minor", description: "A small but loyal cosmic companion glowing in the void.", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Canis_Minor_IAU.svg" },
];

const LEVEL_4: CardItem[] = [
    { id: 31, title: "Cepheus", description: "A wise king whose stars guide cosmic travelers.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Cepheus_IAU.svg" },
    { id: 32, title: "Auriga", description: "The cosmic charioteer races across the stars with unmatched speed.", image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Auriga_IAU.svg" },
    { id: 33, title: "Eridanus", description: "A cosmic river flowing endlessly across the universe.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Eridanus_IAU.svg" },
    { id: 34, title: "Cetus", description: "A massive sea monster lurking in the cosmic ocean.", image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Cetus_IAU.svg" },
    { id: 35, title: "Phoenix", description: "A cosmic firebird reborn from starlight.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Phoenix_IAU.svg" },
    { id: 36, title: "Hydra", description: "The largest cosmic serpent stretching across the heavens.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Hydra_IAU.svg" },
    { id: 37, title: "Lupus", description: "A fierce wolf prowling silently through the night sky.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Lupus_IAU.svg" },
    { id: 38, title: "Corvus", description: "A clever cosmic raven watching silently.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Corvus_IAU.svg" },
    { id: 39, title: "Lepus", description: "A cosmic hare racing beneath Orion's feet.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Lepus_IAU.svg" },
    { id: 40, title: "Corona Borealis", description: "The northern crown worn by celestial royalty.", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Corona_Borealis_IAU.svg" },
];

const LEVEL_5: CardItem[] = [
    { id: 41, title: "Delphinus", description: "A friendly cosmic dolphin leaping through stars.", image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Delphinus_IAU.svg" },
    { id: 42, title: "Serpens", description: "A cosmic serpent split between two worlds.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Serpens_IAU.svg" },
    { id: 43, title: "Crater", description: "A sacred cosmic cup filled with ancient starlight.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Crater_IAU.svg" },
    { id: 44, title: "Monoceros", description: "A magical unicorn wandering through the Milky Way.", image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Monoceros_IAU.svg" },
    { id: 45, title: "Carina", description: "The keel of a great cosmic ship drifting through deep space.", image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Carina_IAU.svg" },
    { id: 46, title: "Vela", description: "The cosmic ship sails across endless space.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Vela_IAU.svg" },
    { id: 47, title: "Puppis", description: "A cosmic ship sailing star oceans.", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Puppis_IAU.svg" },
    { id: 48, title: "Ara", description: "An ancient altar where the gods once watched over the cosmos.", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Ara_IAU.svg" },
    { id: 49, title: "Pavo", description: "A majestic cosmic peacock displaying its feathers.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pavo_IAU.svg" },
    { id: 50, title: "Grus", description: "A cosmic crane soaring gracefully.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Grus_IAU.svg" },
];

const LEVEL_6: CardItem[] = [
    { id: 51, title: "Coma Berenices", description: "The flowing hair of a queen turned into starlight.", image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Coma_Berenices_IAU.svg" },
    { id: 52, title: "Canes Venatici", description: "The hunter's loyal dogs chase cosmic prey across the stars.", image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Canes_Venatici_IAU.svg" },
    { id: 53, title: "Lynx", description: "A faint cosmic hunter only visible to sharp eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Lynx_IAU.svg" },
    { id: 54, title: "Sagitta", description: "A cosmic arrow flying forever.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sagitta_IAU.svg" },
    { id: 55, title: "Triangulum", description: "A glowing cosmic triangle hiding galaxies.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Triangulum_IAU.svg" },
    { id: 56, title: "Scutum", description: "A cosmic shield protecting the heavens.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Scutum_IAU.svg" },
    { id: 57, title: "Equuleus", description: "A small celestial horse racing across the sky.", image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Equuleus_IAU.svg" },
    { id: 58, title: "Vulpecula", description: "A clever cosmic fox hiding in the Milky Way.", image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Vulpecula_IAU.svg" },
    { id: 59, title: "Lacerta", description: "A stealthy cosmic lizard hiding in plain sight.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Lacerta_IAU.svg" },
    { id: 60, title: "Sextans", description: "A cosmic measuring tool for star distances.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sextans_IAU.svg" },
];

const LEVEL_7: CardItem[] = [
    { id: 61, title: "Leo Minor", description: "A smaller lion cub following its celestial king.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Leo_Minor_IAU.svg" },
    { id: 62, title: "Camelopardalis", description: "A cosmic giraffe stretching across the infinite darkness.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Camelopardalis_IAU.svg" },
    { id: 63, title: "Fornax", description: "A furnace burning with ancient cosmic fire.", image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Fornax_IAU.svg" },
    { id: 64, title: "Sculptor", description: "A cosmic artist shaping the universe.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Sculptor_IAU.svg" },
    { id: 65, title: "Columba", description: "A peaceful cosmic dove flying between galaxies.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Columba_IAU.svg" },
    { id: 66, title: "Horologium", description: "A cosmic clock ticking since the birth of the universe.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Horologium_IAU.svg" },
    { id: 67, title: "Pictor", description: "A cosmic painter creating galaxies.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pictor_IAU.svg" },
    { id: 68, title: "Caelum", description: "A celestial sculptor's chisel, carving stories into space.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Caelum_IAU.svg" },
    { id: 69, title: "Dorado", description: "A golden cosmic fish shimmering in deep space.", image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Dorado_IAU.svg" },
    { id: 70, title: "Piscis Austrinus", description: "A southern cosmic fish glowing brightly.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Piscis_Austrinus_IAU.svg" },
];

const LEVEL_8: CardItem[] = [
    { id: 71, title: "Reticulum", description: "A cosmic net capturing starlight.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Reticulum_IAU.svg" },
    { id: 72, title: "Pyxis", description: "A cosmic compass guiding lost explorers.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Pyxis_IAU.svg" },
    { id: 73, title: "Antlia", description: "The mysterious air pump floats silently in deep space.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Antlia_IAU.svg" },
    { id: 74, title: "Corona Australis", description: "A glowing crown hidden deep in southern space.", image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Corona_Australis_IAU.svg" },
    { id: 75, title: "Microscopium", description: "A cosmic microscope revealing hidden star secrets.", image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Microscopium_IAU.svg" },
    { id: 76, title: "Telescopium", description: "A cosmic telescope watching distant galaxies.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Telescopium_IAU.svg" },
    { id: 77, title: "Norma", description: "A precise cosmic tool measuring the universe.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Norma_IAU.svg" },
    { id: 78, title: "Circinus", description: "A celestial compass drawing perfect circles in space.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circinus_IAU.svg" },
    { id: 79, title: "Indus", description: "A mysterious cosmic traveler from ancient worlds.", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Indus_IAU.svg" },
    { id: 80, title: "Tucana", description: "A tropical cosmic bird flying far south.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Tucana_IAU.svg" },
];

const LEVEL_9: CardItem[] = [
    { id: 81, title: "Chamaeleon", description: "A cosmic shape-shifter blending into the darkness.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Chamaeleon_IAU.svg" },
    { id: 82, title: "Musca", description: "A tiny cosmic fly buzzing through space.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Musca_IAU.svg" },
    { id: 83, title: "Apus", description: "A celestial bird soaring endlessly through the southern skies.", image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Apus_IAU.svg" },
    { id: 84, title: "Octans", description: "Home of the southern pole star guiding explorers.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Octans_IAU.svg" },
    { id: 85, title: "Hydrus", description: "A smaller but swift cosmic water snake.", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Hydrus_IAU.svg" },
    { id: 86, title: "Mensa", description: "A cosmic table beneath the southern skies.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mensa_IAU.svg" },
    { id: 87, title: "Volans", description: "A flying cosmic fish gliding through stars.", image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Volans_IAU.svg" },
    { id: 88, title: "Triangulum Australe", description: "A southern triangle shining brightly.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Triangulum_Australe_IAU.svg" },
];

/** All levels in order — index 0 = Level 1, index 8 = Level 9 */
export const LEVELS: CardItem[][] = [
    LEVEL_1, LEVEL_2, LEVEL_3,
    LEVEL_4, LEVEL_5, LEVEL_6,
    LEVEL_7, LEVEL_8, LEVEL_9,
];

/** Flat list of all 88 constellations */
export const ALL_CONSTELLATIONS: CardItem[] = LEVELS.flat();

/* ── Game constants ── */
export const CONSTELLATIONS_PER_LEVEL = 10;
export const CORRECT_TO_PASS = 10;
export const TOTAL_LEVELS = LEVELS.length; // 9

export type Difficulty = "easy" | "medium" | "hard";

export interface LevelConfig {
    difficulty: Difficulty;
    timerSeconds: number;
    label: string;
    color: string;
}

/** Returns the difficulty config for a given level (1-indexed) */
export function getLevelConfig(level: number): LevelConfig {
    if (level <= 3) return { difficulty: "easy", timerSeconds: 15, label: "Easy", color: "#4ade80" };
    if (level <= 6) return { difficulty: "medium", timerSeconds: 8, label: "Medium", color: "#fbbf24" };
    return { difficulty: "hard", timerSeconds: 12, label: "Hard", color: "#f87171" };
}

/**
 * Returns the constellation pool for a given level (1-indexed).
 * Pool includes all constellations from level 1 through the given level.
 */
export function getPoolForLevel(level: number): CardItem[] {
    return LEVELS.slice(0, level).flat();
}

/**
 * Returns ONLY the new constellations introduced at a given level (1-indexed).
 * These are the ones the player must identify in this level's rounds.
 */
export function getNewForLevel(level: number): CardItem[] {
    return LEVELS[level - 1] ?? [];
}

/** Shuffle utility */
export function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
