export interface Node {
  name: string;
  type: "file" | "folder";
  children?: Node[];
}

export const sampleTree: Node = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "documents",
      type: "folder",
      children: [
        { name: "resume.pdf", type: "file" },
        { name: "cover_letter.pdf", type: "file" },
        {
          name: "projects",
          type: "folder",
          children: [
            { name: "project1.pdf", type: "file" },
            { name: "project2.pptx", type: "file" },
            {
              name: "archive",
              type: "folder",
              children: [
                { name: "old_project1.zip", type: "file" },
                { name: "old_project2.zip", type: "file" },
              ],
            },
          ],
        },
        {
          name: "invoices",
          type: "folder",
          children: [
            { name: "invoice_jan.pdf", type: "file" },
            { name: "invoice_feb.pdf", type: "file" },
            { name: "invoice_mar.pdf", type: "file" },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "folder",
      children: [
        { name: "photo1.jpg", type: "file" },
        { name: "photo2.png", type: "file" },
        {
          name: "vacation",
          type: "folder",
          children: [
            { name: "beach.jpg", type: "file" },
            { name: "mountain.jpg", type: "file" },
          ],
        },
      ],
    },
    {
      name: "music",
      type: "folder",
      children: [
        { name: "song1.mp3", type: "file" },
        { name: "song2.mp3", type: "file" },
      ],
    },
    {
      name: "videos",
      type: "folder",
      children: [
        { name: "movie1.mp4", type: "file" },
        { name: "clip1.mov", type: "file" },
      ],
    },
    {
      name: "scripts",
      type: "folder",
      children: [
        { name: "backup.sh", type: "file" },
        { name: "deploy.sh", type: "file" },
      ],
    },
    {
      name: "design",
      type: "folder",
      children: [
        { name: "logo.ai", type: "file" },
        { name: "flyer.psd", type: "file" },
      ],
    },
    { name: "todo.txt", type: "file" },
    { name: "notes.md", type: "file" },
  ],
};
