export type SocialLink = {
  name: string;
  href: string;
  label: string;
};

export const socialLinks: SocialLink[] = [
  { name: "facebook", href: "https://www.facebook.com/dima.kozlov.9", label: "Facebook" },
  { name: "instagram", href: "https://www.instagram.com/forwordceo", label: "Instagram" },
  { name: "linkedin", href: "https://www.linkedin.com/in/forwordceo", label: "LinkedIn" },
  { name: "youtube", href: "https://www.youtube.com/@forwordceo", label: "YouTube" },
  { name: "x", href: "https://x.com/forwordceo", label: "X" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#service", label: "Who Am I?" },
  { href: "/words", label: "Words" },
  { href: "/#service", label: "Service" },
  { href: "/#impact", label: "Impact" },
  { href: "/stages", label: "Stages" },
  { href: "/connect", label: "Connect" },
];
