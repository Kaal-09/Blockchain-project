import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function EventsPage() {
  return (
    <div className="h-screen bg-black flex flex-col gap-3">
      <Navbar />
      <div className="z-11 top-[10%] h-[85%] w-full px-10 py-10 overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
