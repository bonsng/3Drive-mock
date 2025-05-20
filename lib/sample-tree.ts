export interface Node {
  id: number;
  type: "file" | "folder";
  name: string;
  parentId: number | null;
  children?: Node[];
  isHidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
  url?: string;
}

export const sampleTree: Node = {
  name: "root",
  type: "folder",
  parentId: null,
  id: 1,
  children: [
    {
      name: "documents",
      type: "folder",
      parentId: 1,
      id: 2,
      children: [
        {
          name: "resume.pdf",
          type: "file",
          parentId: 2,
          id: 3,
          url: `https://example.com/files/resume.pdf`,
        },
        {
          name: "cover_letter.pdf",
          type: "file",
          parentId: 2,
          id: 4,
          url: `https://example.com/files/cover_letter.pdf`,
        },
        {
          name: "projects",
          type: "folder",
          parentId: 2,
          id: 5,
          children: [
            {
              name: "project1.pdf",
              type: "file",
              parentId: 5,
              id: 6,
              url: `https://example.com/files/project1.pdf`,
            },
            {
              name: "project2.pptx",
              type: "file",
              parentId: 5,
              id: 7,
              url: `https://example.com/files/project2.pptx`,
            },
            {
              name: "archive",
              type: "folder",
              parentId: 5,
              id: 8,
              children: [
                {
                  name: "old_project1.zip",
                  type: "file",
                  parentId: 8,
                  id: 9,
                  url: `https://example.com/files/old_project1.zip`,
                },
                {
                  name: "old_project2.zip",
                  type: "file",
                  parentId: 8,
                  id: 10,
                  url: `https://example.com/files/old_project2.zip`,
                },
              ],
            },
          ],
        },
        {
          name: "invoices",
          type: "folder",
          parentId: 2,
          id: 11,
          children: [
            {
              name: "invoice_jan.pdf",
              type: "file",
              parentId: 11,
              id: 12,
              url: `https://example.com/files/invoice_jan.pdf`,
            },
            {
              name: "invoice_feb.pdf",
              type: "file",
              parentId: 11,
              id: 13,
              url: `https://example.com/files/invoice_feb.pdf`,
            },
            {
              name: "invoice_mar.pdf",
              type: "file",
              parentId: 11,
              id: 14,
              url: `https://example.com/files/invoice_mar.pdf`,
            },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "folder",
      parentId: 1,
      id: 15,
      children: [
        {
          name: "photo1.jpg",
          type: "file",
          parentId: 15,
          id: 16,
          url: `https://i.pinimg.com/736x/ca/12/ec/ca12ec952db367baf7e123cdc2426e89.jpg`,
        },
        {
          name: "photo2.png",
          type: "file",
          parentId: 15,
          id: 17,
          url: `https://i.pinimg.com/736x/04/30/a0/0430a0e13e1b59655721d6ad82287837.jpg`,
        },
        {
          name: "vacation",
          type: "folder",
          parentId: 15,
          id: 18,
          children: [
            {
              name: "beach.jpg",
              type: "file",
              parentId: 18,
              id: 19,
              url: `https://example.com/files/beach.jpg`,
            },
            {
              name: "mountain.jpg",
              type: "file",
              parentId: 18,
              id: 20,
              url: `https://example.com/files/mountain.jpg`,
            },
          ],
        },
      ],
    },
    {
      name: "music",
      type: "folder",
      parentId: 1,
      id: 21,
      children: [
        {
          name: "song1.mp3",
          type: "file",
          parentId: 21,
          id: 22,
          url: `https://example.com/files/song1.mp3`,
        },
        {
          name: "song2.mp3",
          type: "file",
          parentId: 21,
          id: 23,
          url: `https://example.com/files/song2.mp3`,
        },
      ],
    },
    {
      name: "videos",
      type: "folder",
      parentId: 1,
      id: 24,
      children: [
        {
          name: "movie1.mp4",
          type: "file",
          parentId: 24,
          id: 25,
          url: `https://example.com/files/movie1.mp4`,
        },
        {
          name: "clip1.mov",
          type: "file",
          parentId: 24,
          id: 26,
          url: `https://example.com/files/clip1.mov`,
        },
      ],
    },
    {
      name: "scripts",
      type: "folder",
      parentId: 1,
      id: 27,
      children: [
        {
          name: "backup.sh",
          type: "file",
          parentId: 27,
          id: 28,
          url: `https://example.com/files/backup.sh`,
        },
        {
          name: "deploy.sh",
          type: "file",
          parentId: 27,
          id: 29,
          url: `https://example.com/files/deploy.sh`,
        },
      ],
    },
    {
      name: "design",
      type: "folder",
      parentId: 1,
      id: 30,
      children: [
        {
          name: "logo.ai",
          type: "file",
          parentId: 30,
          id: 31,
          url: `https://example.com/files/logo.ai`,
        },
        {
          name: "flyer.psd",
          type: "file",
          parentId: 30,
          id: 32,
          url: `https://example.com/files/flyer.psd`,
        },
      ],
    },
    {
      name: "todo.txt",
      type: "file",
      parentId: 1,
      id: 33,
      url: `https://example.com/files/todo.txt`,
    },
    {
      name: "notes.md",
      type: "file",
      parentId: 1,
      id: 34,
      url: `https://example.com/files/notes.md`,
    },
  ],
};

export const sampleTrash: Node[] = [
  {
    name: "trash1.txt",
    type: "file",
    parentId: 1,
    id: 35,
    url: "https://example.com/files/trash1.txt",
  },
  {
    name: "trash2.pdf",
    type: "file",
    parentId: 1,
    id: 36,
    url: "https://example.com/files/trash2.pdf",
  },
  {
    name: "trash3.mp3",
    type: "file",
    parentId: 1,
    id: 37,
    url: "https://example.com/files/trash3.mp3",
  },
  {
    name: "trash4.mp4",
    type: "file",
    parentId: 1,
    id: 38,
    url: "https://example.com/files/trash4.mp4",
  },
  {
    name: "design1",
    type: "folder",
    parentId: 1,
    id: 39,
    children: [
      {
        name: "logo2.ai",
        type: "file",
        parentId: 39,
        id: 40,
        url: `https://example.com/files/log2o.ai`,
      },
      {
        name: "flyer2.psd",
        type: "file",
        parentId: 39,
        id: 41,
        url: `https://example.com/files/flyer2.psd`,
      },
    ],
  },
  {
    name: "trash6.docx",
    type: "file",
    parentId: 1,
    id: 42,
    url: "https://example.com/files/trash6.docx",
  },
];
