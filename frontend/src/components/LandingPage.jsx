import React from 'react';
import { MessageCircle, Shield, Zap, ChevronRight, Github, Twitter } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 h-full w-full">
      {/* Navbar */}
      <nav className="bg-white shadow-sm mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-800">ChatApp</span>
            </div>
            <div className="flex items-center">
              <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium">About</a>
              <a href="/login" className="ml-4 px-3 py-2 rounded-md text-lg font-medium text-indigo-600 hover:text-indigo-500">Sign in</a>
              <a href="/signup" className="ml-4 px-3 py-2 rounded-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500">Sign up</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header/Hero Section */}
      <header className="bg-white">
        <div className="max-w-7xl h-[70vh] mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Connect and Chat</span>
              <span className="block text-indigo-600">in Real-Time</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-2xl md:max-w-3xl">
              Experience seamless communication with our secure and intuitive chat application. Built with React and Socket.io for instant messaging.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-white" id='features'>
        <div className="max-w-7xl mb-16 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-lg text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to communicate
            </p>
            <p className="mt-4 max-w-2xl text-2xl text-gray-500 lg:mx-auto">
              Our chat application provides you with the tools you need for seamless, secure, and efficient communication.
            </p>
          </div>

          <div className="mt-24">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-12">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">Real-Time Messaging</h3>
                  <p className="mt-2 text-lg text-gray-500">
                    Instant message delivery powered by Socket.io for seamless conversations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">Secure Authentication</h3>
                  <p className="mt-2 text-lg text-gray-500">
                    JWT-based authentication ensures your conversations remain private and secure.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">Intuitive Interface</h3>
                  <p className="mt-2 text-lg text-gray-500">
                    User-friendly React-based interface for effortless navigation and chatting.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">User Status Availability</h3>
                  <p className="mt-2 text-lg text-gray-500">
                    Users can chat only if other user is available to chat, else AI will respond to messages on behalf.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="bg-indigo-50">
        <div className="max-w-7xl h-[70vh] mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get started
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="https://github.com/rahulvijay5/chatApp" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/rahulviijay" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 ChatApp, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}