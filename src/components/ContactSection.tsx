import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import axios from "axios";

const ContactSection = () => {
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  // Google Apps Script web app URL
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwsvCns420DA7NQnGeiXIeGTXgnlR3FDz-Gjh8UzWUtiELUzNydCT4nVVTnoKsTfA6hog/exec";

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  // const handleContactSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     console.log("Sending form data:", contactForm);

  //     const response = await axios.post(GOOGLE_SCRIPT_URL, contactForm, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log("Response received:", response);
  //     console.log("Response data:", response.data);

  //     if (response.data.success) {
  //       toast({
  //         title: "Message sent!",
  //         description:
  //           "Thank you for your message. We'll get back to you soon.",
  //       });
  //       setContactForm({ name: "", email: "", message: "" });
  //     } else {
  //       throw new Error(response.data.message || "Failed to send message");
  //     }
  //   } catch (error) {
  //     console.error("Contact form error:", error);
  //     console.error("Error response:", (error).response);
  //     console.error("Error message:", (error).message);

  //     toast({
  //       title: "Error",
  //       description: "Failed to send message. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  //

  // const handleContactSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     console.log("Sending form data:", contactForm);

  //     // Use fetch instead of axios for better CORS handling
  //     const response = await fetch(GOOGLE_SCRIPT_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(contactForm),
  //       // Add these for better CORS handling
  //       mode: 'cors',
  //       credentials: 'omit'
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Response data:", data);

  //     if (data.success) {
  //       toast({
  //         title: "Message sent!",
  //         description: "Thank you for your message. We'll get back to you soon.",
  //       });
  //       setContactForm({ name: "", email: "", message: "" });
  //     } else {
  //       throw new Error(data.message || "Failed to send message");
  //     }
  //   } catch (error) {
  //     console.error("Contact form error:", error);

  //     toast({
  //       title: "Error",
  //       description: "Failed to send message. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("type", "contact");
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("message", contactForm.message);
      console.log("formdata=", formData);
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });
      console.log("response=", response);
      const text = await response.text();
      console.log("text==", text);
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: true };
      }
      if (data.success) {
        toast({
          title: "Message sent!",
          description:
            "Thank you for your message. We'll get back to you soon.",
        });
        setContactForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePartnerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPartnerForm({ ...partnerForm, [e.target.name]: e.target.value });
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("type", "partnership");
      formData.append("name", partnerForm.name);
      formData.append("company", partnerForm.company);
      formData.append("email", partnerForm.email);
      formData.append("phone", partnerForm.phone);
      formData.append("message", partnerForm.message);
      console.log(formData);
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });
      console.log(response);
      const text = await response.text();
      console.log("text==", text);
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: true };
      }
      if (data.success) {
        toast({
          title: "Partnership Request Sent!",
          description:
            "Thank you for your interest in partnering with us. We'll reach out soon.",
        });
        setPartnerOpen(false);
        setPartnerForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description:
            data.message ||
            "Failed to send partnership request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Sending Request",
        description:
          error.message || "Unable to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600" data-aos="fade-up">
            Have questions? We'd love to hear from you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="border-0 shadow-lg" data-aos="zoom-out-right">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Your full name"
                      className="border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="your.email@gmail.com"
                      className="border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="border-gray-300"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-campusGreen-600 hover:bg-campusGreen-700 text-white disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div data-aos="zoom-out-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-campusGreen-600 mr-4" />
                  <span className="text-gray-700">hello@mycampushut.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-campusGreen-600 mr-4" />
                  <span className="text-gray-700">+2347030250057</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-8 h-8 text-campusGreen-600 mr-4" />
                  <span className="text-gray-700">
                    The Philippi Centre, Oluwalogbon House, Plot A Obafemi
                    Awolowo Way, Alausa Ikeja, Lagos.
                  </span>
                </div>
              </div>
            </div>

            <div data-aos="zoom-out-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/campushut_?igsh=MWs1ZTVtZ29hdGg5cQ"
                  target="_blank"
                  className="w-12 h-12 bg-campusGreen-100 rounded-full flex items-center justify-center hover:bg-campusGreen-600 hover:text-white transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/share/1BnLaYDnEd/"
                  target="_blank"
                  className="w-12 h-12 bg-campusGreen-100 rounded-full flex items-center justify-center hover:bg-campusGreen-600 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/campushut-limited/"
                  target="_blank"
                  className="w-12 h-12 bg-campusGreen-100 rounded-full flex items-center justify-center hover:bg-campusGreen-600 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div
              className="bg-campusGreen-600 p-6 rounded-2xl"
              data-aos="zoom-out-left"
            >
              <h4 className="font-bold text-gray-50 mb-2 text-lg">
                Interested in Partnership?
              </h4>
              <p className="text-gray-50 mb-4">
                Join our growing network of partners across Africa.
              </p>
              <Button
                variant="outline"
                className="border-campusGreen-600 text-campusGreen-600 hover:bg-gray-100 hover:text-black font-semibold"
                onClick={() => setPartnerOpen(true)}
              >
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={partnerOpen} onOpenChange={setPartnerOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Partner with CampusHut</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePartnerSubmit} className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                name="name"
                value={partnerForm.name}
                onChange={handlePartnerChange}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Input
                name="company"
                value={partnerForm.company}
                onChange={handlePartnerChange}
                required
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Input
                name="email"
                type="email"
                value={partnerForm.email}
                onChange={handlePartnerChange}
                required
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <Input
                name="phone"
                value={partnerForm.phone}
                onChange={handlePartnerChange}
                required
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                name="message"
                value={partnerForm.message}
                onChange={handlePartnerChange}
                required
                placeholder="How would you like to partner with us?"
                rows={4}
              />
            </div>
            <DialogFooter className="mt-4 flex flex-row gap-2 justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-campusGreen-600 hover:bg-campusGreen-700 text-white flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
