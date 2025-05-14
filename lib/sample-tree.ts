export interface Node {
  id: string;
  name: string;
  type: "file" | "folder" | "root";
  children?: Node[];
  parentId?: string | null;
  position?: [number, number, number];
  isHidden?: boolean;
  url?: string;
}

export const sampleTree: Node = {
  id: "root",
  name: "root",
  type: "folder",
  parentId: null,
  children: [
    {
      id: "root/documents",
      name: "documents",
      type: "folder",
      parentId: "root",
      children: [
        {
          id: "root/documents/resume.pdf",
          name: "resume.pdf",
          type: "file",
          parentId: "root/documents",
          url: `https://example.com/files/resume.pdf`,
        },
        {
          id: "root/documents/cover_letter.pdf",
          name: "cover_letter.pdf",
          type: "file",
          parentId: "root/documents",
          url: `https://example.com/files/cover_letter.pdf`,
        },
        {
          id: "root/documents/projects",
          name: "projects",
          type: "folder",
          parentId: "root/documents",
          children: [
            {
              id: "root/documents/projects/project1.pdf",
              name: "project1.pdf",
              type: "file",
              parentId: "root/documents/projects",
              url: `https://example.com/files/project1.pdf`,
            },
            {
              id: "root/documents/projects/project2.pptx",
              name: "project2.pptx",
              type: "file",
              parentId: "root/documents/projects",
              url: `https://example.com/files/project2.pptx`,
            },
            {
              id: "root/documents/projects/archive",
              name: "archive",
              type: "folder",
              parentId: "root/documents/projects",
              children: [
                {
                  id: "root/documents/projects/archive/old_project1.zip",
                  name: "old_project1.zip",
                  type: "file",
                  parentId: "root/documents/projects/archive",
                  url: `https://example.com/files/old_project1.zip`,
                },
                {
                  id: "root/documents/projects/archive/old_project2.zip",
                  name: "old_project2.zip",
                  type: "file",
                  parentId: "root/documents/projects/archive",
                  url: `https://example.com/files/old_project2.zip`,
                },
              ],
            },
          ],
        },
        {
          id: "root/documents/invoices",
          name: "invoices",
          type: "folder",
          parentId: "root/documents",
          children: [
            {
              id: "root/documents/invoices/invoice_jan.pdf",
              name: "invoice_jan.pdf",
              type: "file",
              parentId: "root/documents/invoices",
              url: `https://example.com/files/invoice_jan.pdf`,
            },
            {
              id: "root/documents/invoices/invoice_feb.pdf",
              name: "invoice_feb.pdf",
              type: "file",
              parentId: "root/documents/invoices",
              url: `https://example.com/files/invoice_feb.pdf`,
            },
            {
              id: "root/documents/invoices/invoice_mar.pdf",
              name: "invoice_mar.pdf",
              type: "file",
              parentId: "root/documents/invoices",
              url: `https://example.com/files/invoice_mar.pdf`,
            },
          ],
        },
      ],
    },
    {
      id: "root/images",
      name: "images",
      type: "folder",
      parentId: "root",
      children: [
        {
          id: "root/images/photo1.jpg",
          name: "photo1.jpg",
          type: "file",
          parentId: "root/images",
          url: `https://i.pinimg.com/736x/ca/12/ec/ca12ec952db367baf7e123cdc2426e89.jpg`,
        },
        {
          id: "root/images/photo2.png",
          name: "photo2.png",
          type: "file",
          parentId: "root/images",
          url: `https://i.pinimg.com/736x/04/30/a0/0430a0e13e1b59655721d6ad82287837.jpg`,
        },
        {
          id: "root/images/vacation",
          name: "vacation",
          type: "folder",
          parentId: "root/images",
          children: [
            {
              id: "root/images/vacation/beach.jpg",
              name: "beach.jpg",
              type: "file",
              parentId: "root/images/vacation",
              url: `https://example.com/files/beach.jpg`,
            },
            {
              id: "root/images/vacation/mountain.jpg",
              name: "mountain.jpg",
              type: "file",
              parentId: "root/images/vacation",
              url: `https://example.com/files/mountain.jpg`,
            },
          ],
        },
      ],
    },
    {
      id: "root/music",
      name: "music",
      type: "folder",
      parentId: "root",
      children: [
        {
          id: "root/music/song1.mp3",
          name: "song1.mp3",
          type: "file",
          parentId: "root/music",
          url: `https://example.com/files/song1.mp3`,
        },
        {
          id: "root/music/song2.mp3",
          name: "song2.mp3",
          type: "file",
          parentId: "root/music",
          url: `https://example.com/files/song2.mp3`,
        },
      ],
    },
    {
      id: "root/videos",
      name: "videos",
      type: "folder",
      parentId: "root",
      children: [
        {
          id: "root/videos/movie1.mp4",
          name: "movie1.mp4",
          type: "file",
          parentId: "root/videos",
          url: `https://example.com/files/movie1.mp4`,
        },
        {
          id: "root/videos/clip1.mov",
          name: "clip1.mov",
          type: "file",
          parentId: "root/videos",
          url: `https://example.com/files/clip1.mov`,
        },
      ],
    },
    {
      id: "root/scripts",
      name: "scripts",
      type: "folder",
      parentId: "root",
      children: [
        {
          id: "root/scripts/backup.sh",
          name: "backup.sh",
          type: "file",
          parentId: "root/scripts",
          url: `https://example.com/files/backup.sh`,
        },
        {
          id: "root/scripts/deploy.sh",
          name: "deploy.sh",
          type: "file",
          parentId: "root/scripts",
          url: `https://example.com/files/deploy.sh`,
        },
      ],
    },
    {
      id: "root/design",
      name: "design",
      type: "folder",
      parentId: "root",
      children: [
        {
          id: "root/design/logo.ai",
          name: "logo.ai",
          type: "file",
          parentId: "root/design",
          url: `https://example.com/files/logo.ai`,
        },
        {
          id: "root/design/flyer.psd",
          name: "flyer.psd",
          type: "file",
          parentId: "root/design",
          url: `https://example.com/files/flyer.psd`,
        },
      ],
    },
    {
      id: "root/todo.txt",
      name: "todo.txt",
      type: "file",
      parentId: "root",
      url: `https://example.com/files/todo.txt`,
    },
    {
      id: "root/notes.md",
      name: "notes.md",
      type: "file",
      parentId: "root",
      url: `https://example.com/files/notes.md`,
    },
  ],
};
