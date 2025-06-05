
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
  };

  return (
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
  );
};

export default ContactSection;
