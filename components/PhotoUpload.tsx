"use client";

import { useId, useRef } from "react";

export type UploadedPhoto = {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  previewUrl: string;
  dataBase64: string;
};

type PhotoUploadProps = {
  photos: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
  error?: string;
  onError: (message: string) => void;
};

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read photo."));
    reader.readAsDataURL(file);
  });
}

export function PhotoUpload({ photos, onChange, error, onError }: PhotoUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    onError("");
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const remainingSlots = MAX_PHOTOS - photos.length;

    if (remainingSlots <= 0) {
      onError(`You can add up to ${MAX_PHOTOS} photos.`);
      event.target.value = "";
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);
    const nextPhotos: UploadedPhoto[] = [];

    for (const file of filesToAdd) {
      if (!file.type.startsWith("image/")) {
        onError("Please choose image files only.");
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        onError("Each photo must be 5 MB or smaller.");
        continue;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);
        const base64 = dataUrl.split(",")[1] ?? "";

        nextPhotos.push({
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          previewUrl: dataUrl,
          dataBase64: base64,
        });
      } catch {
        onError("We could not read one of your photos. Please try again.");
      }
    }

    if (nextPhotos.length > 0) {
      onChange([...photos, ...nextPhotos]);
    }

    event.target.value = "";
  }

  function removePhoto(photoId: string) {
    onChange(photos.filter((item) => item.id !== photoId));
    onError("");
  }

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-base font-semibold text-text">
        Photos <span className="font-normal text-text-muted">(optional)</span>
      </label>
      <p id={`${inputId}-hint`} className="text-sm text-text-muted">
        Add photos if you have them — this helps us understand the issue.
      </p>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        aria-describedby={`${inputId}-hint`}
        className="sr-only"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={photos.length >= MAX_PHOTOS}
        className="flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-council-teal bg-council-teal-light px-4 py-3 text-base font-semibold text-council-navy transition-colors hover:border-council-teal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {photos.length >= MAX_PHOTOS ? "Photo limit reached" : "Choose photos"}
      </button>

      <p className="text-xs text-text-muted">
        Up to {MAX_PHOTOS} photos, 5 MB each.
      </p>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Uploaded photo previews">
          {photos.map((photo) => (
            <li key={photo.id} className="relative overflow-hidden rounded-xl border-2 border-council-teal/40 bg-white">
              <img
                src={photo.previewUrl}
                alt={`Preview of ${photo.fileName}`}
                className="h-28 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="absolute right-2 top-2 min-h-8 min-w-8 rounded-full border-2 border-council-navy bg-white px-2 text-xs font-bold text-council-navy"
                aria-label={`Remove ${photo.fileName}`}
              >
                ✕
              </button>
              <p className="truncate px-2 py-1 text-xs text-text-muted">{photo.fileName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
