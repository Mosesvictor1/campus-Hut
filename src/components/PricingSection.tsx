
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
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
  );
};

export default PricingSection;
