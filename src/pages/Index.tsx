
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Play, 
  CheckCircle, 
  Star, 
  BookOpen, 
  Calendar, 
  Brain, 
  FileText, 
  Bell,
  TrendingUp,
  MessageCircle,
  Download,
  Menu,
  X,
  ChevronRight,
  Users,
  Award,
  Target,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isYearly, setIsYearly] = useState(false);

  const heroSlides = [
    {
      title: "AI Study Assistant",
      description: "Let AI create personalized study courses for any topic",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop"
    },
    {
      title: "Smart CV Builder",
      description: "Build professional CVs with our intelligent templates", 
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=600&fit=crop"
    },
    {
      title: "Campus Community",
      description: "Connect with fellow students across African universities",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Syllabus Navigator",
      description: "Navigate through your course syllabus with ease and track your progress"
    },
    {
      icon: Brain,
      title: "AI Study Assistant", 
      description: "Generate personalized study courses, quizzes, and flashcards using AI"
    },
    {
      icon: Calendar,
      title: "Schedule Manager",
      description: "Organize your academic schedule and never miss important dates"
    },
    {
      icon: FileText,
      title: "CV Builder",
      description: "Create professional CVs with our smart templates and AI suggestions"
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Get intelligent notifications for exams, assignments, and deadlines"
    },
    {
      icon: MessageCircle,
      title: "Campus Chatroom",
      description: "Connect and collaborate with students from your university"
    }
  ];

  const testimonials = [
    {
      name: "Adunni Olatunji",
      role: "Computer Science Student, University of Lagos",
      content: "CampusHut's AI study assistant helped me understand complex algorithms. It's like having a personal tutor!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5a1?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Kwame Asante",
      role: "Engineering Student, KNUST Ghana",
      content: "The CV builder feature got me my first internship. The templates are professional and ATS-friendly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Fatima Hassan",
      role: "Medical Student, University of Khartoum",
      content: "Managing my medical school schedule was chaos until I found CampusHut. Now everything is organized!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "Is CampusHut free to use?",
      answer: "Yes! CampusHut offers a robust free plan with essential features like task scheduling, campus news, and basic CV templates. Premium features are available for ₦1,500/month."
    },
    {
      question: "Can I use it on any smartphone?",
      answer: "Absolutely! CampusHut is available on both Android and iOS devices. You can download it from Google Play Store or Apple App Store."
    },
    {
      question: "How does the AI Study Assistant work?",
      answer: "Simply enter any topic you want to learn, and our AI will generate a comprehensive study course with lessons, quizzes, and flashcards tailored to your learning pace."
    },
    {
      question: "Do I need internet to use the app?",
      answer: "While some features require internet connectivity, many core features like your schedule, notes, and downloaded study materials work offline."
    },
    {
      question: "Is it only for university students?",
      answer: "While designed primarily for African university and polytechnic students, anyone pursuing higher education can benefit from CampusHut's features."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-campusGreen-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">CampusHut</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#about" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#pricing" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-700 hover:text-campusGreen-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
                  Download App
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">Features</a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">About</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">Pricing</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-campusGreen-600">Contact</a>
                <Button className="w-full mt-2 bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
                  Download App
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-campusGreen-50 via-white to-campusGreen-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Smart 
                <span className="text-campusGreen-600"> Campus</span> Companion
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                AI tools, study planners, CV builder & more — made specifically for African university students
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white px-8 py-4 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download on Play Store
                </Button>
                <Button variant="outline" className="border-campusGreen-600 text-campusGreen-600 hover:bg-campusGreen-50 px-8 py-4 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download on App Store
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-campusGreen-600" />
                  <span>50K+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-campusGreen-600" />
                  <span>4.8★ Rating</span>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 animate-slide-in-right">
              <div className="relative">
                <div className="w-80 h-96 mx-auto bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                    <img
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg">{heroSlides[currentSlide].title}</h3>
                      <p className="text-white/90 text-sm mt-1">{heroSlides[currentSlide].description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-campusGreen-500 text-white p-3 rounded-2xl animate-float">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-2xl animate-float" style={{ animationDelay: '1s' }}>
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Academic Success</h2>
            <p className="text-xl text-gray-600">Powerful tools designed specifically for African university students</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.slice(0, 4).map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-campusGreen-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-campusGreen-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-campusGreen-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering African Students with Smart Learning</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                CampusHut was born from the real challenges faced by African university students. We understand the struggle of scattered academic resources, limited access to study materials, and the need for better organization tools.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded by students, for students, our mission is to democratize access to quality educational tools and create a connected campus community across Africa.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-campusGreen-600">50K+</div>
                  <div className="text-gray-600">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-campusGreen-600">100+</div>
                  <div className="text-gray-600">Universities</div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
                  alt="African students collaborating"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-campusGreen-600/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Learning Tools</h2>
            <p className="text-xl text-gray-600">Discover all the features that make CampusHut your ultimate study companion</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-campusGreen-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-campusGreen-600 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-campusGreen-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-campusGreen-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How CampusHut Works</h2>
            <p className="text-xl text-gray-600">Get started in just a few simple steps</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {[
              { step: 1, title: "Download", description: "Get CampusHut from Play Store or App Store", icon: Smartphone },
              { step: 2, title: "Register", description: "Create your account with university details", icon: Users },
              { step: 3, title: "Choose Topic", description: "Select any subject or topic you want to study", icon: Target },
              { step: 4, title: "AI Magic", description: "Let AI generate personalized study courses", icon: Brain },
              { step: 5, title: "Learn & Grow", description: "Track progress and build your CV", icon: TrendingUp }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-campusGreen-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold shadow-lg">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                
                {index < 4 && (
                  <ChevronRight className="w-6 h-6 text-campusGreen-400 absolute top-8 -right-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Students Are Saying</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied students across Africa</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-campusGreen-50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gradient-to-br from-campusGreen-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 mb-8">Start free, upgrade when you're ready for premium features</p>
            
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-3 ${!isYearly ? 'text-campusGreen-600 font-semibold' : 'text-gray-600'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-campusGreen-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${isYearly ? 'text-campusGreen-600 font-semibold' : 'text-gray-600'}`}>
                Yearly <Badge variant="secondary" className="ml-1">Save 17%</Badge>
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">₦0</div>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Task Scheduler',
                    'Campus News',
                    'Assignment Reminder',
                    'Timetable Organizer',
                    'CV Library',
                    'Buy on Marketplace',
                    'Airtime & Data Purchase'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-campusGreen-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-campusGreen-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-campusGreen-500 text-white px-4 py-2">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h3>
                  <div className="text-4xl font-bold text-campusGreen-600 mb-2">
                    ₦{isYearly ? '12,500' : '1,500'}
                  </div>
                  <p className="text-gray-600">{isYearly ? 'per year' : 'per month'}</p>
                  {isYearly && <p className="text-sm text-campusGreen-600 font-semibold">Save ₦5,500 yearly!</p>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'All Free Features',
                    'e-Learning Courses',
                    'Study Assistance Tools',
                    'Internship & Job Opportunities',
                    'Focus Group & Discussions',
                    'Sell on Marketplace',
                    'Priority Support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-campusGreen-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 bg-gradient-to-r from-campusGreen-600 to-campusGreen-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Campus Experience?</h2>
          <p className="text-xl mb-8 text-campusGreen-100">Join over 50,000 students already using CampusHut</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button className="bg-white text-campusGreen-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download on Play Store
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-campusGreen-600 px-8 py-4 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download on App Store
            </Button>
          </div>

          <div className="bg-white p-6 rounded-2xl inline-block">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">QR Code</span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Scan to download</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about CampusHut</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg mb-4 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-campusGreen-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We'd love to hear from you</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <Input placeholder="Your full name" className="border-gray-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input type="email" placeholder="your.email@university.edu" className="border-gray-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <Textarea placeholder="Tell us how we can help..." rows={5} className="border-gray-300" />
                    </div>
                    <Button type="submit" className="w-full bg-campusGreen-600 hover:bg-campusGreen-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-campusGreen-600 mr-4" />
                    <span className="text-gray-700">support@campushut.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-campusGreen-600 mr-4" />
                    <span className="text-gray-700">+234 800 CAMPUS</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-campusGreen-600 mr-4" />
                    <span className="text-gray-700">Lagos, Nigeria</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-campusGreen-100 rounded-full flex items-center justify-center hover:bg-campusGreen-600 hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-campusGreen-100 rounded-full flex items-center justify-center hover:bg-campusGreen-600 hover:text-white transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-campusGreen-100 rounded-full flex items-center justify-center hover:bg-campusGreen-600 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="bg-campusGreen-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-2">Interested in Partnership?</h4>
                <p className="text-gray-600 mb-4">Join our growing network of university partners across Africa.</p>
                <Button variant="outline" className="border-campusGreen-600 text-campusGreen-600 hover:bg-campusGreen-600 hover:text-white">
                  Partner with Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-campusGreen-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">CampusHut</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering African students with smart learning tools and AI-powered study assistance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-campusGreen-400">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-campusGreen-400">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-campusGreen-400">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-campusGreen-400">Home</a></li>
                <li><a href="#about" className="hover:text-campusGreen-400">About</a></li>
                <li><a href="#features" className="hover:text-campusGreen-400">Features</a></li>
                <li><a href="#pricing" className="hover:text-campusGreen-400">Pricing</a></li>
                <li><a href="#contact" className="hover:text-campusGreen-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-campusGreen-400">AI Study Assistant</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">CV Builder</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">Schedule Manager</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">Campus News</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">Marketplace</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-campusGreen-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-campusGreen-400">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CampusHut. All rights reserved. Made with ❤️ for African students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
