import React from 'react'
import { Mail } from "lucide-react";
import { Phone, Facebook, Twitter, Linkedin, Dribbble } from "lucide-react";

import Link from 'next/link';

function SocialMedia() {
  return (
    <div>
      <div className="flex items-center gap-4">
                <Link href="#" className="flex items-center text-white gap-2">
                  <Facebook />
                </Link>
                <Link href="#" className="flex items-center text-white gap-2">
                  <Twitter />
                </Link>
                <Link href="#" className="flex items-center text-white gap-2">
                  <Linkedin />
                </Link>
                <Link href="#" className="flex items-center text-white gap-2">
                  <Dribbble />
                </Link>
              </div>
    </div>
  )
}

export default SocialMedia
