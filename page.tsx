'use client'

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SelfAssessment } from "@/components/self-assessment"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { User } from "@supabase/supabase-js"
import {
  Heart,
  Sparkles,
  Users,
  AlertCircle,
  TrendingDown,
  Brain,
  BookOpen,
  Shield,
  ClipboardCheck,
  BarChart3,
  Wind,
  Phone,
  BookHeart,
  ArrowRight,
  Calendar,
  Eye,
  AlertTriangle
} from "lucide-react"

const moods = [
  { emoji: "😊", label: "Happy", score: 5 },
  { emoji: "🙂", label: "Good", score: 4 },
  { emoji: "😐", label: "Neutral", score: 3 },
  { emoji: "😟", label: "Anxious", score: 2 },
  { emoji: "😔", label: "Low", score: 1 },
]

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleMoodSelect = async (moodIndex: number) => {
    setSelectedMood(moodIndex)

    if (user) {
      const mood = moods[moodIndex]
      await supabase.from('mood_entries').insert({
        user_id: user.id,
        mood_score: mood.score,
        mood_label: mood.label,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onCollapsedChange={setSidebarCollapsed}
      />
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className={cn("transition-all duration-300", sidebarCollapsed ? "lg:ml-20" : "lg:ml-64")}>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--lavender)] via-background to-[var(--mint)]">
          {/* Decorative blurs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[var(--soft-pink)] opacity-40 blur-3xl" />
            <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-[var(--soft-blue)] opacity-40 blur-3xl" />
            <div className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full bg-[var(--mint)] opacity-50 blur-2xl" />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  A Safe Space for Students
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
                YouMatter <br />
                <span className="block text-primary text-xl md:text-xl lg:text-2xl mt-2 max-w-[600px] mx-auto">Mental Health Support Hub</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                A Safe Digital Space for Students to Understand, Track, and Support Their Mental Well-Being.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                  onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-2 hover:bg-card/50 transition-all"
                  onClick={() => document.getElementById('why-matters')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="mb-1">By Team CodeHeist</p>
                <p className="text-xs">Avni Gupta, Satakshi Tiwari, Bhoomi Chaudhary</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </section>

        {/* Why Mental Health Matters */}
        <section id="why-matters" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Mental Health Matters</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Mental health is extremely important for students. Understanding and addressing mental wellness can transform academic success, relationships, and overall well-being.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Users, stat: "1 in 5", desc: "Students experience mental health challenges", color: "var(--lavender)" },
                { icon: AlertCircle, stat: "75%", desc: "Of students are unaware of stress levels", color: "var(--mint)" },
                { icon: TrendingDown, stat: "40%", desc: "Experience impact on academic performance", color: "var(--soft-pink)" },
                { icon: Brain, stat: "60%", desc: "Don't know where to seek help", color: "var(--soft-blue)" },
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: item.color }}
                    >
                      <item.icon className="w-7 h-7 text-foreground/80" />
                    </div>
                    <p className="text-3xl font-bold text-primary mb-2">{item.stat}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--lavender)] to-[var(--soft-pink)]">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Poor mental health can impact:</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {["Academic Performance", "Focus & Concentration", "Relationships", "Overall Well-being"].map((item) => (
                      <span key={item} className="px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-foreground/80">Our goal is to raise awareness and encourage students to check their mental well-being.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-24 bg-gradient-to-br from-[var(--mint)] via-background to-[var(--lavender)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border text-sm text-muted-foreground mb-4">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Vision - A Safe Space for All Users</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg text-muted-foreground mb-8 text-center">We aim to create a friendly and supportive platform where users can:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: Heart, text: "Check their mental well-being" },
                      { icon: BookOpen, text: "Track their daily emotions" },
                      { icon: Sparkles, text: "Learn coping techniques" },
                      { icon: Shield, text: "Access verified mental health resources" },
                      { icon: Users, text: "Feel part of a supportive community" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[var(--lavender)]/30 to-transparent hover:from-[var(--lavender)]/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-[var(--soft-pink)]/30 via-[var(--lavender)]/30 to-[var(--mint)]/30">
                    <p className="text-foreground font-medium">
                      The platform promotes <span className="text-primary">self-awareness</span>, <span className="text-primary">emotional safety</span>, and <span className="text-primary">mental wellness</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">Core Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tools for Your Mental Wellness</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Comprehensive features designed to support every aspect of your mental health journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: ClipboardCheck, title: "Mental Health Self-Assessment", desc: "A simple questionnaire to understand your mental state and recognize stress, anxiety, or emotional struggles.", gradient: "from-[var(--lavender)] to-[var(--soft-pink)]", scrollId: "assessment" },
                { icon: BarChart3, title: "Daily Mood Tracker", desc: "Log your mood daily with emoji selections and track emotional patterns over time with visual charts.", gradient: "from-[var(--mint)] to-[var(--soft-blue)]", scrollId: "mood-tracker" },
                { icon: Wind, title: "Instant Calm Toolkit", desc: "Quick-access breathing exercises, grounding techniques, and stress-relief methods for anxious moments.", gradient: "from-[var(--soft-blue)] to-[var(--lavender)]", scrollId: "calm-toolkit" },
                { icon: Phone, title: "Emergency Support & Helplines", desc: "Verified mental health support contacts including the Kiran Mental Health Helpline for professional help.", gradient: "from-[var(--soft-pink)] to-[var(--mint)]", scrollId: "helplines" },
                { icon: BookHeart, title: "Anonymous Journal", desc: "A private, password-protected space to write your thoughts and encourage self-reflection safely.", gradient: "from-[var(--beige)] to-[var(--lavender)]", scrollId: "journal" },
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${feature.gradient}`} />
                  <CardHeader className="pb-2">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.desc}</p>
                    <button 
                      onClick={() => {
                        const element = document.getElementById(feature.scrollId)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="inline-flex items-center text-primary hover:text-primary/80 group/btn transition-colors"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Self-Assessment */}
        <section id="assessment">
          <SelfAssessment userId={user?.id} isLoggedIn={!!user} />
        </section>

        {/* Mood Tracker */}
        <section id="mood-tracker" className="py-24 bg-gradient-to-br from-[var(--mint)] via-background to-[var(--lavender)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-sm text-foreground font-medium mb-4">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Daily Mood Tracker
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Are You Feeling Today?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Track your emotional journey by logging your mood daily. Mindful awareness helps build emotional wellness.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-[var(--mint)] to-[var(--soft-blue)] p-6">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-5 h-5" />
                    {"Log Today's Mood"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground mb-6">{"Select how you're feeling:"}</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {moods.map((mood, index) => (
                      <button
                        key={index}
                        onClick={() => handleMoodSelect(index)}
                        className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${selectedMood === index
                          ? "bg-primary/20 ring-2 ring-primary scale-105"
                          : "bg-muted/50 hover:bg-muted"
                          }`}
                      >
                        <span className="text-4xl mb-2">{mood.emoji}</span>
                        <span className="text-xs text-muted-foreground">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                  {selectedMood !== null && (
                    <p className="text-center mt-4 text-sm text-primary">
                      {user ? "Mood logged! Check your profile for insights." : "Sign in to save your mood history."}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-[var(--lavender)] to-[var(--soft-pink)] p-6">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BarChart3 className="w-5 h-5" />
                    Your Mood Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center text-center">
                    <div>
                      <BarChart3 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      {user ? (
                        <p className="text-muted-foreground">
                          <Link href="/profile" className="text-primary hover:underline">View your mood patterns</Link> in your profile.
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          <Link href="/auth/sign-up" className="text-primary hover:underline">Sign up</Link> to track your mood patterns over time.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calm Toolkit */}
        <section id="calm-toolkit" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--soft-blue)] text-sm text-foreground font-medium mb-4">
                <Wind className="w-4 h-4 inline mr-2" />
                Instant Calm Toolkit
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Your Calm</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Quick-access tools to help you calm down during stressful moments.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Wind, title: "Breathing Exercise", desc: "1-minute animated breathing", gradient: "from-[var(--soft-blue)] to-[var(--lavender)]" },
                  { icon: Eye, title: "Grounding Exercise", desc: "Sensory awareness technique", gradient: "from-[var(--mint)] to-[var(--soft-blue)]" },
                  { icon: Sparkles, title: "Quick Techniques", desc: "Stress-relief methods", gradient: "from-[var(--soft-pink)] to-[var(--lavender)]" },
                ].map((tool, index) => (
                  <button
                    key={index}
                    className="p-6 rounded-2xl text-left transition-all duration-200 bg-muted/50 hover:bg-muted"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4`}>
                      <tool.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </button>
                ))}
              </div>

              <div className="text-center p-12 rounded-3xl bg-muted/30">
                <Wind className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Select a tool above to begin</p>
              </div>
            </div>
          </div>
        </section>

        {/* Journal Section */}
        <section id="journal" className="py-24 bg-gradient-to-br from-[var(--beige)] via-background to-[var(--lavender)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-sm text-foreground font-medium mb-4">
                <BookHeart className="w-4 h-4 inline mr-2" />
                Personal Journal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Express Your Thoughts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">A private space to write your thoughts, feelings, and reflections. Journaling promotes self-awareness and emotional processing.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--beige)] to-[var(--lavender)] rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <BookHeart className="w-10 h-10 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Start Journaling</h3>
                  <p className="text-muted-foreground mb-6">Your journal entries are private and secure. Only you can access them.</p>
                  {user ? (
                    <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90" asChild>
                      <Link href="/profile">
                        Go to My Journal
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90" asChild>
                      <Link href="/auth/sign-up">
                        Sign Up to Start
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Helplines */}
        <section id="helplines" className="py-24 bg-gradient-to-br from-[var(--soft-pink)] via-background to-[var(--lavender)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-sm text-foreground font-medium mb-4">
                <Phone className="w-4 h-4 inline mr-2" />
                Emergency Support
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Help is Always Available</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Verified mental health support contacts. Remember, reaching out is a sign of strength.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Crisis Warning */}
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">If You Are in Crisis</h3>
                      <p className="text-muted-foreground text-sm">If you or someone you know is in immediate danger, please call emergency services (112) or go to your nearest hospital emergency room.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Helpline Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { name: "Kiran Mental Health Helpline", hours: "24/7", desc: "24/7 toll-free mental health support by Ministry of Health", phone: "1800-599-0019", gradient: "from-[var(--lavender)] to-[var(--soft-pink)]" },
                  { name: "iCall Psychosocial Helpline", hours: "Mon-Sat, 8am-10pm", desc: "Professional counseling support for students", phone: "9152987821", gradient: "from-[var(--mint)] to-[var(--soft-blue)]" },
                  { name: "Vandrevala Foundation", hours: "24/7", desc: "Free professional mental health counseling", phone: "1860-2662-345", gradient: "from-[var(--soft-blue)] to-[var(--lavender)]" },
                  { name: "NIMHANS Helpline", hours: "24/7", desc: "National Institute of Mental Health support", phone: "080-46110007", gradient: "from-[var(--soft-pink)] to-[var(--mint)]" },
                ].map((helpline, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${helpline.gradient}`} />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-foreground">{helpline.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{helpline.hours}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{helpline.desc}</p>
                      <Button className={`rounded-full bg-gradient-to-r ${helpline.gradient} hover:opacity-90 text-foreground w-full`}>
                        <Phone className="w-4 h-4 mr-2" />
                        {helpline.phone}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Remember Card */}
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--mint)] to-[var(--soft-blue)]">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-foreground" />
                    <h3 className="text-xl font-bold text-foreground">Remember</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Remember: It is okay to ask for help",
                      "You are not alone in this",
                      "Professional support is always available",
                      "Take things one step at a time"
                    ].map((text, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-card/50">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <p className="text-sm text-foreground">{text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-card border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Mental Health Support Hub</span>
            </div>
            <p className="text-muted-foreground mb-2">A Safe Digital Space for Students</p>
            <p className="text-sm text-muted-foreground">By Team CodeHeist - Avni Gupta, Satakshi Tiwari, Bhoomi Chaudhary</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
