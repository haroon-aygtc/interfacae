import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChange: (language: string) => void;
  label?: string;
  showDescription?: boolean;
}

export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onChange,
  label = "Language",
  showDescription = true,
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "outline"}
            onClick={() => onChange(lang.code)}
            className="justify-center"
            type="button"
          >
            {lang.name}
          </Button>
        ))}
      </div>
      {showDescription && (
        <p className="text-sm text-muted-foreground">
          Set the default language for the chat widget interface
        </p>
      )}
    </div>
  );
};

export default LanguageSelector;
