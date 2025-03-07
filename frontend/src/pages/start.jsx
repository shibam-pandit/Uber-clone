import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Start() {
  // State for animations and interactive elements
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Animate elements as they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementPosition < windowHeight - 100) {
          element.classList.add("animate-visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", animateOnScroll)

    // Initial check for elements in view
    animateOnScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", animateOnScroll)
    }
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Testimonial data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular User",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "This ride-sharing app has completely transformed my daily commute. The drivers are always on time and professional!",
    },
    {
      name: "Michael Chen",
      role: "Business Traveler",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "As someone who travels frequently for work, this app has been a lifesaver. Reliable service in every city I visit.",
    },
    {
      name: "Aisha Patel",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      text: "The affordable pricing is perfect for students like me. I can get around campus and the city without breaking the bank.",
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "How do I request a ride?",
      answer:
        "Simply open the app, enter your destination, choose your ride type, and tap 'Request Ride'. You'll be matched with a nearby driver in minutes.",
    },
    {
      question: "How is the fare calculated?",
      answer:
        "Fares are calculated based on distance, time, and demand. You'll always see the estimated fare before confirming your ride.",
    },
    {
      question: "Can I schedule rides in advance?",
      answer: "Yes! You can schedule rides up to 7 days in advance for those important meetings or airport pickups.",
    },
    {
      question: "How do I become a driver?",
      answer:
        "Click on 'Become a Driver', complete the registration form, submit required documents, and pass a background check to start earning.",
    },
  ]

  return (
    <div className="bg-gray-100 font-sans overflow-x-hidden">
      {/* Header with animation */}
      <header
        className={`fixed top-0 z-30 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center">
            <img
              src="https://www.svgrepo.com/show/303453/uber-12-logo.svg"
              alt="Uber Clone Logo"
              className={`h-10 md:h-12 transition-all duration-300 ${isScrolled ? "filter brightness-0" : "filter brightness-100"}`}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`p-2 rounded-md ${isScrolled ? "text-gray-800" : "text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/login"
              className={`m-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                isScrolled ? "bg-[#002D74] text-white hover:bg-[#206ab1]" : "bg-white text-[#002D74] hover:bg-gray-100"
              }`}
            >
              User Login
            </Link>
            <Link
              to="/captain-login"
              className={`m-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                isScrolled ? "bg-[#002D74] text-white hover:bg-[#206ab1]" : "bg-white text-[#002D74] hover:bg-gray-100"
              }`}
            >
              Driver Login
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ${showMobileMenu ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/login"
              className="block p-3 bg-[#002D74] text-white rounded-xl text-center font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              User Login
            </Link>
            <Link
              to="/captain-login"
              className="block p-3 bg-[#002D74] text-white rounded-xl text-center font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Driver Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with animated elements */}
      <div className="relative h-screen bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=1500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Cityscape"
            className="h-full w-full object-cover transition-transform duration-20000 transform scale-110 animate-slow-zoom"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/70 to-black/90"></div>

        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl animate-fade-in-up">
            Your Ride, <span className="text-[#dfa674]">On Demand</span>
          </h1>
          <p className="mb-8 text-xl md:text-2xl max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Experience the future of transportation with our seamless, fast, and affordable ride-sharing service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <Link
              to="/login"
              className="rounded-lg bg-[#002D74] px-8 py-4 text-lg text-white shadow-lg hover:bg-[#206ab1] transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Book a Ride
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-white px-8 py-4 text-lg text-[#002D74] shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Sign Up Now
            </Link>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Features Section with animations */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-[#002D74]">Our Service</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best ride-sharing experience with features designed for your convenience
              and safety.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll">
              <div className="bg-[#dfa674]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <img src="https://cdn-icons-png.flaticon.com/128/854/854878.png" alt="GPS Icon" className="h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Real-Time Tracking</h3>
              <p className="text-gray-600 text-center">
                Track your ride in real-time with precise GPS technology. Know exactly when your driver will arrive.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll animation-delay-200">
              <div className="bg-[#dfa674]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <img src="https://cdn-icons-png.flaticon.com/128/17420/17420758.png" alt="Car Icon" className="h-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Reliable Rides</h3>
              <p className="text-gray-600 text-center">
                Our vetted drivers are always ready to take you where you need to go, 24/7, rain or shine.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll animation-delay-400">
              <div className="bg-[#dfa674]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9084/9084553.png"
                  alt="Affordable Icon"
                  className="h-10"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Affordable Pricing</h3>
              <p className="text-gray-600 text-center">
                Enjoy competitive pricing without compromising on quality. Multiple ride options to fit your budget.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll">
              <div className="bg-[#dfa674]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#002D74]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">24/7 Availability</h3>
              <p className="text-gray-600 text-center">
                Need a ride at 3 AM? No problem. Our service is available around the clock for your convenience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll animation-delay-200">
              <div className="bg-[#dfa674]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#002D74]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Safety First</h3>
              <p className="text-gray-600 text-center">
                Your safety is our priority with features like driver verification, trip sharing, and emergency
                assistance.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll animation-delay-400">
              <div className="bg-[#dfa674]/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#002D74]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Multiple Payment Options</h3>
              <p className="text-gray-600 text-center">
                Pay with credit cards, digital wallets, or cash. Choose what works best for you on every ride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4">
              What Our <span className="text-[#002D74]">Riders Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our community has to say about their experience.
            </p>
          </div>

          <div className="relative h-96 animate-on-scroll">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full transition-all duration-700 transform ${
                  index === activeTestimonial
                    ? "opacity-100 translate-x-0"
                    : index < activeTestimonial
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-gray-50 rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#dfa674]"
                    />
                    <div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-6 text-lg">"{testimonial.text}"</p>
                      <div>
                        <h4 className="font-bold text-xl">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? "bg-[#002D74] w-6" : "bg-gray-300"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#002D74] text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4">
              How It <span className="text-[#dfa674]">Works</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Getting a ride is easier than ever. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-on-scroll">
              <div className="relative mb-6 mx-auto">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 bg-[#dfa674] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Open the Website</h3>
              <p className="text-white/80">Open it on browser and type the website url</p>
            </div>

            <div className="text-center animate-on-scroll animation-delay-200">
              <div className="relative mb-6 mx-auto">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 bg-[#dfa674] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-white/80">Sign up with your email or phone number.</p>
            </div>

            <div className="text-center animate-on-scroll animation-delay-400">
              <div className="relative mb-6 mx-auto">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 bg-[#dfa674] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Destination</h3>
              <p className="text-white/80">Tell us where you want to go.</p>
            </div>

            <div className="text-center animate-on-scroll animation-delay-600">
              <div className="relative mb-6 mx-auto">
                <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 bg-[#dfa674] rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Ride</h3>
              <p className="text-white/80">Your driver will pick you up and take you to your destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="text-[#002D74]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our
              support team.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-6 bg-white rounded-xl shadow-md overflow-hidden animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-semibold">{faq.question}</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#002D74] to-[#206ab1] text-white">
        <div className="container mx-auto px-6 text-center md:px-12">
          <div className="animate-on-scroll">
            <h2 className="mb-6 text-4xl font-bold">Ready to Experience the Future of Transportation?</h2>
            <p className="mb-8 text-xl max-w-3xl mx-auto">
              Join thousands of satisfied users who have made the switch to our ride-sharing platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#002D74] hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="rounded-lg bg-transparent border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Driver Section with enhanced visuals */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="inline-block bg-[#dfa674]/20 rounded-lg px-3 py-1 text-sm text-[#002D74] font-medium mb-4">
                Join Our Team
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Become a Driver & <span className="text-[#002D74]">Earn on Your Schedule</span>
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Turn your car into a money-making machine. Set your own hours and be your own boss while earning
                competitive rates.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-[#002D74] rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Flexible hours - drive when it suits you</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#002D74] rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Weekly payments directly to your bank account</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#002D74] rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Dedicated support team for drivers</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#002D74] rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Bonuses and incentives for top performers</p>
                </div>
              </div>

              <Link
                to="/captains/register"
                className="inline-flex items-center rounded-lg bg-[#002D74] px-8 py-4 text-lg text-white shadow-lg hover:bg-[#206ab1] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Start Driving Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="relative animate-on-scroll animation-delay-200">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#dfa674]/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#002D74]/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-400"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJpdmVyfGVufDB8fDB8fHww"
                  alt="Driver with car"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <div className="flex items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/54.jpg"
                      alt="Driver"
                      className="w-12 h-12 rounded-full border-2 border-white mr-4"
                    />
                    <div className="text-white">
                      <p className="font-bold">Michael Rodriguez</p>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2">4.9</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white mt-2 italic">
                    "I've been driving for 2 years now. The flexible schedule allows me to spend more time with my
                    family while earning a great income."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with enhanced design */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <img
                  src="https://www.svgrepo.com/show/303453/uber-12-logo.svg"
                  alt="Uber Clone Logo"
                  className="h-10 mr-3 filter brightness-0 invert"
                />
                <span className="text-white text-xl font-bold">Uber Clone</span>
              </div>
              <p className="mb-6">
                Revolutionizing the way people move around cities with reliable, affordable, and convenient rides.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Offerings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Products</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ride
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Drive
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Deliver
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Restaurants
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Uber Clone. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-gray-800 text-gray-400 rounded-md px-3 py-1 border border-gray-700">
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slowZoom {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.1);
                    }
                }
                
                @keyframes blob {
                    0% {
                        transform: scale(1);
                    }
                    33% {
                        transform: scale(1.1);
                    }
                    66% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .animate-slow-zoom {
                    animation: slowZoom 20s ease-in-out infinite alternate;
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                
                .animate-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .animate-bounce {
                    animation: bounce 2s infinite;
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
    </div>
  )
}

export default Start

