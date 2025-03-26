import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-auto flex w-full justify-center">
      <div className="mt-auto flex w-full max-w-4xl justify-center border-t border-accent/20 pt-8 text-center text-sm text-text/60">
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
    </footer>
  );
}
