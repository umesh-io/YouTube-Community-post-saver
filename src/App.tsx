import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Youtube, Star, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import Hero from '@/components/Hero';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['All', 'Tech', 'Gaming', 'Music', 'Art'];
  const menuItems = ['Features', 'Gallery', 'Pricing', 'Testimonials', 'Contact'];
  
  const posts = [
    { 
      id: 1, 
      category: 'Tech', 
      title: 'New AI Breakthrough',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
    },
    { 
      id: 2, 
      category: 'Gaming', 
      title: 'E3 Highlights',
      image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop'
    },
    { 
      id: 3, 
      category: 'Music', 
      title: 'Album Release Party',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop'
    },
    { 
      id: 4, 
      category: 'Art', 
      title: 'Digital Art Exhibition',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop'
    },
    { 
      id: 5, 
      category: 'Tech', 
      title: '5G Revolution',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
    },
    { 
      id: 6, 
      category: 'Gaming', 
      title: 'Indie Game Showcase',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      comment: "This platform has transformed how I organize my content. Absolutely love it!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Gaming Streamer",
      comment: "The best platform for showcasing gaming content. Simple yet powerful!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Digital Artist",
      comment: "Perfect for displaying my artwork portfolio. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Youtube className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold font-sans">YT Post Gallery</h1>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="relative text-gray-600 hover:text-blue-600 transition-colors duration-300 group font-medium"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4">
              <ul className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-600 hover:text-blue-600 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow">
        <Hero />

        <section id="gallery" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Discover Content
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category.toLowerCase())}
                  className={`
                    px-4 md:px-6 py-2 md:py-3 text-base md:text-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-xl
                    ${activeCategory === category.toLowerCase() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-black text-white hover:bg-gray-900'}
                  `}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts
                .filter((post) => activeCategory === 'all' || post.category.toLowerCase() === activeCategory)
                .map((post) => (
                  <div
                    key={post.id}
                    className="transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group rounded-xl">
                      <CardContent className="p-4">
                        <div className="overflow-hidden rounded-lg mb-4 aspect-video">
                          <img 
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-sm text-blue-600">{post.category}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reviews.map((review) => (
                <Card key={review.id} className="h-full transform hover:-translate-y-1 transition-all duration-300 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">support@ytgallery.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Gallery Street, Digital City, DC 12345</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Your Name" className="w-full rounded-lg" required />
                <Input placeholder="Your Email" type="email" className="w-full rounded-lg" required />
                <Textarea placeholder="Your Message" className="w-full h-32 rounded-lg" required />
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 rounded-xl">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}