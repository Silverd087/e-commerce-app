import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Users,
  LayoutDashboard,
  BookOpen,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function NavItem({ icon: Icon, href, children, className, ...props }) {
  return (
    <Link
      to={href}
      className={
        "flex items-center gap-2 rounded-lg px-3 py-2 text-white/70 transition-colors hover:bg-primary-light hover:text-white group"
      }
      {...props}
    >
      <Icon className="size-4" />
      <span className="text-sm">{children}</span>
      <ChevronRight className="ml-auto size-4 opacity-50 group-hover:text-secondary" />
    </Link>
  );
}

export default function Sidebar({ user }) {
  const scrollToSection = (e, sectionId) => {
    if (sectionId) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="w-64 bg-black shadow-lg">
      <div className="flex justify-center h-screen w-64 flex-col bg-black border-r border-black">
        <div className="flex h-14 items-center border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-secondary p-2">
              <div className="size-4 rounded-sm bg-white/20" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-sm font-semibold text-white">Sbabeet</h2>
              <p className="text-xs text-white">Admin Dashboard</p>
            </div>
          </div>
          <Link to="/" className="ml-auto">
            <button
              variant="ghost"
              size="icon"
              className="btn ml-auto hover:text-secondary-light"
            >
              <ChevronRight className="size-4 text-zinc-400" />
            </button>
          </Link>
        </div>
        <div className="flex-1 px-2">
          <nav className="flex flex-col gap-1 p-2">
            <NavItem
              onClick={(e) => scrollToSection(e, "analytics")}
              icon={LayoutDashboard}
            >
              Analytics
            </NavItem>
            <NavItem
              onClick={(e) => scrollToSection(e, "orders")}
              icon={CalendarIcon}
            >
              Orders
            </NavItem>
            <NavItem
              onClick={(e) => scrollToSection(e, "messages")}
              icon={Mail}
            >
              Messages
            </NavItem>
            <NavItem
              onClick={(e) => scrollToSection(e, "products")}
              icon={BookOpen}
            >
              Products
            </NavItem>
          </nav>
        </div>
        <div className="mt-auto border-t border-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-white">{user.email}</p>
            </div>
            <button variant="ghost" size="icon" className="ml-auto btn">
              <ChevronRight className="size-4 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
