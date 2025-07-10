export default function Footer() {
  return (
    <footer className="mt-auto flex w-full justify-center">
      <div className="border-accent/20 text-text/60 mt-auto flex w-full max-w-4xl justify-center border-t pt-8 text-center text-sm">
        <p className="font-mono">
          © {new Date().getFullYear()} Saksham Kushwaha{" "}
          <span className="text-accent">{"// lirena00"}</span>
        </p>
      </div>
    </footer>
  );
}
