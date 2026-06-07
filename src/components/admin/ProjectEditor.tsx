"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  liveUrl: string;
  repoUrl: string;
  techStack: string[];
  featured: boolean;
}

interface ProjectEditorProps {
  initialData?: ProjectData;
  isEditing?: boolean;
}

export default function ProjectEditor({ initialData, isEditing }: ProjectEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl || "");
  const [techInput, setTechInput] = useState(initialData?.techStack?.join(", ") || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [saving, setSaving] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !description) {
      alert("Title, slug, and description are required");
      return;
    }

    setSaving(true);
    const techStack = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const url = isEditing ? `/api/projects/${initialData?.id}` : "/api/projects";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        description,
        content,
        image,
        liveUrl,
        repoUrl,
        techStack,
        featured,
      }),
    });

    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong");
    }

    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Title and slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="API Monitor Dashboard"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="api-monitor-dashboard"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Short Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A brief description of the project..."
          rows={2}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Screenshot URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Live Demo URL</label>
          <input
            type="text"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://my-app.vercel.app"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">GitHub Repo URL</label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/marvinel/..."
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tech stack */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Tech Stack (comma separated)</label>
        <input
          type="text"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="Next.js, TypeScript, Tailwind, Prisma"
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 max-w-lg"
        />
      </div>

      {/* Detailed content */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Detailed Content (Markdown, optional)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a longer description, features, challenges solved..."
          rows={8}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
        >
          {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
        </button>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="rounded"
          />
          Featured project
        </label>
        <button
          onClick={() => router.push("/admin/projects")}
          className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
