import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Confetti } from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Trophy,
  Flame,
  CheckCircle,
  Lock,
  Gift,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "explore";
  target: number;
  reward: number;
  link: string;
}

const DAILY_CHALLENGES: Challenge[] = [
  {
    id: "explore-chars",
    title: "Character Explorer",
    description: "View 10 character profiles",
    type: "explore",
    target: 10,
    reward: 40,
    link: "/characters"
  },
  {
    id: "explore-episodes",
    title: "Episode Explorer",
    description: "Browse through 15 episodes",
    type: "explore",
    target: 15,
    reward: 50,
    link: "/episodes"
  },
  {
    id: "explore-locations",
    title: "Location Scout",
    description: "Explore 5 Springfield locations",
    type: "explore",
    target: 5,
    reward: 35,
    link: "/locations"
  },
  {
    id: "add-favorites",
    title: "Collector",
    description: "Add 3 items to your favorites",
    type: "explore",
    target: 3,
    reward: 45,
    link: "/favorites"
  },
  {
    id: "compare-chars",
    title: "Comparison Expert",
    description: "Compare 2 characters",
    type: "explore",
    target: 1,
    reward: 30,
    link: "/compare"
  }
];

function getDailyChallenge(): Challenge {
  const today = new Date().toDateString();
  const seed = today.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return DAILY_CHALLENGES[seed % DAILY_CHALLENGES.length];
}

function getWeeklyChallenges(): Challenge[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const challenges: Challenge[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i);
    const seed = date.toDateString().split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    challenges.push(DAILY_CHALLENGES[seed % DAILY_CHALLENGES.length]);
  }
  
  return challenges;
}

export default function DailyChallenge() {
  const [dailyChallenge] = useState<Challenge>(getDailyChallenge);
  const [weeklyChallenges] = useState<Challenge[]>(getWeeklyChallenges);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    const saved = localStorage.getItem("simpsonspedia-completed-challenges");
    return saved ? JSON.parse(saved) : [];
  });
  const [totalPoints, setTotalPoints] = useState(() => {
    return parseInt(localStorage.getItem("simpsonspedia-challenge-points") || "0");
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("simpsonspedia-challenge-streak") || "0");
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const todayKey = `${dailyChallenge.id}-${today.toDateString()}`;
  const isCompleted = completedChallenges.includes(todayKey);

  const completeChallenge = () => {
    if (isCompleted) return;
    
    const newCompleted = [...completedChallenges, todayKey];
    setCompletedChallenges(newCompleted);
    localStorage.setItem("simpsonspedia-completed-challenges", JSON.stringify(newCompleted));
    
    const newPoints = totalPoints + dailyChallenge.reward;
    setTotalPoints(newPoints);
    localStorage.setItem("simpsonspedia-challenge-points", newPoints.toString());
    
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("simpsonspedia-challenge-streak", newStreak.toString());
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    toast.success(`+${dailyChallenge.reward} points! Streak: ${newStreak} days 🔥`);
  };

  // Calculate level
  const level = Math.floor(totalPoints / 500) + 1;
  const pointsToNextLevel = 500 - (totalPoints % 500);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Confetti isActive={showConfetti} />
      <PageTransition>
        <main className="container mx-auto px-4 py-8">
          <PageHeader
            title="Daily Challenge"
            subtitle="Complete daily challenges to earn points, build your streak, and unlock exclusive rewards"
            icon="🎯"
          />

          {/* Stats */}
          <div className="flex justify-center gap-4 md:gap-6 mb-8 flex-wrap">
            <div className="group text-center bg-card/80 backdrop-blur-sm rounded-3xl p-5 border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">{totalPoints}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
            <div className="group text-center bg-card/80 backdrop-blur-sm rounded-3xl p-5 border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-simpsons-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2",
                streak > 0 ? "bg-simpsons-orange/20" : "bg-muted"
              )}>
                <Flame className={cn(
                  "w-6 h-6",
                  streak > 0 ? "text-simpsons-orange" : "text-muted-foreground"
                )} />
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">{streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="group text-center bg-card/80 backdrop-blur-sm rounded-3xl p-5 border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">Lvl {level}</p>
              <p className="text-sm text-muted-foreground">{pointsToNextLevel} to next</p>
            </div>
          </div>

          {/* Today's Challenge */}
          <div className="max-w-xl mx-auto mb-12">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              Today's Challenge
            </h2>
            
            <div className={cn(
              "bg-card/80 backdrop-blur-sm rounded-3xl p-6 border-4 shadow-2xl transition-all relative overflow-hidden",
              isCompleted ? "border-simpsons-green" : "border-primary"
            )}>
              {/* Background decoration */}
              <div className={cn(
                "absolute inset-0 opacity-10",
                isCompleted ? "bg-gradient-to-br from-simpsons-green to-transparent" : "bg-gradient-to-br from-primary to-transparent"
              )} />
              {isCompleted ? (
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-simpsons-green/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-simpsons-green" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Challenge Completed! 🎉
                  </h3>
                  <p className="text-muted-foreground font-body mb-4">
                    Come back tomorrow for a new challenge!
                  </p>
                  <p className="text-simpsons-green font-heading text-lg">
                    +{dailyChallenge.reward} points earned
                  </p>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-4xl mb-2 block">🔍</span>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {dailyChallenge.title}
                      </h3>
                    </div>
                    <div className="bg-primary/20 px-4 py-2 rounded-full shadow-lg">
                      <span className="font-heading text-primary font-bold">+{dailyChallenge.reward} pts</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-body mb-6 text-lg">
                    {dailyChallenge.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button
                      asChild
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading rounded-full h-12 text-base shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link to={dailyChallenge.link}>
                        Start Challenge
                      </Link>
                    </Button>
                    <Button
                      onClick={completeChallenge}
                      variant="outline"
                      className="font-heading rounded-full h-12 border-2"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4">
              This Week
            </h2>
            
            <div className="grid grid-cols-7 gap-2">
              {weeklyChallenges.map((challenge, index) => {
                const date = new Date(today);
                date.setDate(today.getDate() - dayOfWeek + index);
                const key = `${challenge.id}-${date.toDateString()}`;
                const completed = completedChallenges.includes(key);
                const isToday = index === dayOfWeek;
                const isPast = index < dayOfWeek;
                const isFuture = index > dayOfWeek;
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "text-center p-3 rounded-xl border-2 transition-all",
                      isToday && "border-primary bg-primary/10",
                      completed && "border-simpsons-green bg-simpsons-green/10",
                      isPast && !completed && "border-destructive/50 bg-destructive/5",
                      isFuture && "border-border bg-muted/50"
                    )}
                  >
                    <p className="text-xs font-heading text-muted-foreground mb-1">
                      {dayNames[index]}
                    </p>
                    <div className="text-xl mb-1">
                      {completed ? "✅" :
                       isFuture ? <Lock className="w-5 h-5 mx-auto text-muted-foreground" /> :
                       isPast ? "❌" : "🔍"}
                    </div>
                    <p className="text-xs font-heading text-foreground">
                      {date.getDate()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rewards */}
          <div className="max-w-xl mx-auto mt-12">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-accent" />
              Rewards
            </h2>
            
            <div className="space-y-3">
              {[
                { level: 5, reward: "🥉 Bronze Fan Badge", points: 2500 },
                { level: 10, reward: "🥈 Silver Fan Badge", points: 5000 },
                { level: 20, reward: "🥇 Gold Fan Badge", points: 10000 },
                { level: 50, reward: "💎 Diamond Fan Badge", points: 25000 },
              ].map((tier) => (
                <div
                  key={tier.level}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2",
                    level >= tier.level
                      ? "border-simpsons-green bg-simpsons-green/10"
                      : "border-border bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tier.reward.split(" ")[0]}</span>
                    <div>
                      <p className="font-heading font-bold text-foreground">
                        {tier.reward.split(" ").slice(1).join(" ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Level {tier.level} • {tier.points.toLocaleString()} points
                      </p>
                    </div>
                  </div>
                  {level >= tier.level && (
                    <CheckCircle className="w-6 h-6 text-simpsons-green" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </PageTransition>
      <ScrollToTop />
    </div>
  );
}

