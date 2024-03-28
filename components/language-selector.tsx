import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages: SupportedLanguage[] = [
  { label: "Detect language", code: "auto" },
  { label: "English", code: "en" },
  { label: "Spanish", code: "es" },
  { label: "French", code: "fr" },
  { label: "German", code: "de" },
];

type Props = {
  language: LanguageCode;
  setLanguage: (newLanguage: LanguageCode) => void;
};

export default function LanguageSelector({ language, setLanguage }: Props) {
  return (
    <Select
      onValueChange={(newLanguage) => setLanguage(newLanguage as LanguageCode)}
      defaultValue={language}
      value={language}
    >
      <SelectTrigger className="w-[180px] border-primary">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        {languages.map(({ label, code }) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
