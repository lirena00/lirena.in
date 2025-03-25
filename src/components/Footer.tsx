import Link from "next/link";
export default function Footer() {
  return (
    <div className="border-t border-accent/20 pt-8 text-center text-sm text-text/60">
      <p className="font-mono">
        © {new Date().getFullYear()} Saksham Kushwaha{" "}
        <Link
          href="https://buymeacoffee.com/lirena00"
          target="_blank"
          className="transition-colors hover:text-accent"
        >
          <span className="text-accent">{"// lirena00"}</span>
        </Link>
      </p>
    </div>
  );
}
