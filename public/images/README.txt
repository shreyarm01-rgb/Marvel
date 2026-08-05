========================================================================
MARVEL TIMELINE CARD IMAGES FOLDER
========================================================================

Place all card photos/posters in this folder (`public/images/`).

In `src/App.jsx`, add `image: "/images/your-photo-name.jpg"` to any item in the timeline array `T`:

Example:
  {
    id: 1,
    title: "Iron Man",
    phase: 1,
    type: "movie",
    date: "May 2, 2008",
    image: "/images/iron-man.jpg",
    blurb: "Tony Stark builds an armored suit...",
  }

Supported formats: .jpg, .jpeg, .png, .webp, .svg
