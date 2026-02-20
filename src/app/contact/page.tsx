export const metadata = {
  title: "Contact Us | LENCA",
  description: "Reservations and contact information for LENCA.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#111] pt-32 pb-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-gilda text-4xl sm:text-5xl lg:text-6xl text-[#f5f0e8] tracking-wide">
          Contact Us
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-[#c9a962]/60 sm:w-24" aria-hidden />
          <span className="text-[#c9a962]" aria-hidden>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="opacity-80">
              <path d="M6 2L4 6h4L6 2zm0 4L4 10h4L6 6z" />
            </svg>
          </span>
          <span className="h-px w-16 bg-[#c9a962]/60 sm:w-24" aria-hidden />
        </div>
        <p className="mt-8 font-barlow text-lg text-[#a39e94] max-w-2xl mx-auto">
          Reservations and inquiries—we&apos;d love to hear from you. Reach out for bookings, private events, or any questions.
        </p>
      </div>
    </main>
  );
}
