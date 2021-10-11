import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";

export const getPDFReadableStream = async (profile) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-bold",
    },
  };
  const { image } = profile;

  let imagePart = {};
  const imageURLParts = image.split("/");
  const fileName = imageURLParts[imageURLParts.length - 1];
  const [id, extension] = fileName.split(".");
  console.log(fileName, extension);
  try {
    const response = await imageToBase64(image);

    const base64Image = `data:image/${extension};base64,${response}`;
    imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
  } catch (err) {
    console.log(err);
  }

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [imagePart],
  };

  const options = {
    // ...
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();
  return pdfReadableStream;
};
