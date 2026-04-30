import { useEffect, useRef, useState, useMemo } from "react";
import {
  RefreshCw,
  Info,
  Barcode,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

declare global {
  interface Window {
    JsBarcode: any;
  }
}

const BARCODE_FORMATS = [
  { id: "CODE128", label: "CODE128" },
  { id: "CODE39", label: "CODE39" },
  { id: "EAN13", label: "EAN-13" },
  { id: "EAN8", label: "EAN-8" },
  { id: "UPC", label: "UPC-A" },
  { id: "ITF14", label: "ITF-14" },
  { id: "MSI", label: "MSI" },
  { id: "pharmacode", label: "Pharma" },
  { id: "codabar", label: "Codabar" },
];

const FORMAT_DEFAULTS: Record<string, string> = {
  CODE128: "Hello-World",
  CODE39: "HELLO WORLD",
  EAN13: "1234567890128",
  EAN8: "12345670",
  UPC: "123456789012",
  ITF14: "12345678901231",
  MSI: "1234567",
  pharmacode: "1234",
  codabar: "A12345B",
};

const TEXT_ALIGNMENTS = [
  { id: "left", label: "Left", icon: <AlignLeft className="w-4 h-4" /> },
  {
    id: "center",
    label: "Center",
    icon: <AlignCenter className="w-4 h-4" />,
  },
  { id: "right", label: "Right", icon: <AlignRight className="w-4 h-4" /> },
];

const TEXT_POSITIONS = [
  { id: "bottom", label: "Bottom" },
  { id: "top", label: "Top" },
];

const FONT_OPTIONS = [
  { id: "monospace", label: "Mono" },
  { id: "serif", label: "Serif" },
  { id: "sans-serif", label: "Sans" },
  { id: "OCR-B", label: "OCR-B" },
  { id: "fantasy", label: "Fantasy" },
];

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-xs text-slate-400">{value.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9"
        />
        <label className="relative h-9 w-10 shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label={label}
          />
          <span
            className="block h-9 w-10 rounded-md border border-slate-200"
            style={{ backgroundColor: value }}
          />
        </label>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-xs font-mono text-slate-400">{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(nextValue) =>
          onChange(Array.isArray(nextValue) ? nextValue[0] : nextValue)
        }
        className="w-full"
      />
    </div>
  );
}

function loadJsBarcode(): Promise<void> {
  return new Promise((resolve) => {
    if (window.JsBarcode) return resolve();
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.6/JsBarcode.all.min.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export default function BarcodeStyling({
  dataBarcode = "Hello-World",
}: {
  dataBarcode?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [format, setFormat] = useState("CODE128");
  const [value, setValue] = useState(dataBarcode);
  const [inputValue, setInputValue] = useState(dataBarcode);
  const [jsLoaded, setJsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Display
  const [displayValue, setDisplayValue] = useState(true);
  const [textAlign, setTextAlign] = useState("center");
  const [textPosition, setTextPosition] = useState("bottom");
  const [font, setFont] = useState("monospace");

  // Colors
  const [lineColor, setLineColor] = useState("#0f172a");
  const [background, setBackground] = useState("#ffffff");

  // Sizing
  const [barWidth, setBarWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [fontSize, setFontSize] = useState(20);
  const [margin, setMargin] = useState(10);
  const [textMargin, setTextMargin] = useState(2);

  // Font styling
  const [fontBold, setFontBold] = useState(false);
  const [fontItalic, setFontItalic] = useState(false);

  const fontOptions = [fontBold ? "bold" : "", fontItalic ? "italic" : ""]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    loadJsBarcode().then(() => setJsLoaded(true));
  }, []);

  useEffect(() => {
    if (!jsLoaded || !svgRef.current) return;
    try {
      window.JsBarcode(svgRef.current, value, {
        format,
        width: barWidth,
        height,
        displayValue,
        fontOptions,
        font,
        textAlign,
        textPosition,
        textMargin,
        fontSize,
        background,
        lineColor,
        margin,
        valid: (v: boolean) => setHasError(!v),
      });
      setHasError(false);
    } catch {
      setHasError(true);
    }
  }, [
    jsLoaded,
    value,
    format,
    barWidth,
    height,
    displayValue,
    fontOptions,
    font,
    textAlign,
    textPosition,
    textMargin,
    fontSize,
    background,
    lineColor,
    margin,
  ]);

  function handleFormatChange(fmt: string) {
    setFormat(fmt);
    const def = FORMAT_DEFAULTS[fmt] ?? "1234";
    setValue(def);
    setInputValue(def);
  }

  function applyValue() {
    setValue(inputValue);
  }

  function reset() {
    setFormat("CODE128");
    setValue("Hello-World");
    setInputValue("Hello-World");
    setDisplayValue(true);
    setTextAlign("center");
    setTextPosition("bottom");
    setFont("monospace");
    setLineColor("#0f172a");
    setBackground("#ffffff");
    setBarWidth(2);
    setHeight(100);
    setFontSize(20);
    setMargin(10);
    setTextMargin(2);
    setFontBold(false);
    setFontItalic(false);
    setHasError(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[580px_1fr] gap-8">
      {/* CONTROLS */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Barcode Styling</CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                Customize format, colors, size, and text options.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={reset}
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="p-6 space-y-8">
              {/* VALUE INPUT */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-slate-900">
                    VALUE
                  </h3>
                  <Info className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyValue()}
                    placeholder="Enter barcode value…"
                    className={cn("h-9", hasError && "border-red-400")}
                  />
                  <Button size="sm" onClick={applyValue} className="shrink-0">
                    Apply
                  </Button>
                </div>
                {hasError && (
                  <p className="text-xs text-red-500">
                    Invalid value for selected format.
                  </p>
                )}
              </section>

              {/* FORMAT */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-slate-900">
                    FORMAT
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {BARCODE_FORMATS.map((f) => {
                    const active = f.id === format;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleFormatChange(f.id)}
                        className={cn(
                          "h-11 rounded-lg border px-3 flex items-center justify-center transition-colors text-sm font-semibold",
                          active
                            ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                        )}
                        aria-pressed={active}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* COLORS */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold tracking-wide text-slate-900">
                  COLORS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ColorPicker
                    label="Bar Color"
                    value={lineColor}
                    onChange={setLineColor}
                  />
                  <ColorPicker
                    label="Background"
                    value={background}
                    onChange={setBackground}
                  />
                </div>
              </section>

              {/* SIZE */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold tracking-wide text-slate-900">
                  SIZE
                </h3>
                <SliderRow
                  label="Bar Width"
                  value={barWidth}
                  min={1}
                  max={6}
                  step={0.5}
                  onChange={setBarWidth}
                />
                <SliderRow
                  label="Height"
                  value={height}
                  min={20}
                  max={200}
                  step={5}
                  onChange={setHeight}
                />
                <SliderRow
                  label="Margin"
                  value={margin}
                  min={0}
                  max={40}
                  step={2}
                  onChange={setMargin}
                />
              </section>

              {/* TEXT */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold tracking-wide text-slate-900">
                  TEXT
                </h3>

                {/* Display toggle */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3">
                  <div className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-800">
                      Show Value
                    </span>
                    <span className="text-xs text-slate-500">
                      Display the barcode text below.
                    </span>
                  </div>
                  <Switch
                    checked={displayValue}
                    onCheckedChange={setDisplayValue}
                  />
                </div>

                {displayValue && (
                  <>
                    {/* Position */}
                    <div className="grid grid-cols-2 gap-2">
                      {TEXT_POSITIONS.map((p) => {
                        const active = p.id === textPosition;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setTextPosition(p.id)}
                            className={cn(
                              "h-10 rounded-lg border text-sm font-semibold transition-colors",
                              active
                                ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                            )}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Alignment */}
                    <div className="grid grid-cols-3 gap-2">
                      {TEXT_ALIGNMENTS.map((a) => {
                        const active = a.id === textAlign;
                        return (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => setTextAlign(a.id)}
                            className={cn(
                              "h-10 rounded-lg border flex items-center justify-center gap-2 text-sm font-semibold transition-colors",
                              active
                                ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600",
                            )}
                          >
                            {a.icon}
                          </button>
                        );
                      })}
                    </div>

                    {/* Font */}
                    <div className="grid grid-cols-5 gap-2">
                      {FONT_OPTIONS.map((f) => {
                        const active = f.id === font;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFont(f.id)}
                            className={cn(
                              "h-10 rounded-lg border text-xs font-semibold transition-colors",
                              active
                                ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                            )}
                            style={{ fontFamily: f.id }}
                          >
                            {f.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Font style toggles */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFontBold((v) => !v)}
                        className={cn(
                          "h-10 w-12 rounded-lg border text-sm font-bold transition-colors",
                          fontBold
                            ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                        )}
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontItalic((v) => !v)}
                        className={cn(
                          "h-10 w-12 rounded-lg border text-sm italic font-semibold transition-colors",
                          fontItalic
                            ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                        )}
                      >
                        I
                      </button>
                    </div>

                    <SliderRow
                      label="Font Size"
                      value={fontSize}
                      min={8}
                      max={40}
                      step={1}
                      onChange={setFontSize}
                    />
                    <SliderRow
                      label="Text Margin"
                      value={textMargin}
                      min={0}
                      max={20}
                      step={1}
                      onChange={setTextMargin}
                    />
                  </>
                )}
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* PREVIEW */}
      <div className="lg:sticky lg:top-8 h-fit">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold tracking-wide text-slate-900">
                PREVIEW
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={reset}
              >
                <RefreshCw className="w-4 h-4" /> Reset Design
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div
                className="p-6 border border-slate-100 rounded-2xl flex items-center justify-center min-h-40"
                style={{ backgroundColor: background }}
              >
                {hasError ? (
                  <p className="text-sm text-red-500 text-center px-4">
                    Invalid value for <strong>{format}</strong>.<br />
                    Try changing the value or format.
                  </p>
                ) : (
                  <svg ref={svgRef} />
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Barcode className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {value}
                  </p>
                  <p className="text-xs text-slate-500">
                    Format: {format} · Real-time preview updates as you
                    customize.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
