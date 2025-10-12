"use client";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";
import logo from "@/components/ai-club-logo.svg";
import mobilelogo from "@/components/ai-club-mobile-logo.svg";
function Navbar() {
  return (
    <Popover as="nav" className="sticky top-0 z-50 mx-auto flex items-center justify-between border-b px-4 sm:px-6 lg:px-8 py-2 h-16 text-black bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70" aria-label="Primary">
      <h1 className="font-bold">
        <Link href="/" aria-label="AI Club home">
          <Image src={logo} alt="AI Club logo" className="w-[100px] h-auto" priority />
        </Link>
      </h1>
      <div className="grow md:grow-0">
        <div className="hidden sm:flex items-center justify-center gap-2 md:gap-8" role="menubar" aria-label="Primary">
          <Link className="nav" href="/" role="menuitem" tabIndex={0}>Home</Link>
          <Link className="nav" href="/#vision" role="menuitem" tabIndex={0}>Vision</Link>
          <Link className="nav" href="/#mission" role="menuitem" tabIndex={0}>Mission</Link>
          <Link className="nav" href="/#team" role="menuitem" tabIndex={0}>Core Team</Link>
          <Link className="nav" href="/#contact" role="menuitem" tabIndex={0}>Contact us</Link>
          <Link className="nav" href="/newsletter" role="menuitem" tabIndex={0}>Newsletter</Link>
        </div>

        <div className="flex grow items-center justify-end sm:hidden w-full">
          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-black p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300 transition">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </Popover.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel className="absolute inset-x-0 top-0 origin-top-right transform p-2 md:hidden z-50">
            <div className="rounded-lg bg-black/95 shadow-lg ring-1 ring-black ring-opacity-5 text-white">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between w-full">
                  <Image src={mobilelogo} alt="AI Club logo" className="w-[40px] h-auto rounded-full" />
                  <div className="mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-2" role="menu" aria-label="Mobile">
                    <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 hover:bg-white hover:text-black py-2 rounded-lg transition" role="menuitem">
                      <Popover.Button className="w-full text-left">Home</Popover.Button>
                    </Link>
                    <Link href="/#vision" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 hover:bg-white hover:text-black py-2 rounded-lg transition" role="menuitem">
                      <Popover.Button className="w-full text-left">Vision</Popover.Button>
                    </Link>
                    <Link href="/#mission" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 hover:bg-white hover:text-black py-2 rounded-lg transition" role="menuitem">
                      <Popover.Button className="w-full text-left">Mission</Popover.Button>
                    </Link>
                    <Link href="/#team" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 hover:bg-white hover:text-black py-2 rounded-lg transition" role="menuitem">
                      <Popover.Button className="w-full text-left">Core Team</Popover.Button>
                    </Link>
                    <Link href="/#contact" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 hover:bg-white hover:text-black py-2 rounded-lg transition" role="menuitem">
                      <Popover.Button className="w-full text-left">Contact us</Popover.Button>
                    </Link>
                    <Link href="/newsletter" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 hover:bg-white hover:text-black py-2 rounded-lg transition" role="menuitem">
                      <Popover.Button className="w-full text-left">Newsletter</Popover.Button>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}
export default Navbar;
