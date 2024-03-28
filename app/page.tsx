"use client";
import { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

import LanguageSelector from "@/components/language-selector";
import CopyButton from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
  const [fromLanguage, setFromLanguage] = useState<LanguageCode>("auto");
  const [toLanguage, setToLanguage] = useState<LanguageCode>("en");
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const debouncedFromText = useDebounce(fromText.trim(), 800);

  function swapLanguages() {
    const buffer = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(buffer);
  }

  useEffect(() => {
    if (fromLanguage === toLanguage || debouncedFromText === "") {
      setToText(debouncedFromText);
      return;
    }
    async function translate() {
      setIsTranslating(true);
      const { translation }: { translation: string | null } = await fetch(
        "api/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromLanguage,
            toLanguage,
            text: debouncedFromText,
          }),
        },
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));
      setToText(translation || debouncedFromText);
      setIsTranslating(false);
    }
    translate();
  }, [debouncedFromText, fromLanguage, toLanguage]);

  return (
    <main className="container flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-extralight">GPTranslate</h1>
      <section className="relative flex w-full flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <LanguageSelector
            language={fromLanguage}
            setLanguage={setFromLanguage}
          />
          <Button
            onClick={swapLanguages}
            className="rounded-full px-2"
            title="Swap"
            variant="ghost"
          >
            <ArrowLeftRight size={24} />
          </Button>
          <LanguageSelector language={toLanguage} setLanguage={setToLanguage} />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Textarea
            className="h-full border-2"
            onChange={(e) => setFromText(e.target.value)}
            value={fromText}
          />
          <div className="relative w-full">
            <Textarea
              className={`${
                isTranslating && "text-muted-foreground"
              } h-full border-2`}
              value={isTranslating ? "Translating..." : toText}
              readOnly
            />
            {toText !== "" && (
              <CopyButton className="absolute right-2 top-2" text={toText} />
            )}
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-muted blur-3xl" />
      </section>
    </main>
  );
}
