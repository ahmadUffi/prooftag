import { useEffect, useMemo, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import {
  Info,
  RefreshCw,
  Upload,
  Scan,
  Globe,
  Sticker,
  Square,
  Dot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const DEFAULT_QR_COLOR = "#0f172a";
const DEFAULT_BG_COLOR = "#ffffff";

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const LOGO_PRESETS = [
  {
    id: "none",
    label: "None",
    icon: <Sticker className="w-4 h-4" />,
    image: "",
  },
  {
    id: "scan-me",
    label: "Scan",
    icon: <Scan className="w-4 h-4" />,
    image: svgToDataUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
        <rect x="16" y="16" width="188" height="188" rx="36" fill="#ffffff"/>
        <rect x="16" y="16" width="188" height="188" rx="36" fill="none" stroke="#0f172a" stroke-width="10"/>
        <text x="110" y="128" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="54" font-weight="900" fill="#0f172a">SCAN</text>
        <text x="110" y="174" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="54" font-weight="900" fill="#0f172a">ME</text>
      </svg>`,
    ),
  },
  {
    id: "globe",
    label: "Globe",
    icon: <Globe className="w-4 h-4" />,
    image: svgToDataUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2563eb"/>
            <stop offset="1" stop-color="#22c55e"/>
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r="88" fill="url(#g)"/>
        <circle cx="110" cy="110" r="88" fill="none" stroke="#0f172a" stroke-width="10" opacity="0.25"/>
        <path d="M22 110h176" stroke="#ffffff" stroke-width="10" opacity="0.9"/>
        <path d="M110 22c24 24 38 56 38 88s-14 64-38 88" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.9"/>
        <path d="M110 22c-24 24-38 56-38 88s14 64 38 88" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.9"/>
      </svg>`,
    ),
  },
];

const DOT_SHAPES = [
  { id: "square", label: "Square", icon: <Square className="w-4 h-4" /> },
  { id: "dots", label: "Dots", icon: <Dot className="w-4 h-4" /> },
  {
    id: "rounded",
    label: "Rounded",
    icon: <span className="w-4 h-4 rounded-md border border-current" />,
  },
  {
    id: "classy",
    label: "Classy",
    icon: (
      <span className="w-4 h-4 rounded-sm border border-current rotate-45" />
    ),
  },
  {
    id: "classy-rounded",
    label: "Classy Rounded",
    icon: <span className="w-4 h-4 rounded-full border border-current" />,
  },
  {
    id: "extra-rounded",
    label: "Extra Rounded",
    icon: <span className="w-4 h-4 rounded-full bg-current/20" />,
  },
];

const CORNER_SQUARE_STYLES = [
  { id: "square", label: "Square" },
  { id: "dot", label: "Dot" },
  { id: "extra-rounded", label: "Extra Rounded" },
  { id: "rounded", label: "Rounded" },
  { id: "classy", label: "Classy" },
  { id: "classy-rounded", label: "Classy Rounded" },
];

const CORNER_DOT_STYLES = [
  { id: "square", label: "Square" },
  { id: "dot", label: "Dot" },
  { id: "rounded", label: "Rounded" },
  { id: "classy", label: "Classy" },
  { id: "classy-rounded", label: "Classy Rounded" },
  { id: "extra-rounded", label: "Extra Rounded" },
];

const FRAME_PRESETS = [
  {
    id: "clean",
    label: "Clean",
    apply: () => ({
      dots: { type: "square" },
      cornersSquare: { type: "square" },
      cornersDot: { type: "square" },
      bgRound: 0,
      imageSize: 0.4,
      imageMargin: 8,
    }),
  },
  {
    id: "soft",
    label: "Soft",
    apply: () => ({
      dots: { type: "rounded" },
      cornersSquare: { type: "extra-rounded" },
      cornersDot: { type: "dot" },
      bgRound: 0.12,
      imageSize: 0.42,
      imageMargin: 10,
    }),
  },
  {
    id: "classy",
    label: "Classy",
    apply: () => ({
      dots: { type: "classy" },
      cornersSquare: { type: "classy" },
      cornersDot: { type: "dot" },
      bgRound: 0.08,
      imageSize: 0.38,
      imageMargin: 8,
    }),
  },
  {
    id: "round",
    label: "Round",
    apply: () => ({
      dots: { type: "dots" },
      cornersSquare: { type: "dot" },
      cornersDot: { type: "dot" },
      bgRound: 0.5,
      imageSize: 0.44,
      imageMargin: 12,
    }),
  },
  {
    id: "bold",
    label: "Bold",
    apply: () => ({
      dots: { type: "extra-rounded" },
      cornersSquare: { type: "square" },
      cornersDot: { type: "square" },
      bgRound: 0.06,
      imageSize: 0.36,
      imageMargin: 6,
    }),
  },
  {
    id: "minimal",
    label: "Minimal",
    apply: () => ({
      dots: { type: "square" },
      cornersSquare: { type: "extra-rounded" },
      cornersDot: { type: "dot" },
      bgRound: 0.04,
      imageSize: 0.4,
      imageMargin: 10,
    }),
  },
];

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: any;
  value: any;
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

export default function QrStyling({
  dataQr = "https://prooftag.xyz/product/1234567890",
}: {
  dataQr?: string;
}) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [framePreset, setFramePreset] = useState("soft");
  const [logoPreset, setLogoPreset] = useState("none");
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");

  const [dotsType, setDotsType] = useState("rounded");
  const [qrColor, setQrColor] = useState(DEFAULT_QR_COLOR);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);

  const [cornersSquareType, setCornersSquareType] = useState("extra-rounded");
  const [cornersDotType, setCornersDotType] = useState("dot");
  const [cornersUseQrColor, setCornersUseQrColor] = useState(true);
  const [cornersColor, setCornersColor] = useState(DEFAULT_QR_COLOR);

  const [bgRound, setBgRound] = useState(0.12);
  const [imageSize, setImageSize] = useState(0.42);
  const [imageMargin, setImageMargin] = useState(10);

  const logoImage = useMemo(() => {
    if (uploadedLogoUrl) return uploadedLogoUrl;
    const preset = LOGO_PRESETS.find((p) => p.id === logoPreset);
    return preset?.image || "";
  }, [logoPreset, uploadedLogoUrl]);

  const effectiveCornersColor = cornersUseQrColor ? qrColor : cornersColor;

  const qrOptions = useMemo(
    () => ({
      width: 320,
      height: 320,
      type: "svg",
      data: dataQr,
      image: logoImage || undefined,
      dotsOptions: {
        type: dotsType,
        color: qrColor,
      },
      cornersSquareOptions: {
        type: cornersSquareType,
        color: effectiveCornersColor,
      },
      cornersDotOptions: {
        type: cornersDotType,
        color: effectiveCornersColor,
      },
      backgroundOptions: {
        color: bgColor,
        round: bgRound,
      },
      imageOptions: {
        imageSize,
        margin: imageMargin,
      },
    }),
    [
      bgColor,
      bgRound,
      cornersDotType,
      cornersSquareType,
      dotsType,
      effectiveCornersColor,
      imageMargin,
      imageSize,
      logoImage,
      qrColor,
    ],
  );

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(qrOptions);
    } else {
      qrRef.current.update(qrOptions);
    }
  }, [qrOptions]);

  useEffect(() => {
    if (!previewRef.current || !qrRef.current) return;
    previewRef.current.innerHTML = "";
    qrRef.current.append(previewRef.current);
  }, []);

  useEffect(() => {
    if (!previewRef.current || !qrRef.current) return;
    previewRef.current.innerHTML = "";
    qrRef.current.append(previewRef.current);
  }, [logoImage]);

  function applyFramePreset(nextId: string) {
    setFramePreset(nextId);
    const preset = FRAME_PRESETS.find((p) => p.id === nextId);
    if (!preset) return;
    const next = preset.apply();
    setDotsType(next.dots.type);
    setCornersSquareType(next.cornersSquare.type);
    setCornersDotType(next.cornersDot.type);
    setBgRound(next.bgRound);
    setImageSize(next.imageSize);
    setImageMargin(next.imageMargin);
  }

  function resetDesign() {
    setFramePreset("soft");
    setLogoPreset("none");
    setUploadedLogoUrl("");
    setDotsType("rounded");
    setQrColor(DEFAULT_QR_COLOR);
    setBgColor(DEFAULT_BG_COLOR);
    setCornersSquareType("extra-rounded");
    setCornersDotType("dot");
    setCornersUseQrColor(true);
    setCornersColor(DEFAULT_QR_COLOR);
    setBgRound(0.12);
    setImageSize(0.42);
    setImageMargin(10);
  }

  function onUploadLogo(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedLogoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setLogoPreset("none");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[580px_1fr] gap-8">
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">QR Code Styling</CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                Customize frames, logos, shapes, and corners.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={resetDesign}
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="p-6 space-y-8">
              {/* FRAMES */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-slate-900">
                    TEMPLATE
                  </h3>
                  <Info className="w-4 h-4 text-slate-400" />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {FRAME_PRESETS.map((p) => {
                    const active = p.id === framePreset;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => applyFramePreset(p.id)}
                        className={cn(
                          "h-12 rounded-lg border flex items-center justify-center transition-colors",
                          active
                            ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                            : "border-slate-200 bg-white hover:bg-slate-50",
                        )}
                        aria-pressed={active}
                        title={p.label}
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-md border",
                            active
                              ? "border-primary text-primary"
                              : "border-slate-300 text-slate-500",
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500">
                  Frame presets adjust dots/corners/background rounding.
                </p>
              </section>

              {/* LOGOS */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-wide text-slate-900">
                    LOGOS
                  </h3>
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-primary cursor-pointer">
                    <Upload className="w-4 h-4" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onUploadLogo(e.target.files?.[0])}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {LOGO_PRESETS.map((p) => {
                    const active = !uploadedLogoUrl && p.id === logoPreset;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setUploadedLogoUrl((prev) => {
                            if (prev) URL.revokeObjectURL(prev);
                            return "";
                          });
                          setLogoPreset(p.id);
                        }}
                        className={cn(
                          "h-12 rounded-lg border flex items-center justify-center transition-colors",
                          active
                            ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600",
                        )}
                        aria-pressed={active}
                        title={p.label}
                      >
                        {p.icon}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreset("none");
                      setUploadedLogoUrl((prev) => {
                        if (prev) URL.revokeObjectURL(prev);
                        return "";
                      });
                    }}
                    className={cn(
                      "h-12 rounded-lg border flex items-center justify-center transition-colors",
                      uploadedLogoUrl
                        ? "border-primary bg-primary/5 ring-2 ring-primary/15 text-primary"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600",
                    )}
                    aria-pressed={Boolean(uploadedLogoUrl)}
                    title="Uploaded"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* SHAPES */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold tracking-wide text-slate-900">
                  SHAPES
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {DOT_SHAPES.map((s) => {
                    const active = s.id === dotsType;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setDotsType(s.id)}
                        className={cn(
                          "h-12 rounded-lg border px-3 flex items-center justify-between transition-colors",
                          active
                            ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                            : "border-slate-200 bg-white hover:bg-slate-50",
                        )}
                        aria-pressed={active}
                      >
                        <span className="text-sm font-semibold text-slate-700">
                          {s.label}
                        </span>
                        <span
                          className={cn(
                            "text-slate-500",
                            active && "text-primary",
                          )}
                        >
                          {s.icon}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ColorPicker
                    label="QR Code Color"
                    value={qrColor}
                    onChange={setQrColor}
                  />
                  <ColorPicker
                    label="Background Color"
                    value={bgColor}
                    onChange={setBgColor}
                  />
                </div>
              </section>

              {/* CORNERS */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold tracking-wide text-slate-900">
                  CORNERS
                </h3>

                <div className="grid gap-3">
                  <p className="text-xs text-slate-500">
                    Choose corner square + dot styles.
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {CORNER_SQUARE_STYLES.map((c) => {
                      const active = c.id === cornersSquareType;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCornersSquareType(c.id)}
                          className={cn(
                            "h-11 rounded-lg border px-3 flex items-center justify-between transition-colors",
                            active
                              ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          )}
                          aria-pressed={active}
                        >
                          <span className="text-sm font-semibold text-slate-700">
                            {c.label}
                          </span>
                          <span
                            className={cn(
                              "w-4 h-4 border border-current rounded-sm text-slate-500",
                              active && "text-primary",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {CORNER_DOT_STYLES.map((c) => {
                      const active = c.id === cornersDotType;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCornersDotType(c.id)}
                          className={cn(
                            "h-11 rounded-lg border px-3 flex items-center justify-between transition-colors",
                            active
                              ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          )}
                          aria-pressed={active}
                        >
                          <span className="text-sm font-semibold text-slate-700">
                            {c.label}
                          </span>
                          <span
                            className={cn(
                              "w-4 h-4 rounded-full border border-current text-slate-500",
                              active && "text-primary",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3">
                    <div className="grid gap-1">
                      <span className="text-sm font-semibold text-slate-800">
                        Use QR Code color
                      </span>
                      <span className="text-xs text-slate-500">
                        Toggle custom corner color.
                      </span>
                    </div>
                    <Switch
                      checked={cornersUseQrColor}
                      onCheckedChange={setCornersUseQrColor}
                    />
                  </div>

                  {!cornersUseQrColor && (
                    <ColorPicker
                      label="Corner Color"
                      value={cornersColor}
                      onChange={setCornersColor}
                    />
                  )}
                </div>
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
                onClick={resetDesign}
              >
                <RefreshCw className="w-4 h-4" /> Reset Design
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div
                className="p-6 bg-white border border-slate-100 rounded-2xl"
                style={{ backgroundColor: bgColor }}
              >
                <div ref={previewRef} className="w-[320px] h-[320px]" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Scan className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    https://prooftag.app/verify/EXAMPLE
                  </p>
                  <p className="text-xs text-slate-500">
                    Real-time preview updates as you customize.
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
