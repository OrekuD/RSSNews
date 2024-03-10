export default function getContentInfo(description: string) {
  try {
    const imageUrl = description
      .split(`<div><img src="`)[1]
      .split(`" style`)[0];

    const contentDescription = description.split("div")[2].slice(1);

    return {
      image: imageUrl,
      description: contentDescription.slice(0, contentDescription.length - 2),
    };
  } catch (error) {
    return {
      image: "",
      description: "",
    };
  }
}
