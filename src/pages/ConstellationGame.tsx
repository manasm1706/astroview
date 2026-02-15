import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Trophy, RotateCcw, ChevronRight, Star, Zap,
    Clock, Award, ArrowRight, Keyboard,
} from "lucide-react";
import { CardStack, type CardItem } from "../components/ui/card-stack";
import { Starfield } from "../components/Starfield";
import { cn } from "../lib/utils";
import introVideo from "../assets/game intro.webm";
import cardBackImg from "../assets/image.png";
import {
    ALL_CONSTELLATIONS, CORRECT_TO_PASS, TOTAL_LEVELS,
    getLevelConfig, getPoolForLevel, getNewForLevel, shuffle,
} from "../data/constellationData";
import './ConstellationGame.css';

/* ────────────────────────────── component ────────────── */
export default function ConstellationGame() {
    const [showIntro, setShowIntro] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    /* ── Explore state ── */
    const [exploreCards] = useState<CardItem[]>(() => shuffle(ALL_CONSTELLATIONS).slice(0, 10));
    const [activeIndex, setActiveIndex] = useState(0);

    /* ── Quiz / Level state ── */
    const [quizMode, setQuizMode] = useState(false);
    const [level, setLevel] = useState(1);
    const [streakInLevel, setStreakInLevel] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [answered, setAnswered] = useState<null | "correct" | "wrong">(null);
    const [options, setOptions] = useState<string[]>([]);
    const [showScorePop, setShowScorePop] = useState(false);

    /* ── Timer state ── */
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ── Hard mode typing ── */
    const [typedAnswer, setTypedAnswer] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    /* ── Overlays ── */
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showBadge, setShowBadge] = useState(false);

    /* ── Derived state ── */
    const levelConfig = getLevelConfig(level);
    const pool = getPoolForLevel(level);
    const quizCards = useRef<CardItem[]>(shuffle(getNewForLevel(level)));
    const [quizIndex, setQuizIndex] = useState(0);
    const activeCard = quizMode ? quizCards.current[quizIndex % quizCards.current.length] : exploreCards[activeIndex];

    /* ── Reshuffle quiz cards when level changes ── */
    useEffect(() => {
        quizCards.current = shuffle(getNewForLevel(level));
        setQuizIndex(0);
    }, [level]);

    /* ── Generate quiz options (wrong answers from full pool) ── */
    const generateOptions = useCallback(
        (correctTitle: string) => {
            const poolTitles = pool.map(c => c.title).filter(t => t !== correctTitle);
            const wrong = shuffle(poolTitles).slice(0, 3);
            return shuffle([correctTitle, ...wrong]);
        },
        [pool]
    );

    /* ── Prepare quiz round ── */
    useEffect(() => {
        if (quizMode && activeCard && !showLevelUp && !showBadge) {
            if (levelConfig.difficulty !== "hard") {
                setOptions(generateOptions(activeCard.title));
            }
            setAnswered(null);
            setTypedAnswer("");
            setTimeLeft(levelConfig.timerSeconds);
        }
    }, [quizMode, quizIndex, activeCard, generateOptions, levelConfig, showLevelUp, showBadge]);

    /* ── Timer countdown ── */
    useEffect(() => {
        if (!quizMode || answered || showLevelUp || showBadge) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Time's up — counts as wrong
                    clearInterval(timerRef.current!);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizMode, quizIndex, answered, showLevelUp, showBadge]);

    /* ── Focus input in hard mode ── */
    useEffect(() => {
        if (quizMode && levelConfig.difficulty === "hard" && inputRef.current && !answered) {
            inputRef.current.focus();
        }
    }, [quizMode, quizIndex, levelConfig.difficulty, answered]);

    /* ── Handle timeout ── */
    const handleTimeout = () => {
        setAnswered("wrong");
        setStreakInLevel(0);
        setTimeout(() => advanceQuiz(), 1200);
    };

    /* ── Handle guess (multiple choice) ── */
    const handleGuess = (option: string) => {
        if (answered) return;
        if (timerRef.current) clearInterval(timerRef.current);

        const correct = option.toLowerCase().trim() === activeCard.title.toLowerCase().trim();
        if (correct) {
            setTotalScore(s => s + 1);
            setShowScorePop(true);
            setTimeout(() => setShowScorePop(false), 400);
            const newStreak = streakInLevel + 1;
            setStreakInLevel(newStreak);
            setAnswered("correct");

            if (newStreak >= CORRECT_TO_PASS) {
                // Level complete!
                setTimeout(() => {
                    if (level >= TOTAL_LEVELS) {
                        setShowBadge(true);
                    } else {
                        setShowLevelUp(true);
                    }
                }, 800);
                return;
            }
        } else {
            setStreakInLevel(0);
            setAnswered("wrong");
        }

        setTimeout(() => advanceQuiz(), 1200);
    };

    /* ── Handle hard mode submit ── */
    const handleHardSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!typedAnswer.trim()) return;
        handleGuess(typedAnswer);
    };

    /* ── Advance to next quiz card ── */
    const advanceQuiz = () => {
        setQuizIndex(i => (i + 1) % quizCards.current.length);
    };

    /* ── Level up ── */
    const handleLevelUp = () => {
        setShowLevelUp(false);
        setLevel(l => l + 1);
        setStreakInLevel(0);
    };

    /* ── Restart ── */
    const handleRestart = () => {
        setQuizMode(false);
        setLevel(1);
        setStreakInLevel(0);
        setTotalScore(0);
        setAnswered(null);
        setShowBadge(false);
        setShowLevelUp(false);
        setTypedAnswer("");
    };

    /* ── Start quiz ── */
    const startQuiz = () => {
        quizCards.current = shuffle(getNewForLevel(level));
        setQuizIndex(0);
        setStreakInLevel(0);
        setTotalScore(0);
        setQuizMode(true);
    };

    const handleVideoEnd = () => setShowIntro(false);
    const skipIntro = () => {
        if (videoRef.current) videoRef.current.pause();
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

    /* ── Timer bar fraction ── */
    const timerFraction = quizMode ? timeLeft / levelConfig.timerSeconds : 1;
    const timerColor = timerFraction > 0.5 ? "#4ade80" : timerFraction > 0.25 ? "#fbbf24" : "#f87171";

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
                        <span>Star Game</span>
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h1 className="polaris-title">Polaris</h1>
                    {!quizMode && (
                        <p className="polaris-subtitle">
                            Explore the ancient constellations. Swipe through the cosmos.
                        </p>
                    )}
                </motion.div>

                {/* ── Level & Score panel (quiz mode) ── */}
                <AnimatePresence>
                    {quizMode && !showLevelUp && !showBadge && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="polaris-score-panel"
                        >
                            <div className="polaris-score-item">
                                <Star className="w-4 h-4" style={{ color: levelConfig.color }} />
                                <span className="polaris-score-label">Lv.{level}</span>
                                <span
                                    className="polaris-difficulty-badge"
                                    style={{ background: levelConfig.color + "22", color: levelConfig.color, borderColor: levelConfig.color + "44" }}
                                >
                                    {levelConfig.label}
                                    {levelConfig.difficulty === "hard" && <Keyboard className="w-3 h-3" />}
                                </span>
                            </div>
                            <div className="polaris-score-divider" />
                            <div className="polaris-score-item">
                                <Trophy className="w-4 h-4" style={{ color: '#fbbf24' }} />
                                <span className="polaris-score-label">Score</span>
                                <span className={cn("polaris-score-value", showScorePop && "score-pop")}>
                                    {totalScore}
                                </span>
                            </div>
                            <div className="polaris-score-divider" />
                            <div className="polaris-score-item">
                                <Zap className="w-4 h-4" style={{ color: '#fbbf24' }} />
                                <span className="polaris-score-label">Streak</span>
                                <span className="polaris-score-value">
                                    {streakInLevel}/{CORRECT_TO_PASS}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Timer bar ── */}
                <AnimatePresence>
                    {quizMode && !showLevelUp && !showBadge && !answered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="polaris-timer-bar-container"
                        >
                            <Clock className="w-3.5 h-3.5" style={{ color: timerColor }} />
                            <div className="polaris-timer-track">
                                <motion.div
                                    className="polaris-timer-fill"
                                    style={{ background: timerColor }}
                                    animate={{ width: `${timerFraction * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <span className="polaris-timer-text" style={{ color: timerColor }}>
                                {timeLeft}s
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Card Stack ── */}
                <div className="polaris-cards-area">
                    <CardStack
                        items={quizMode ? quizCards.current : exploreCards}
                        activeIndex={quizMode ? quizIndex % quizCards.current.length : activeIndex}
                        onActiveChange={(i) => {
                            if (!quizMode) setActiveIndex(i);
                        }}
                        autoAdvanceMs={quizMode ? 999999 : 2500}
                        cardBackImage={cardBackImg}
                    />
                </div>

                {/* ── Quiz options (Easy/Medium) ── */}
                <AnimatePresence>
                    {quizMode && levelConfig.difficulty !== "hard" && !showLevelUp && !showBadge && (
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
                                    const isAnswered = answered !== null;
                                    return (
                                        <motion.button
                                            key={opt}
                                            whileHover={!isAnswered ? { scale: 1.03 } : {}}
                                            whileTap={!isAnswered ? { scale: 0.97 } : {}}
                                            onClick={() => handleGuess(opt)}
                                            className={cn(
                                                "polaris-quiz-btn",
                                                isAnswered && isCorrect && "polaris-quiz-correct",
                                                isAnswered && !isCorrect && "polaris-quiz-wrong",
                                                !isAnswered && "polaris-quiz-default"
                                            )}
                                        >
                                            <Star
                                                className="w-4 h-4"
                                                style={{ color: isAnswered && isCorrect ? '#4ade80' : '#4a5eae' }}
                                            />
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Hard mode: type-in ── */}
                <AnimatePresence>
                    {quizMode && levelConfig.difficulty === "hard" && !showLevelUp && !showBadge && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="polaris-quiz-options"
                        >
                            <p className="polaris-quiz-question">
                                Type the constellation name:
                            </p>
                            {answered ? (
                                <div className={cn(
                                    "polaris-hard-result",
                                    answered === "correct" ? "polaris-hard-correct" : "polaris-hard-wrong"
                                )}>
                                    {answered === "correct"
                                        ? "✓ Correct!"
                                        : `✗ It was "${activeCard.title}"`}
                                </div>
                            ) : (
                                <form onSubmit={handleHardSubmit} className="polaris-hard-form">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={typedAnswer}
                                        onChange={(e) => setTypedAnswer(e.target.value)}
                                        placeholder="Enter constellation name..."
                                        className="polaris-hard-input"
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                    <button type="submit" className="polaris-action-btn polaris-submit-btn">
                                        <ArrowRight className="w-4 h-4" />
                                        Submit
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Controls ── */}
                {!showLevelUp && !showBadge && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="polaris-controls"
                    >
                        {!quizMode ? (
                            <button onClick={startQuiz} className="polaris-action-btn">
                                <Sparkles className="w-4 h-4" />
                                Start Challenge
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={handleRestart} className="polaris-action-btn polaris-exit-btn">
                                <RotateCcw className="w-4 h-4" />
                                Exit Quiz
                            </button>
                        )}
                    </motion.div>
                )}

                {/* ── Footer stats ── */}
                <div className="polaris-footer-stats">
                    <div className="polaris-footer-dot" />
                    {quizMode ? (
                        <>
                            <span>Level {level} / {TOTAL_LEVELS}</span>
                            <span className="polaris-footer-sep">•</span>
                            <span>Pool: {pool.length} constellations</span>
                        </>
                    ) : (
                        <>
                            <span>{activeIndex + 1} / {exploreCards.length}</span>
                            <span className="polaris-footer-sep">•</span>
                            <span>Swipe or click to explore</span>
                        </>
                    )}
                </div>
            </section>

            {/* ── Level Up Overlay ── */}
            <AnimatePresence>
                {showLevelUp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="polaris-overlay"
                    >
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="polaris-level-up-card"
                        >
                            <div className="polaris-level-up-stars">✦ ✦ ✦</div>
                            <h2 className="polaris-level-up-title">Level {level} Complete!</h2>
                            <p className="polaris-level-up-sub">
                                {level < TOTAL_LEVELS
                                    ? `Get ready for Level ${level + 1} — ${getLevelConfig(level + 1).label} difficulty`
                                    : "Final level awaits!"}
                            </p>
                            <div className="polaris-level-up-info">
                                <span>Pool expands to {Math.min((level + 1) * 10, 88)} constellations</span>
                            </div>
                            <button onClick={handleLevelUp} className="polaris-action-btn polaris-level-btn">
                                <ArrowRight className="w-4 h-4" />
                                Next Level
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Badge / Completion Overlay ── */}
            <AnimatePresence>
                {showBadge && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="polaris-overlay"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 150, damping: 18 }}
                            className="polaris-badge-card"
                        >
                            <div className="polaris-badge-trophy">
                                <Award className="w-16 h-16" style={{ color: '#fbbf24' }} />
                            </div>
                            <h2 className="polaris-badge-title">🌟 Constellation Master 🌟</h2>
                            <p className="polaris-badge-sub">
                                You identified all 88 constellations across {TOTAL_LEVELS} levels!
                            </p>
                            <div className="polaris-badge-stats">
                                <div className="polaris-badge-stat">
                                    <Trophy className="w-5 h-5" style={{ color: '#fbbf24' }} />
                                    <span>Total Score: {totalScore}</span>
                                </div>
                            </div>
                            <button onClick={handleRestart} className="polaris-action-btn polaris-level-btn">
                                <RotateCcw className="w-4 h-4" />
                                Play Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
