import { useRef, useState } from "react";
import { Upload, X, Loader2, Check } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageDropzone({ value, onChange, label = "Drop image or click to browse" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {!value ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className="border-2 border-dashed border-[#2a2a2a] bg-[#111111] rounded-lg p-8 text-center cursor-pointer hover:border-campusGreen-600 transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-campusGreen-600" />
          ) : (
            <>
              <Upload className="w-8 h-8 mx-auto text-campusGreen-600 mb-2" />
              <div className="text-neutral-400 text-sm">{label}</div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <img src={value} alt="preview" className="w-full h-48 object-cover rounded-lg" />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-campusGreen-600 text-white flex items-center gap-1">
              <Check className="w-3 h-3" /> Uploaded
            </span>
            <input readOnly value={value} className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1 text-xs text-neutral-500" />
            <button
              onClick={() => onChange("")}
              className="p-1.5 rounded bg-red-600/20 text-red-500 hover:bg-red-600/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
