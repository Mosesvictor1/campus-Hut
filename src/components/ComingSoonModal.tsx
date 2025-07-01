import React, { useState } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Props {
  onClose: () => void;
  title?: string;
  description: string;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwsvCns420DA7NQnGeiXIeGTXgnlR3FDz-Gjh8UzWUtiELUzNydCT4nVVTnoKsTfA6hog/exec";

const ComingSoonModal: React.FC<Props> = ({ onClose, title, description }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("type", "subscribe");
      formData.append("email", email);
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: true };
      }
      if (data.success) {
        toast({
          title: "Subscribed!",
          description: "You'll be notified when we launch.",
        });
        setEmail("");
        onClose();
      } else {
        throw new Error(data.message || "Subscription failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-fade-in transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700 mb-3 sm:mb-4">
          {title || "🚀 Coming Soon!"}
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-700 mb-6">
          {description}
        </p>
        <form
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full rounded-full px-5 py-3 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm sm:text-base"
            disabled={isSubmitting}
          >
            <Mail className="w-4 h-4 mr-2" />
            {isSubmitting ? "Subscribing..." : "Notify Me"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-500">
          No spam. We'll just let you know when we go live. 💌
        </p>
      </div>
    </div>
  );
};

export default ComingSoonModal;
