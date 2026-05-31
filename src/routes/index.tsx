import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  ZoomIn,
  ExternalLink,
  Menu,
  X,
  Star,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: SAMGentsSalon,
  head: () => ({
    meta: [
      { title: "SAM Gents Salon" },
      {
        name: "description",
        content:
          "Premium barbershop in Dubai offering modern cuts, grooming, and professional barber services.",
      },
    ],
  }),
});

type LocationKey = "ajman";

function googleMapsEmbedSrc(query: string, hl?: string, zoom?: number) {
  const hlPart = hl ? `&hl=${hl}` : "";
  const zPart = zoom != null ? `&z=${zoom}` : "";
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed${hlPart}${zPart}`;
}

function googleMapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

const LOCATIONS: Record<
  LocationKey,
  {
    flag: string;
    label: string;
    address: string;
    phone: string;
    whatsapp: string;
    hours: string;
    currency: string;
    mapLabel: string;
    /** Used for embedded map + “Get directions” (Google listing / address). */
    mapSearchQuery: string;
    /** If set, iframe uses this URL verbatim (from Google Maps → Share → Embed a map) for a pixel-identical embed. */
    mapEmbedSrc?: string;
    /** Optional zoom for `q=` embeds (Google’s default varies by listing). */
    mapZoom?: number;
  }
> = {
  ajman: {
    flag: "🇦🇪",
    label: "DUBAI",
    address: "Wavez by Danube Building, Wadi Al Safa 2, Liwan, Dubai, UAE",
    phone: "+971 67416264",
    whatsapp: "+971 67416264",
    hours: "Sat–Thu: 9:00 AM – 10:00 PM  •  Fri: 2:00 PM – 10:00 PM",
    currency: "AED",
    mapLabel: "Wavez by Danube, Liwan, Dubai",
    mapSearchQuery: "Wavez by Danube, Wadi Al Safa 2, Liwan, Dubai",
    mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.3996547630737!2d55.39515027520427!3d25.11867167777712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f67b848c0b56d%3A0x63351d8b6715f6ea!2sWavez%20by%20Danube!5e0!3m2!1sen!2sae!4v1716300000000!5m2!1sen!2sae",
    mapZoom: 15,
  },
};

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services", hasDropdown: true, dropdownKey: "services" },
  { name: "Price List", href: "#pricing", hasDropdown: true, dropdownKey: "priceList" },
  { name: "About Us", href: "#about" },
];

const SUB_SERVICES = [
  {
    name: "Hair Cut",
    sub: ["Skin Fade Haircut", "Medium Fade Haircut", "Classic Hot Towel Shave"]
  },
  { name: "Hair  Perm & Styling" },
  { name: "Grooming Packages" },
  { name: "Beard Trimming" },
  { name: "MANICURE FOR MEN" },
  { name: "PEDICURE FOR MEN" },
  { name: "FACIAL Treatment" },
];

const PRICE_LIST_SUB = [
  { name: "Haircut" },
  { name: "Hair Perm" },
  { name: "Hair Coloring & Styling" },
  { name: "Beard Lineup & Trimming" },
  { name: "Manicure & Pedicure" },
  { name: "Facial Treatment" },
];



const SERVICES = [
  { name: "Hair Cut", desc: "Precision haircuts and beards in the heart of Dubai." },
  { name: "Kids Hair Cut", desc: "Special attention for our younger gentlemen." },
  { name: "Beard Trimming", desc: "Expert beard shaping, lining, and conditioning." },
  { name: "Hair Perm & Styling", desc: "Modern textures and styling for men." },
  { name: "Grooming Packages", desc: "Cut + beard + hot towel shave combo packages." },
  { name: "Manicure", desc: "Complete hand grooming for men." },
  { name: "Pedicure", desc: "Relaxing foot treatment and grooming." },
  { name: "Facial Treatment", desc: "Rejuvenating skin treatments." },
  { name: "Classic Hot Towel Shave", desc: "Traditional straight-razor shave experience." },
  { name: "Scalp & Hair Treatments", desc: "Health-focused treatments for hair and scalp." },
];

const GALLERY = [
  "/services.mp4",
  "/perm-hairstyle.mp4",
  "/men-hair-color.mp4",
  "/our-work.mp4",
  "/hero sam salon.mp4",
];

const REVIEWS = [
  {
    quote:
      "The best fade I've ever had — and I've sat in chairs across London, Riyadh, and New York. SAM Gents Salon Dubai is on another level. The hot towel shave alone is worth the visit.",
    name: "Khalid A.",
    where: "Liwan, Dubai",
    initial: "K",
  },
  {
    quote:
      "I drive from Business Bay every two weeks just for this place. My barber knows exactly what I want before I even sit down. Sharp, fast, and professional every single time.",
    name: "Marcus T.",
    where: "Liwan, Dubai",
    initial: "M",
  },
];

const BARBERS = [
  {
    name: "Marcus",
    title: "SENIOR FADE SPECIALIST",
    bio: "10 years of precision fades and taper cuts, trained across London and Dubai.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Tariq",
    title: "BEARD & SHAVE EXPERT",
    bio: "Master of the straight-razor hot towel shave and classic barbering techniques.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Yousef",
    title: "COLOUR & SCALP SPECIALIST",
    bio: "Expert in men's hair colour, grey blending, and scalp treatment programmes.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

const PRICING = {
  essentials: [
    ["Haircut (Scissor or Clipper)", "AED 60"],
    ["Beard Trim & Line-up", "AED 40"],
    ["Hot Towel Shave", "AED 80"],
    ["Eyebrow Shaping (Men's)", "AED 25"],
    ["Hair Wash & Blowdry", "AED 50"],
    ["Kids' Haircut (Boys Under 12)", "AED 45"],
  ],
  signature: [
    ["Cut + Beard Combo", "AED 150"],
    ["Cut + Hot Towel Shave", "AED 180"],
    ["Full Grooming Package", "AED 220"],
    ["Hair Colour — Grey Blend", "AED 120"],
    ["Beard Colour & Tint", "AED 80"],
    ["Cut + Scalp Treatment", "AED 160"],
  ],
  premium: [
    ["VIP Grooming Ritual (Cut + Beard + Shave)", "AED 350"],
    ["Hair Replacement System Fitting", "AED 800"],
    ["Groom's Package (Event Ready)", "AED 600"],
    ["Full Hair Colour + Cut", "AED 300"],
    ["Advanced Scalp Treatment Course", "AED 250"],
    ["Monthly Membership (Unlimited Cuts)", "AED 499"],
  ],
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function GoldButton({
  children,
  outlined,
  onClick,
  full,
}: {
  children: React.ReactNode;
  outlined?: boolean;
  onClick?: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="ws-btn"
      data-outlined={outlined ? "1" : "0"}
      style={{
        padding: "14px 32px",
        fontSize: 11,
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        background: outlined ? "transparent" : "#D4AF37",
        color: outlined ? "#D4AF37" : "#111111",
        border: outlined ? "1.5px solid #D4AF37" : "1.5px solid #D4AF37",
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {children}
    </button>
  );
}

function SAMGentsSalon() {
  const [location, setLocation] = useState<LocationKey>("ajman");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Auto-scroll logic for Services
  useEffect(() => {
    const el = document.getElementById("services-scroll");
    if (!el) return;
    let rafId: number;
    let isPaused = false;
    let lastTime = 0;

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        el.scrollLeft += 0.05 * deltaTime; // Smooth drift
        if (el.scrollLeft >= el.scrollWidth / 3) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; lastTime = 0; };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleMouseEnter);
    el.addEventListener("touchmove", handleMouseEnter);
    el.addEventListener("touchend", handleMouseLeave);
    el.addEventListener("touchcancel", handleMouseLeave);
    el.addEventListener("ws-pause", handleMouseEnter);
    el.addEventListener("ws-resume", handleMouseLeave);

    rafId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleMouseEnter);
      el.removeEventListener("touchmove", handleMouseEnter);
      el.removeEventListener("touchend", handleMouseLeave);
      el.removeEventListener("touchcancel", handleMouseLeave);
      el.removeEventListener("ws-pause", handleMouseEnter);
      el.removeEventListener("ws-resume", handleMouseLeave);
    };
  }, []);

  // Auto-scroll logic for Reviews
  useEffect(() => {
    const el = document.getElementById("reviews-scroll");
    if (!el) return;
    let rafId: number;
    let isPaused = false;
    let lastTime = 0;

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        el.scrollLeft += 0.04 * deltaTime; // Slightly slower for reading
        if (el.scrollLeft >= el.scrollWidth / 3) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; lastTime = 0; };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleMouseEnter);
    el.addEventListener("touchmove", handleMouseEnter);
    el.addEventListener("touchend", handleMouseLeave);
    el.addEventListener("touchcancel", handleMouseLeave);
    el.addEventListener("ws-pause", handleMouseEnter);
    el.addEventListener("ws-resume", handleMouseLeave);

    rafId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleMouseEnter);
      el.removeEventListener("touchmove", handleMouseEnter);
      el.removeEventListener("touchend", handleMouseLeave);
      el.removeEventListener("touchcancel", handleMouseLeave);
      el.removeEventListener("ws-pause", handleMouseEnter);
      el.removeEventListener("ws-resume", handleMouseLeave);
    };
  }, []);

  const [reviewIdx, setReviewIdx] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Click away for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // styles + fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      body { margin:0; font-family: 'Inter', sans-serif; background:#111; color:#E8E0D5; }
      * { box-sizing: border-box; }
      .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
      .eyebrow { font-family:'Inter',sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.28em; color:#D4AF37; font-weight:500; }
      .ws-nav-link { position:relative; display:inline-block; padding:6px 0; color:#E8E0D5; text-decoration:none; font-size:14px; letter-spacing:0.05em; font-family:'Inter',sans-serif; transition:color 0.3s ease; cursor:pointer;}
      .ws-nav-link::after { content:''; position:absolute; left:0; bottom:0; height:1px; width:0; background:#D4AF37; transition: width 0.3s ease;}
      .ws-nav-link:hover { color:#D4AF37; }
      .ws-nav-link:hover::after { width:100%; }
      .ws-btn[data-outlined="1"]:hover { background:#D4AF37 !important; color:#111111 !important; }
      .ws-btn[data-outlined="0"]:hover { background:#8B6914 !important; }
      @keyframes ws-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
      @keyframes ws-shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      @keyframes ws-pulse { 0%,100%{box-shadow:0 6px 24px rgba(37,211,102,0.4)} 50%{box-shadow:0 6px 36px rgba(37,211,102,0.65)} }
      @keyframes ws-kenburns { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(-1%,-1%)} }
      .service-card:hover .service-overlay { opacity:1; }
      .service-card:hover .service-img { transform:scale(1.05); }
      .gallery-item:hover .gallery-img { transform:scale(1.04); }
      .gallery-item:hover .gallery-overlay { opacity:1; }
      .barber-img-wrap:hover img { outline:2px solid #D4AF37; outline-offset:6px; }
      .footer-link:hover { color:#D4AF37 !important; }
      .social-icon:hover { color:#fff !important; transform:scale(1.1); }
      .ws-section { padding: 100px 0; }
      .ws-container { max-width:1200px; margin:0 auto; padding: 0 40px; }
      @media (max-width: 768px) {
        .ws-section { padding: 60px 0; }
        .ws-container { padding: 0 20px; }
        .desktop-only { display:none !important; }
      }
      @media (min-width: 769px) {
        .mobile-only { display:none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // mobile detect
  useEffect(() => {
    const onR = () => setIsMobile(window.innerWidth < 768);
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // scroll
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);

  // geo
  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    fetch("https://ipapi.co/json/", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => {
        if (d?.country_code === "AE") setLocation("ajman");
      })
      .catch(() => { })
      .finally(() => clearTimeout(t));
  }, []);

  // review carousel
  useEffect(() => {
    const id = setInterval(() => setReviewIdx((i) => (i + 1) % REVIEWS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const loc = LOCATIONS[location];

  const openBook = (serviceName?: string) => {
    setSelectedService(serviceName || null);
    setBookOpen(true);
  };

  return (
    <div style={{ background: "#111111", color: "#E8E0D5", overflowX: "hidden" }}>
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "18px 40px",
          background: scrolled ? "#111111" : "transparent",
          boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.35s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ height: 120, marginLeft: 20 }}>
          <img
            src="/sam salon logo no background.png"
            alt="SAM Gents Salon Logo"
            style={{ height: "100%", width: "auto", display: "block" }}
          />
        </div>

        <div className="desktop-only" style={{ display: "flex", gap: 24, alignItems: "center" }} ref={navRef}>
          {NAV_LINKS.map((l) => (
            <div key={l.name} style={{ position: "relative" }}>
              <a
                href={l.href}
                className="ws-nav-link"
                style={{ display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}
                onClick={(e) => {
                  if (l.hasDropdown) {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === l.dropdownKey ? null : (l.dropdownKey || null));
                  } else if (l.href.startsWith("#") && l.href !== "#") {
                    e.preventDefault();
                    document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {l.name}
                {l.hasDropdown && (
                  <ChevronDown
                    size={14}
                    style={{
                      transform: activeDropdown === l.dropdownKey ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s"
                    }}
                  />
                )}
              </a>

              {l.dropdownKey === "services" && activeDropdown === l.dropdownKey && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#000",
                    padding: "20px",
                    minWidth: "260px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                    border: "1px solid #222",
                    zIndex: 1100,
                    marginTop: 10,
                  }}
                >
                  {SUB_SERVICES.map((s) => (
                    <div key={s.name} style={{ marginBottom: 15 }}>
                      <div
                        onClick={() => {
                          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                          setActiveDropdown(null);
                        }}
                        style={{
                          fontSize: 13,
                          color: "#fff",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          marginBottom: s.sub ? 8 : 0,
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#D4AF37"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}
                      >
                        {s.name}
                      </div>
                      {s.sub && (
                        <div style={{ paddingLeft: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                          {s.sub.map((sub) => (
                            <div
                              key={sub}
                              onClick={() => {
                                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                                setActiveDropdown(null);
                              }}
                              style={{ fontSize: 11, color: "#888", cursor: "pointer", transition: "color 0.2s" }}
                              onMouseEnter={(e) => e.currentTarget.style.color = "#D4AF37"}
                              onMouseLeave={(e) => e.currentTarget.style.color = "#888"}
                            >
                              {sub}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {l.dropdownKey === "priceList" && activeDropdown === l.dropdownKey && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#000",
                    padding: "20px",
                    minWidth: "200px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                    border: "1px solid #222",
                    zIndex: 1100,
                    marginTop: 10,
                  }}
                >
                  {PRICE_LIST_SUB.map((s) => (
                    <div
                      key={s.name}
                      onClick={() => {
                        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                        setActiveDropdown(null);
                      }}
                      style={{
                        fontSize: 14,
                        color: "#fff",
                        padding: "8px 0",
                        cursor: "pointer",
                        transition: "color 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#D4AF37"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}


            </div>
          ))}
        </div>

        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 16 }}>

          <button
            onClick={() => openBook()}
            style={{
              border: "1.5px solid #D4AF37",
              background: "transparent",
              color: "#D4AF37",
              padding: "10px 22px",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.3s ease",
              fontFamily: "Inter",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#25D366",
                display: "inline-block",
              }}
            />
            BOOK NOW
          </button>
        </div>

        <button
          className="mobile-only"
          onClick={() => setMobileOpen(true)}
          style={{ background: "transparent", border: "none", color: "#D4AF37", cursor: "pointer" }}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#111111",
              zIndex: 2000,
              display: "flex",
              flexDirection: "column",
              padding: "30px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ height: 90 }}>
                <img
                  src="/sam salon logo no background.png"
                  alt="SAM Gents Salon Logo"
                  style={{ height: "100%", width: "auto", display: "block" }}
                />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
              >
                <X size={32} />
              </button>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 32,
              }}
            >
              {NAV_LINKS.map((l) => (
                <div key={l.name} style={{ textAlign: "center" }}>
                  <a
                    href={l.href}
                    className="bebas"
                    style={{ fontSize: 42, color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onClick={(e) => {
                      if (l.hasDropdown) {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === l.dropdownKey ? null : (l.dropdownKey || null));
                      } else {
                        setMobileOpen(false);
                        if (l.href.startsWith("#") && l.href !== "#") {
                          e.preventDefault();
                          document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                  >
                    {l.name}
                    {l.hasDropdown && (
                      <ChevronDown
                        size={24}
                        style={{
                          transform: activeDropdown === l.dropdownKey ? "rotate(180deg)" : "none",
                          transition: "transform 0.3s"
                        }}
                      />
                    )}
                  </a>

                  {l.dropdownKey === "services" && activeDropdown === l.dropdownKey && (
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 15 }}>
                      {SUB_SERVICES.map((s) => (
                        <div key={s.name}>
                          <div style={{ fontSize: 16, color: "#D4AF37", fontWeight: 600 }}>{s.name}</div>
                          {s.sub && (
                            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                              {s.sub.map((sub) => (
                                <div key={sub} style={{ fontSize: 12, color: "#888" }}>{sub}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {l.dropdownKey === "priceList" && activeDropdown === l.dropdownKey && (
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 15 }}>
                      {PRICE_LIST_SUB.map((s) => (
                        <div key={s.name} style={{ fontSize: 24, color: "#D4AF37" }}>{s.name}</div>
                      ))}
                    </div>
                  )}


                </div>
              ))}

            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                openBook();
              }}
              style={{
                background: "#D4AF37",
                color: "#111",
                border: "none",
                padding: "18px",
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "Inter",
                cursor: "pointer",
              }}
            >
              <MessageCircle size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />
              BOOK ON WHATSAPP
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section
        style={{
          minHeight: "110vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingTop: isMobile ? 100 : 120,
          paddingBottom: isMobile ? 100 : 120,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/hero sam salon.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 55%, rgba(10,10,10,0.6) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 800,
            margin: "60px auto 0",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <Reveal>
            <h1
              className="bebas"
              style={{
                fontSize: "clamp(32px, 5vw, 60px)",
                color: "#fff",
                lineHeight: 0.95,
                margin: "0 auto",
                letterSpacing: "0.005em",
              }}
            >
              WHERE SHARP MEN GET SHARPER
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
              <GoldButton onClick={() => openBook()}>Book Appointment</GoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AS SEEN ON MARQUEE */}
      <section style={{ background: "#fff", padding: "80px 0", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{
            fontSize: 28,
            fontFamily: "Bebas Neue, sans-serif",
            color: "#000",
            fontWeight: 900,
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            AS SEEN ON
          </span>
        </div>

        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-container {
              display: flex;
              width: max-content;
              animation: marquee 30s linear infinite;
            }
            .marquee-item {
              flex: 0 0 auto;
              margin: 0 60px;
              display: flex;
              alignItems: center;
              filter: opacity(1);
              transition: all 0.4s ease;
            }
            .marquee-item:hover {
              transform: scale(1.05);
            }
          `}
        </style>

        <div className="marquee-container">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div className="marquee-item" style={{ fontSize: 44, color: "#000", fontWeight: 900, fontFamily: "serif" }}>CN Traveler</div>
              <div className="marquee-item" style={{ fontSize: 48, color: "#000", fontWeight: 900, fontFamily: "Bebas Neue, sans-serif" }}>GQ</div>
              <div className="marquee-item" style={{ fontSize: 44, color: "#000", fontWeight: 900, fontFamily: "serif" }}>Esquire</div>
              <div className="marquee-item" style={{ fontSize: 48, color: "#000", fontWeight: 900, fontFamily: "Bebas Neue, sans-serif" }}>VOGUE</div>
              <div className="marquee-item" style={{ fontSize: 48, color: "#000", fontWeight: 900, fontFamily: "serif" }}>Forbes</div>
              <div className="marquee-item" style={{ fontSize: 52, color: "#000", fontWeight: 900, fontFamily: "serif" }}>CEO</div>
              <div className="marquee-item" style={{ fontSize: 40, color: "#000", fontWeight: 900, fontFamily: "serif" }}>Harper's BAZAAR</div>
              <div className="marquee-item" style={{ fontSize: 44, color: "#000", fontWeight: 900, fontFamily: "Bebas Neue, sans-serif" }}>MEN'S HEALTH</div>
            </div>
          ))}
        </div>
      </section>

      {/* GOLD STATS BAR */}
      <section style={{ background: "#D4AF37", padding: "10px 40px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 15,
          }}
        >
          {[
            ["15+", "Expert Barbers"],
            ["79+", "Happy Clients"],
            ["4.9 ★", "Google Rating"],
          ].map(([n, l], i) => (
            <div
              key={l}
              style={{
                textAlign: "center",
                borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,0.4)" : "none",
              }}
            >
              <div className="bebas" style={{ fontSize: 28, color: "#111" }}>
                {n}
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontWeight: 500,
                  marginTop: -4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="services" style={{ background: "#FDFCFB", padding: "60px 0", position: "relative", overflow: "hidden" }}>
        <div className="ws-container" style={{ marginBottom: 30 }}>
          <h2 className="bebas" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#111", margin: 0 }}>
            PREMIUM SERVICES
          </h2>
        </div>

        {/* NAVIGATION ARROWS - OVERLAID */}
        <button
          onClick={() => {
            const el = document.getElementById("services-scroll");
            if (el) el.scrollBy({ left: -450, behavior: "smooth" });
          }}
          style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: 80, height: "100%", border: "none", background: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            document.getElementById("services-scroll")?.dispatchEvent(new CustomEvent("ws-pause"));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
            document.getElementById("services-scroll")?.dispatchEvent(new CustomEvent("ws-resume"));
          }}
        >
          <ChevronLeft size={48} color="#fff" />
        </button>

        <button
          onClick={() => {
            const el = document.getElementById("services-scroll");
            if (el) el.scrollBy({ left: 450, behavior: "smooth" });
          }}
          style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: 80, height: "100%", border: "none", background: "linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            document.getElementById("services-scroll")?.dispatchEvent(new CustomEvent("ws-pause"));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
            document.getElementById("services-scroll")?.dispatchEvent(new CustomEvent("ws-resume"));
          }}
        >
          <ChevronRight size={48} color="#fff" />
        </button>

        <style>
          {`
            #services-scroll::-webkit-scrollbar,
            #reviews-scroll::-webkit-scrollbar {
              display: none;
            }
            .service-card {
              flex: 0 0 300px;
              height: 420px;
              margin-right: 20px;
              position: relative;
              border-radius: 4px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              padding: 30px;
              background-size: cover;
              background-position: center;
              transition: transform 0.4s ease;
            }
            .service-card::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%);
              z-index: 1;
            }
            .service-content {
              position: relative;
              z-index: 2;
            }
          `}
        </style>

        <div
          id="services-scroll"
          style={{
            display: "flex",
            overflowX: "auto",
            padding: "20px 0",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            gap: 20
          }}
        >
          {[...Array(3)].map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              {[
                { name: "Hair Cut", video: "/long-hair-cut-men.mp4" },
                { name: "Kids Hair Cut", video: "/baby-men-hair-cut.mp4" },
                { name: "Medium Fade Hair Cut", video: "/medium-fade-hair-cut-men.mp4" },
                { name: "Skin Fade Haircut", video: "/skin-fade-hair-cut.mp4" },
                { name: "Hair Perm & Styling", video: "/perm-hairstyle.mp4" },
                { name: "Grooming Packages", video: "/grooming-package.mp4" },
                { name: "Beard Trimming", video: "/beard-lineup.mp4" },
                { name: "Manicure", img: "/manicure man.jpg" },
                { name: "Pedicure", video: "/pedicure-men.mp4" },
                { name: "Facial Treatment", img: "/FACIAl.jpeg" },
              ].map((s, idx) => (
                <div key={`${loopIdx}-${idx}`} className="service-card" style={{ backgroundImage: s.img ? `url("${s.img}")` : "none" }}>
                  {s.video && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0
                      }}
                    >
                      <source src={s.video} type="video/mp4" />
                    </video>
                  )}
                  <div className="service-content">
                    <h3 className="bebas" style={{ fontSize: 32, color: "#fff", margin: "0 0 15px" }}>{s.name}</h3>
                    <button
                      onClick={() => openBook(s.name)}
                      style={{
                        background: "#D4AF37",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: 12,
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                        borderRadius: "2px"
                      }}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section style={{ background: "#111", padding: "60px 0 100px", position: "relative" }}>
        <div className="ws-container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 className="bebas" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#fff", marginBottom: 15 }}>
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div style={{ width: 60, height: 2, background: "#D4AF37", margin: "0 auto 20px" }} />
            <p style={{ color: "#888", fontSize: 15, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
              With 79 Google Reviews and a 4.9 rating our professional barbers guarantee unmatched
              satisfaction in every service. Here's what our guys say.  </p>
          </div>

          <div style={{ position: "relative" }}>
            <button
              onMouseEnter={() => document.getElementById("reviews-scroll")?.dispatchEvent(new CustomEvent("ws-pause"))}
              onMouseLeave={() => document.getElementById("reviews-scroll")?.dispatchEvent(new CustomEvent("ws-resume"))}
              onClick={() => {
                const el = document.getElementById("reviews-scroll");
                if (el) el.scrollBy({ left: -400, behavior: "smooth" });
              }}
              style={{
                position: "absolute", left: isMobile ? -10 : -40, top: "50%", transform: "translateY(-50%)", zIndex: 5,
                width: 40, height: 40, borderRadius: "50%", border: "1px solid #333", background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff"
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onMouseEnter={() => document.getElementById("reviews-scroll")?.dispatchEvent(new CustomEvent("ws-pause"))}
              onMouseLeave={() => document.getElementById("reviews-scroll")?.dispatchEvent(new CustomEvent("ws-resume"))}
              onClick={() => {
                const el = document.getElementById("reviews-scroll");
                if (el) el.scrollBy({ left: 400, behavior: "smooth" });
              }}
              style={{
                position: "absolute", right: isMobile ? -10 : -40, top: "50%", transform: "translateY(-50%)", zIndex: 5,
                width: 40, height: 40, borderRadius: "50%", border: "1px solid #333", background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff"
              }}
            >
              <ChevronRight size={20} />
            </button>

            <div
              id="reviews-scroll"
              style={{
                display: "flex", gap: 30, overflowX: "auto", padding: "20px 0",
                msOverflowStyle: "none",
                scrollbarWidth: "none"
              }}
            >
              {[...Array(3)].map((_, loopIdx) => (
                <React.Fragment key={loopIdx}>
                  {[
                    { name: "Gujjar Badsha", initial: "G", location: "Liwan, Dubai", text: "Best experience ever, the staff is very professional and the atmosphere is great." },
                    { name: "Sufaid cherumoth", initial: "S", location: "Liwan, Dubai", text: "Highly recommended for anyone looking for a precision cut in Dubai." },
                    { name: "Frank Lin", initial: "F", location: "Liwan, Dubai", text: "Great experience with Davido. He really knows how to style according to face shape." },
                    { name: "James Wilson", initial: "J", location: "Liwan, Dubai", text: "Premium products and excellent service. Worth every dirham." }
                  ].map((rev, idx) => (
                    <div key={`${loopIdx}-${idx}`} style={{
                      flex: isMobile ? "0 0 85%" : "0 0 380px",
                      background: "#1A1A1A", padding: "40px",
                      display: "flex", flexDirection: "column", gap: 25, borderTop: "4px solid #D4AF37",
                      position: "relative"
                    }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: -10 }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />)}
                      </div>
                      <Quote size={32} color="#D4AF37" style={{ opacity: 0.8 }} />
                      <p style={{
                        fontSize: 16, color: "#eee", lineHeight: 1.8, margin: 0,
                        fontStyle: "italic", fontWeight: 300
                      }}>
                        "{rev.text}"
                      </p>
                      <div style={{ marginTop: "auto", display: "flex", gap: 15, alignItems: "center" }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%", background: "#D4AF37",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#000", fontWeight: "bold", fontSize: 14
                        }}>
                          {rev.initial}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{rev.name}</div>
                          <div style={{ fontSize: 12, color: "#666" }}>
                            {rev.location} • Google Reviews
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: isMobile ? 15 : 40, marginTop: 50, color: "#D4AF37",
            fontSize: isMobile ? 10 : 13, fontWeight: 700, letterSpacing: "0.2em"
          }}>
            <span>4.9 / 5 ON GOOGLE</span>
            <span style={{ fontSize: 10 }}>♦</span>
            <span>1,000+ MEN SERVED</span>
            <span style={{ fontSize: 10 }}>♦</span>
            <span>AJMAN</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="ws-section" style={{ background: "#F5F0E8", color: "#3D3D3D", padding: "80px 0 20px" }}>
        <div className="ws-container">
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "60% 40%",
                gap: isMobile ? 40 : 80,
                alignItems: "center",
              }}
            >

              <div>
                <h2
                  className="bebas"
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    color: "#111",
                    margin: "0 0 20px",
                    lineHeight: 1,
                  }}
                >
                  About SAM Gents Salon
                </h2>
                {[
                  "SAM Gents Salon wasn't built to be just another barbershop, it was built to be yours.",
                  "Based in Dubai. 15+ internationally trained barbers. One standard: leave looking your sharpest.",
                  "Walk in. Sit down. Leave sharp.",
                ].map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 15,
                      color: "#3D3D3D",
                      lineHeight: 1.85,
                      margin: "0 0 14px",
                    }}
                  >
                    {p}
                  </p>
                ))}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 25 }}>
                  {[
                    "✦ Walk-ins Welcome",
                    "✦ Premium Men's Products",
                  ].map((t) => (
                    <span
                      key={t}
                      style={{
                        border: "1px solid #D4AF37",
                        color: "#D4AF37",
                        padding: "8px 20px",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        fontWeight: "bold",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <img
                src="/about sam salon.jpg"
                alt="About SAM Gents Salon"
                style={{
                  width: "100%",
                  height: isMobile ? 300 : 540,
                  objectFit: "cover",
                  outline: "1px solid #D4AF37",
                  outlineOffset: isMobile ? 10 : 14,
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>


      {/* GALLERY */}
      <section className="ws-section" style={{ background: "#111111", color: "#E8E0D5", padding: "40px 0 100px" }}>
        <div className="ws-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <h2
                className="bebas"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  color: "#fff",
                  margin: 0,
                }}
              >
                THE CUTS SPEAK FOR THEMSELVES
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))",
              gap: 15,
            }}
          >
            {GALLERY.map((src, i) => {
              const isVideo = src.toLowerCase().endsWith(".mp4");
              return (
                <div
                  key={i}
                  className="gallery-item"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    background: "#1A1A1A",
                    borderRadius: 4,
                  }}
                >
                  {isVideo ? (
                    <video
                      className="gallery-img"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                      }}
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      className="gallery-img"
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  )}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(212,175,55,0.2)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    <ZoomIn size={32} color="#fff" />
                  </div>
                </div>
              );
            })}
          </div>
          <a
            href="https://www.instagram.com/samgentssalon"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 40,
              fontSize: 13,
              color: "#888",
              textDecoration: "none",
              transition: "opacity 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            <Instagram size={18} color="#D4AF37" />
            <span>Follow our work on Instagram</span>
            <span style={{ color: "#D4AF37", fontWeight: 600 }}>@samgentssalon</span>
            <ArrowRight size={14} color="#D4AF37" />
          </a>
        </div>
      </section>



      {/* PRICING */}
      <section id="pricing" className="ws-section" style={{ background: "#111111", padding: "60px 0 100px" }}>
        <div className="ws-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2
                className="bebas"
                style={{
                  fontSize: "clamp(36px, 5vw, 68px)",
                  color: "#fff",
                  margin: "16px 0 14px",
                }}
              >
                BOOK ANY SERVICE
              </h2>
              <div style={{ display: "flex", justifyContent: "center" }}>

              </div>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 0,
              marginTop: 40,
            }}
          >
            {[
              {
                title: "ESSENTIALS",
                priceD: "from AED 40",
                desc: "Your everyday sharp-up, done right.",
                items: PRICING.essentials,
                bg: "#1A1A1A",
                accent: "#D4AF37",
                light: false,
              },
              {
                title: "SIGNATURE",
                priceD: "from AED 150",
                desc: "Our most popular grooming combos — cut, beard, ritual.",
                items: PRICING.signature,
                bg: "#D4AF37",
                accent: "#111",
                light: true,
                popular: true,
              },
              {
                title: "PREMIUM",
                priceD: "from AED 300",
                desc: "Full transformations and specialist men's treatments.",
                items: PRICING.premium,
                bg: "#1A1A1A",
                accent: "#D4AF37",
                light: false,
                bordered: true,
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: card.bg,
                  padding: "48px 40px",
                  border: card.bordered ? "1px solid #D4AF37" : "1px solid #2A2A2A",
                  position: "relative",
                }}
              >
                {card.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      background: "#fff",
                      color: "#111",
                      padding: "4px 12px",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  style={{
                    fontSize: 11,
                    color: card.light ? "#111" : "#D4AF37",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </div>
                <div
                  className="bebas"
                  style={{
                    fontSize: 46,
                    color: card.light ? "#111" : "#fff",
                    margin: "12px 0 8px",
                  }}
                >
                  {card.priceD}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: card.light ? "rgba(0,0,0,0.65)" : "#888",
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
                <div
                  style={{
                    height: 1,
                    background: card.light ? "rgba(0,0,0,0.15)" : "#2A2A2A",
                    margin: "28px 0",
                  }}
                />
                {card.items.map(([name, dPrice]) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      borderBottom: card.light
                        ? "1px solid rgba(0,0,0,0.12)"
                        : "1px solid #222",
                      padding: "12px 0",
                      fontSize: 14,
                      color: card.light ? "#111" : "#E8E0D5",
                    }}
                  >
                    <span>{name}</span>
                    <span
                      style={{
                        color: card.light ? "#111" : "#D4AF37",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dPrice}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: 28 }}>
                  {card.light ? (
                    <button
                      onClick={() => openBook()}
                      style={{
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        padding: "14px 28px",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        cursor: "pointer",
                        width: "100%",
                        fontFamily: "Inter",
                      }}
                    >
                      BOOK NOW
                    </button>
                  ) : (
                    <GoldButton outlined onClick={() => openBook()} full>
                      BOOK NOW
                    </GoldButton>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OFFER BANNER */}
      <section
        style={{
          minHeight: 300,
          padding: "60px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #5C3D0A 0%, #D4AF37 50%, #5C3D0A 100%)",
          backgroundSize: "200% 200%",
          animation: "ws-shimmer 6s infinite",
        }}
      >
        <div style={{ maxWidth: 900 }}>
          <h2
            className="bebas"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "#fff",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            NEW TO SAM GENTS SALON? 20% OFF YOUR FIRST CUT
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              marginTop: 18,
              lineHeight: 1.7,
            }}
          >
            Valid for new male clients at our Dubai barbershop. No code needed —
            just mention it when you WhatsApp to book your chair.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => openBook()}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "15px 36px",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "Inter",
              }}
            >
              <MessageCircle size={16} color="#25D366" />
              BOOK ON WHATSAPP
            </button>
            <button
              onClick={() => window.location.href = `tel:${loc.phone.replace(/\s/g, '')}`}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1.5px solid #fff",
                padding: "15px 36px",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter",
              }}
            >
              CALL TO BOOK
            </button>
          </div>
        </div>
      </section>

      {/* LOCATIONS & CONTACT */}
      <section id="contact" className="ws-section" style={{ background: "#F5F0E8", color: "#3D3D3D" }}>
        <div className="ws-container">
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "55% 45%",
                gap: isMobile ? 40 : 80,
              }}
            >
              <div>
                <div className="eyebrow">FIND US</div>
                <h2
                  className="bebas"
                  style={{
                    fontSize: "clamp(36px, 5vw, 68px)",
                    color: "#111",
                    margin: "16px 0 24px",
                  }}
                >
                  VISIT SAM GENTS SALON
                </h2>

                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { Icon: MapPin, color: "#D4AF37", text: loc.address },
                    { Icon: Phone, color: "#D4AF37", text: loc.phone },
                    { Icon: Clock, color: "#D4AF37", text: loc.hours },
                    {
                      Icon: MessageCircle,
                      color: "#25D366",
                      text: `WhatsApp: ${loc.whatsapp}`,
                    },
                  ].map(({ Icon, color, text }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <Icon size={20} color={color} />
                      <span style={{ fontSize: 15, color: "#3D3D3D", whiteSpace: "pre-line" }}>{text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                  <button
                    onClick={() => window.location.href = `tel:${loc.phone.replace(/\s/g, '')}`}
                    style={{
                      background: "#D4AF37",
                      color: "#111",
                      border: "none",
                      padding: "14px 28px",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "Inter",
                    }}
                  >
                    CALL NOW
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(googleMapsDirectionsUrl(loc.mapSearchQuery), "_blank", "noopener,noreferrer")
                    }
                    style={{
                      background: "transparent",
                      color: "#D4AF37",
                      border: "1.5px solid #D4AF37",
                      padding: "14px 28px",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "Inter",
                    }}
                  >
                    GET DIRECTIONS <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              <div
                style={{
                  height: 420,
                  minHeight: 380,
                  background: "#E5E3DF",
                  border: "1px solid #D4AF37",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <iframe
                  key={location}
                  title={`SAM Gents Salon ${loc.label} — Google Map`}
                  src={
                    loc.mapEmbedSrc ??
                    googleMapsEmbedSrc(
                      loc.mapSearchQuery,
                      "en",
                      loc.mapZoom,
                    )
                  }
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{
                    border: 0,
                    display: "block",
                    width: "100%",
                    height: "100%",
                    minHeight: 380,
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0D0D0D", padding: isMobile ? "60px 20px 30px" : "80px 80px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr",
              gap: 48,
            }}
          >
            <div>
              <div
                className="bebas"
                style={{ fontSize: 30, color: "#D4AF37", letterSpacing: "0.2em" }}
              >
                SAM GENTS SALON
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  marginTop: 4,
                }}
              >
                GROOMING • BARBERSHOP
              </div>
              <div className="bebas" style={{ fontSize: 18, color: "#888", marginTop: 14 }}>
                YOUR LOOK. OUR CRAFT.
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                {[Instagram, Facebook, MessageCircle, Youtube].map((Icon, i) => (
                  <Icon
                    key={i}
                    size={18}
                    className="social-icon"
                    color="#D4AF37"
                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  />
                ))}
              </div>
            </div>

            {[
              {
                title: "SERVICES",
                items: [
                  "Haircut & Styling",
                  "Beard Trim",
                  "Hot Towel Shave",
                  "Hair Colour",
                  "Grooming Packages",
                  "Scalp Treatments",
                  "Boys' Haircuts",
                  "VIP Packages",
                ],
              },
              {
                title: "EXPLORE",
                items: [
                  "Home",
                  "About",
                  "Our Work",
                  "Meet the Barbers",
                  "Pricing",
                  "Dubai",
                  "Contact",
                ],
              },
              {
                title: "GET IN TOUCH",
                items: [
                  "Wavez by Danube Building, Wadi Al Safa 2, Liwan, Dubai",
                  loc.phone,
                  "hello@samgentssalon.com",
                  "Sat–Sun: 9am – 10pm",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#D4AF37",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    fontWeight: 600,
                    marginBottom: 18,
                  }}
                >
                  {col.title}
                </div>
                {col.items.map((it) => (
                  <div
                    key={it}
                    className="footer-link"
                    style={{
                      fontSize: 13,
                      color: "#666",
                      lineHeight: 2.2,
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "#1E1E1E", margin: "48px 0 24px" }} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 11,
              color: "#444",
            }}
          >
            <div>© 2026 SAM Gents Salon. All Rights Reserved.</div>
            <div style={{ display: "flex", gap: 16 }}>
              <span className="footer-link" style={{ cursor: "pointer", transition: "color 0.3s" }}>
                Privacy Policy
              </span>
              <span className="footer-link" style={{ cursor: "pointer", transition: "color 0.3s" }}>
                Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      {isMobile && (
        <button
          onClick={() => openBook()}
          style={{
            position: "fixed",
            bottom: 24,
            right: 20,
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            padding: "13px 22px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: 600,
            cursor: "pointer",
            zIndex: 999,
            animation: "ws-pulse 2.5s infinite",
            fontFamily: "Inter",
          }}
        >
          <MessageCircle size={18} />
          BOOK NOW
        </button>
      )}

      {/* BOOKING MODAL */}
      <BookingModal
        open={bookOpen}
        onClose={() => {
          setBookOpen(false);
          setSelectedService(null);
        }}
        location={location}
        setLocation={setLocation}
        initialService={selectedService}
      />
    </div>
  );
}

function BookingModal({
  open,
  onClose,
  location,
  setLocation,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  location: LocationKey;
  setLocation: (l: LocationKey) => void;
  initialService?: string | null;
}) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [barber, setBarber] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (open) {
      if (initialService) {
        setService(initialService);
      }
    } else {
      setTimeout(() => {
        setStep(0);
        setService(null);
        setBarber(null);
        setDate(null);
        setTime(null);
        setName("");
        setPhone("");
      }, 300);
    }
  }, [open, initialService]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  const times = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

  const summary = `Booking at SAM Gents Salon ${LOCATIONS[location].label}\nService: ${service}\nBarber: ${barber}\nDate: ${date}\nTime: ${time}\nName: ${name}\nPhone: ${phone}`;
  const waLink = `https://wa.me/${LOCATIONS[location].whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: step === 4 ? "#D4AF37" : "#1A1A1A",
              color: step === 4 ? "#111" : "#fff",
              maxWidth: 560,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "40px 36px",
              border: "1px solid #D4AF37",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                color: step === 4 ? "#111" : "#D4AF37",
                cursor: "pointer",
              }}
            >
              <X size={24} />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div>
                    <div className="eyebrow">STEP 1 / 4</div>
                    <h3 className="bebas" style={{ fontSize: 38, margin: "10px 0 24px", color: "#fff" }}>
                      CHOOSE A SERVICE
                    </h3>
                    {SERVICES.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => {
                          setService(s.name);
                          next();
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "16px 20px",
                          background: service === s.name ? "#D4AF37" : "transparent",
                          color: service === s.name ? "#111" : "#E8E0D5",
                          border: "1px solid #333",
                          marginBottom: 8,
                          cursor: "pointer",
                          fontSize: 14,
                          fontFamily: "Inter",
                        }}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <div className="eyebrow">STEP 2 / 4</div>
                    <h3 className="bebas" style={{ fontSize: 38, margin: "10px 0 24px", color: "#fff" }}>
                      CHOOSE YOUR BARBER
                    </h3>
                    {[...BARBERS.map((b) => b.name), "No preference"].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setBarber(n);
                          next();
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "16px 20px",
                          background: barber === n ? "#D4AF37" : "transparent",
                          color: barber === n ? "#111" : "#E8E0D5",
                          border: "1px solid #333",
                          marginBottom: 8,
                          cursor: "pointer",
                          fontSize: 14,
                          fontFamily: "Inter",
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="eyebrow">STEP 3 / 4</div>
                    <h3 className="bebas" style={{ fontSize: 38, margin: "10px 0 24px", color: "#fff" }}>
                      PICK DATE & TIME
                    </h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: 6,
                        marginBottom: 20,
                      }}
                    >
                      {days.map((d) => {
                        const label = `${d.toLocaleDateString("en", { weekday: "short" })} ${d.getDate()}`;
                        const sel = date === label;
                        return (
                          <button
                            key={label}
                            onClick={() => setDate(label)}
                            style={{
                              padding: "10px 4px",
                              background: sel ? "#D4AF37" : "#222",
                              color: sel ? "#111" : "#E8E0D5",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 11,
                              fontFamily: "Inter",
                              fontWeight: sel ? 700 : 400,
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 8,
                      }}
                    >
                      {times.map((t) => {
                        const sel = time === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            style={{
                              padding: 12,
                              background: sel ? "#D4AF37" : "#222",
                              color: sel ? "#111" : "#E8E0D5",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 13,
                              fontFamily: "Inter",
                              fontWeight: sel ? 700 : 400,
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                      <button
                        onClick={back}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: "transparent",
                          color: "#D4AF37",
                          border: "1px solid #D4AF37",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontSize: 11,
                        }}
                      >
                        <ChevronLeft size={14} style={{ verticalAlign: "middle" }} /> Back
                      </button>
                      <button
                        onClick={next}
                        disabled={!date || !time}
                        style={{
                          flex: 2,
                          padding: "14px",
                          background: !date || !time ? "#444" : "#D4AF37",
                          color: "#111",
                          border: "none",
                          cursor: !date || !time ? "not-allowed" : "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <div className="eyebrow">STEP 4 / 4</div>
                    <h3 className="bebas" style={{ fontSize: 38, margin: "10px 0 24px", color: "#fff" }}>
                      YOUR DETAILS
                    </h3>
                    <input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 14,
                        background: "#222",
                        border: "1px solid #333",
                        color: "#fff",
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: "Inter",
                      }}
                    />
                    <input
                      placeholder="WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 14,
                        background: "#222",
                        border: "1px solid #333",
                        color: "#fff",
                        marginBottom: 20,
                        fontSize: 14,
                        fontFamily: "Inter",
                      }}
                    />
                    <div
                      style={{
                        background: "#0F0F0F",
                        padding: 20,
                        border: "1px solid #2A2A2A",
                        marginBottom: 20,
                        fontSize: 13,
                        color: "#888",
                        lineHeight: 1.9,
                      }}
                    >
                      <div>📍 {LOCATIONS[location].label}</div>
                      <div>✂ {service}</div>
                      <div>👤 {barber}</div>
                      <div>📅 {date} @ {time}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={back}
                        style={{
                          flex: 1,
                          padding: 14,
                          background: "transparent",
                          color: "#D4AF37",
                          border: "1px solid #D4AF37",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontSize: 11,
                        }}
                      >
                        Back
                      </button>
                      <button
                        onClick={next}
                        disabled={!name || !phone}
                        style={{
                          flex: 2,
                          padding: 14,
                          background: !name || !phone ? "#444" : "#D4AF37",
                          color: "#111",
                          border: "none",
                          cursor: !name || !phone ? "not-allowed" : "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div style={{ textAlign: "center" }}>
                    <h3 className="bebas" style={{ fontSize: 48, color: "#111", margin: "10px 0 20px" }}>
                      YOUR CHAIR IS RESERVED.
                    </h3>
                    <div
                      style={{
                        background: "rgba(0,0,0,0.08)",
                        padding: 20,
                        marginBottom: 24,
                        textAlign: "left",
                        fontSize: 14,
                        color: "#111",
                        lineHeight: 2,
                      }}
                    >
                      <div><b>Location:</b> SAM Gents Salon {LOCATIONS[location].label}</div>
                      <div><b>Service:</b> {service}</div>
                      <div><b>Barber:</b> {barber}</div>
                      <div><b>Date:</b> {date} @ {time}</div>
                      <div><b>Name:</b> {name}</div>
                      <div><b>WhatsApp:</b> {phone}</div>
                    </div>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        background: "#111",
                        color: "#fff",
                        padding: "16px 32px",
                        textDecoration: "none",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontWeight: 700,
                      }}
                    >
                      <MessageCircle size={16} color="#25D366" />
                      Confirm on WhatsApp
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
