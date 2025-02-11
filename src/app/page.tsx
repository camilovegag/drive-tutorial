"use client";

import { useState } from "react";
import { Folder, File, Upload, ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

type Folder = {
  id: string;
  name: string;
  type: "folder";
  children: (Folder | File)[];
};

type File = {
  id: string;
  name: string;
  type: "file";
  url: string;
  size: string;
  modified: string;
};

// Mock data structure
const initialData: (Folder | File)[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      {
        id: "2",
        name: "Report.docx",
        type: "file",
        url: "#",
        size: "2.3 MB",
        modified: "May 15, 2023",
      },
      {
        id: "3",
        name: "Spreadsheet.xlsx",
        type: "file",
        url: "#",
        size: "1.5 MB",
        modified: "May 14, 2023",
      },
      {
        id: "8",
        name: "Subfolder",
        type: "folder",
        children: [
          {
            id: "9",
            name: "Subfile.docx",
            type: "file",
            url: "#",
            size: "1.2 MB",
            modified: "May 16, 2023",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Images",
    type: "folder",
    children: [
      {
        id: "5",
        name: "Photo1.jpg",
        type: "file",
        url: "#",
        size: "3.7 MB",
        modified: "May 13, 2023",
      },
      {
        id: "6",
        name: "Photo2.png",
        type: "file",
        url: "#",
        size: "2.1 MB",
        modified: "May 12, 2023",
      },
    ],
  },
  {
    id: "7",
    name: "Project.pdf",
    type: "file",
    url: "#",
    size: "5.2 MB",
    modified: "May 11, 2023",
  },
];

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState(initialData);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: "root", name: "My Drive" },
  ]);

  const handleFolderClick = (folder: Folder) => {
    if (folder.type !== "folder") return;
    setCurrentFolder(folder.children);
    setBreadcrumbs([...breadcrumbs, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (breadcrumbIndex: number) => {
    if (breadcrumbIndex === 0) {
      setCurrentFolder(initialData);
      setBreadcrumbs([{ id: "root", name: "My Drive" }]);
    } else {
      // This is a simplified version. In a real app, you'd need to traverse the folder structure.
      setBreadcrumbs(breadcrumbs.slice(0, breadcrumbIndex + 1));
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <header className="flex items-center justify-between border-b border-gray-700 bg-[#1f1f1f] px-6 py-2">
        <h1 className="text-2xl font-medium text-white">Drive</h1>
        <Button
          variant="outline"
          className="bg-[#8ab4f8] text-[#202124] hover:bg-[#8ab4f8]/90"
        >
          <Upload className="mr-2 h-4 w-4" /> New
        </Button>
      </header>

      <main className="p-6">
        {/* Breadcrumbs */}
        <div className="mb-4 flex items-center text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 h-4 w-4 text-gray-500" />
              )}
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="text-[#8ab4f8] hover:underline"
              >
                {crumb.name}
              </button>
            </div>
          ))}
        </div>

        {/* File list */}
        <div className="rounded-lg bg-black">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left text-gray-400">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Owner</th>
                <th className="px-4 py-2 font-medium">Last modified</th>
                <th className="px-4 py-2 font-medium">File size</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentFolder.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer border-b border-gray-800 hover:bg-[#202124]"
                  onClick={() =>
                    item.type === "folder" && handleFolderClick(item)
                  }
                >
                  <td className="flex items-center px-4 py-2">
                    {item.type === "folder" ? (
                      <Folder className="mr-2 h-5 w-5 text-[#8ab4f8]" />
                    ) : (
                      <File className="mr-2 h-5 w-5 text-gray-400" />
                    )}
                    {item.type === "file" ? (
                      <Link
                        href={item.url}
                        className="text-[#8ab4f8] hover:underline"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="text-white">{item.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-400">Me</td>
                  <td className="px-4 py-2 text-gray-400">
                    {item.type === "file" ? item.modified : "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-400">
                    {item.type === "file" ? item.size : "--"}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
