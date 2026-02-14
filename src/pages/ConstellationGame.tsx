import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, RotateCcw, ChevronRight, Star, Zap } from "lucide-react";
import { CardStack, type CardItem } from "../components/ui/card-stack";
import { Starfield } from "../components/Starfield";
import { cn } from "../lib/utils";
import introVideo from "../assets/game intro.webm";
import './ConstellationGame.css';

/* ─────────────────────────── constellation data ─────── */
const CONSTELLATIONS: CardItem[] = [
    {
        id: 1,
        title: "Orion",
        description:
            "Known as The Hunter, Orion is one of the most recognizable constellations visible from any point on Earth. Its belt of three stars guides the eyes across the winter sky.",
        image:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
    },
    {
        id: 2,
        title: "Andromeda",
        description:
            "Named after the mythical princess, Andromeda is home to the nearest large galaxy — the Andromeda Galaxy (M31), 2.5 million light-years away.",
        image:
            "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=600&q=80",
    },
    {
        id: 3,
        title: "Cassiopeia",
        description:
            "Recognizable by its distinctive W-shape, Cassiopeia circles the North Pole as a circumpolar constellation named after the vain queen of Ethiopia.",
        image:
            "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&q=80",
    },
    {
        id: 4,
        title: "Scorpius",
        description:
            "This zodiac constellation features the bright red supergiant Antares and is best visible in summer from the southern hemisphere. Its scorpion shape is unmistakable.",
        image:
            "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80",
    },
    {
        id: 5,
        title: "Ursa Major",
        description:
            "The Great Bear contains the Big Dipper asterism. It has been used for navigation for thousands of years and always points toward Polaris, the North Star.",
        image:
            "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80",
    },
    {
        id: 6,
        title: "Leo",
        description:
            "Named after the Nemean Lion from Greek mythology, Leo is a zodiac constellation whose brightest star Regulus shines at magnitude 1.4 in the spring sky.",
        image:
            "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&q=80",
    },
    {
        id: 7,
        title: "Cygnus",
        description:
            "The Swan soars through the Milky Way, its brightest star Deneb forming one corner of the Summer Triangle asterism with Vega and Altair.",
        image:
            "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600&q=80",
    },
    {
        id: 8,
        title: "Lyra",
        description:
            "This small constellation contains Vega — the fifth brightest star in the night sky and a cornerstone of the Summer Triangle.",
        image:
            "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&q=80",
    },
    {
        id: 9,
        title: "Aquarius",
        description:
            "The Water Bearer is one of the oldest recognized constellations. It hosts several fascinating deep-sky objects, including the Helix Nebula.",
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    },
    {
        id: 10,
        title: "Pegasus",
        description:
            "The Great Square of Pegasus dominates the autumn sky. This winged horse from mythology contains several exoplanet-hosting stars.",
        image:
            "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&q=80",
    },
];

/* ─────────────────────── shuffle utility ─────────────── */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* ────────────────────────────── component ────────────── */
export default function ConstellationGame() {
    const [showIntro, setShowIntro] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [cards] = useState<CardItem[]>(() => shuffle(CONSTELLATIONS));
    const [activeIndex, setActiveIndex] = useState(0);

    // Quiz state
    const [quizMode, setQuizMode] = useState(false);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState<number | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [streak, setStreak] = useState(0);
    const [showScorePop, setShowScorePop] = useState(false);

    const activeCard = cards[activeIndex];

    // Generate quiz options
    const generateOptions = useCallback(
        (correctTitle: string) => {
            const wrong = shuffle(
                cards.filter((c) => c.title !== correctTitle).map((c) => c.title)
            ).slice(0, 3);
            return shuffle([correctTitle, ...wrong]);
        },
        [cards]
    );

    // Prepare quiz when entering quiz mode or when active card changes
    useEffect(() => {
        if (quizMode && activeCard) {
            setOptions(generateOptions(activeCard.title));
            setAnswered(null);
        }
    }, [quizMode, activeIndex, activeCard, generateOptions]);

    const handleGuess = (option: string) => {
        if (answered !== null) return;
        const correct = option === activeCard.title;
        if (correct) {
            setScore((s) => s + 1);
            setStreak((s) => s + 1);
            setShowScorePop(true);
            setTimeout(() => setShowScorePop(false), 400);
        } else {
            setStreak(0);
        }
        setAnswered(correct ? 1 : 0);
        // Auto-advance after showing result
        setTimeout(() => {
            setActiveIndex((i) => (i + 1) % cards.length);
        }, 1200);
    };

    const handleVideoEnd = () => {
        setShowIntro(false);
    };

    const skipIntro = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setShowIntro(false);
    };

    /* ── Intro Video Screen ── */
    if (showIntro) {
        return (
            <div className="polaris-intro-screen">
                <video
                    ref={videoRef}
                    className="polaris-intro-video"
                    src={introVideo}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                />
                <button className="polaris-skip-btn" onClick={skipIntro}>
                    Skip Intro →
                </button>
            </div>
        );
    }

    /* ── Game Screen ── */
    return (
        <div className="constellation-game-page">
            <Starfield count={140} />

            <section className="polaris-game-section">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="polaris-header"
                >
                    <div className="polaris-badge">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Interactive Module</span>
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h1 className="polaris-title">
                        Constellation Explorer
                    </h1>
                    <p className="polaris-subtitle">
                        Discover the ancient patterns written in starlight. Swipe through the
                        cosmos and test your knowledge.
                    </p>
                </motion.div>

                {/* ── Score panel (quiz mode) ── */}
                <AnimatePresence>
                    {quizMode && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="polaris-score-panel"
                        >
                            <div className="polaris-score-item">
                                <Trophy className="w-4 h-4" style={{ color: '#fbbf24' }} />
                                <span className="polaris-score-label">Score</span>
                                <span className={cn("polaris-score-value", showScorePop && "score-pop")}>
                                    {score}
                                </span>
                            </div>
                            <div className="polaris-score-divider" />
                            <div className="polaris-score-item">
                                <Zap className="w-4 h-4" style={{ color: '#fbbf24' }} />
                                <span className="polaris-score-label">Streak</span>
                                <span className="polaris-score-value">
                                    {streak}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Card Stack ── */}
                <div className="polaris-cards-area">
                    <CardStack
                        items={cards}
                        activeIndex={activeIndex}
                        onActiveChange={(i) => {
                            if (!quizMode) setActiveIndex(i);
                        }}
                        autoAdvanceMs={quizMode ? 999999 : 2500}
                    />
                </div>

                {/* ── Quiz options ── */}
                <AnimatePresence>
                    {quizMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="polaris-quiz-options"
                        >
                            <p className="polaris-quiz-question">
                                Which constellation is shown?
                            </p>
                            <div className="polaris-quiz-grid">
                                {options.map((opt) => {
                                    const isCorrect = opt === activeCard.title;
                                    const isSelected = answered !== null;
                                    return (
                                        <motion.button
                                            key={opt}
                                            whileHover={!isSelected ? { scale: 1.03 } : {}}
                                            whileTap={!isSelected ? { scale: 0.97 } : {}}
                                            onClick={() => handleGuess(opt)}
                                            className={cn(
                                                "polaris-quiz-btn",
                                                isSelected && isCorrect && "polaris-quiz-correct",
                                                isSelected && !isCorrect && "polaris-quiz-wrong",
                                                !isSelected && "polaris-quiz-default"
                                            )}
                                        >
                                            <Star
                                                className="w-4 h-4"
                                                style={{ color: isSelected && isCorrect ? '#4ade80' : '#4a5eae' }}
                                            />
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Controls ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="polaris-controls"
                >
                    {!quizMode ? (
                        <button onClick={() => setQuizMode(true)} className="polaris-action-btn">
                            <Sparkles className="w-4 h-4" />
                            Guess the Constellation
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setQuizMode(false);
                                setScore(0);
                                setStreak(0);
                                setAnswered(null);
                            }}
                            className="polaris-action-btn polaris-exit-btn"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Exit Quiz
                        </button>
                    )}
                </motion.div>

                {/* ── Footer stats ── */}
                <div className="polaris-footer-stats">
                    <div className="polaris-footer-dot" />
                    <span>{activeIndex + 1} / {cards.length}</span>
                    <span className="polaris-footer-sep">•</span>
                    <span>Swipe or click to explore</span>
                </div>
            </section>
        </div>
    );
}
