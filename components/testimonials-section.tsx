"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I've earned over $200 in my first month just by watching videos during my commute. This platform is amazing!",
      name: "Sarah Johnson",
      location: "New York, USA",
      amount: "$200+",
    },
    {
      quote:
        "VideoEarn has become my go-to platform for earning extra cash. The videos are interesting and the payments are always on time.",
      name: "Michael Chen",
      location: "Toronto, Canada",
      amount: "$150+",
    },
    {
      quote:
        "As a student, this has been a great way to make some extra money between classes. Highly recommend!",
      name: "Emma Rodriguez",
      location: "London, UK",
      amount: "$120+",
    },
    {
      quote:
        "I was skeptical at first, but after receiving my first payment, I was convinced. This is legit!",
      name: "David Kim",
      location: "Sydney, Australia",
      amount: "$180+",
    },
    {
      quote:
        "The platform is so easy to use, and I love that I can watch videos on any topic that interests me while earning money.",
      name: "Priya Patel",
      location: "Mumbai, India",
      amount: "$90+",
    },
    {
      quote:
        "VideoEarn has helped me pay for my monthly subscriptions. It's like getting paid to be entertained!",
      name: "Thomas Weber",
      location: "Berlin, Germany",
      amount: "$130+",
    },
  ];

  return (
    <div className="py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex-1 space-y-2">
                  <Quote className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {testimonial.amount}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
