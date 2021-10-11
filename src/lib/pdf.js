import PdfPrinter from "pdfmake";
import imageToBase64 from "image-to-base64";

export const getPDFReadableStream = async (profile) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-bold",
    },
  };
  const { image, name, surname, email, bio, title, area } = profile;

  let profileImage = {};
  const imageURLParts = image.split("/");
  const fileName = imageURLParts[imageURLParts.length - 1];
  const [id, extension] = fileName.split(".");
  console.log(fileName, extension);
  try {
    const response = await imageToBase64(image);

    const base64Image = `data:image/${extension};base64,${response}`;
    profileImage = {
      image: base64Image,
      fit: [150, 150],
      margin: [0, 0, 0, 40],
    };
  } catch (err) {
    console.log(err);
  }

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        alignment: "justify",
        columns: [
          profileImage,
          {
            text: "This is a header, using header style",
            style: "header",
            margin: [0, 20, 0, 0],
          },
        ],
      },
      {
        margin: [0, 20, 0, 0],
        ul: [
          "item 1",
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit",
          "item 3",
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
      },
      subheader: {
        fontSize: 15,
      },
      paragraph: {
        fontSize: 14,
      },
    },
    defaultStyle: {
      columnGap: 40,
    },
  };

  const options = {
    // ...
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();
  return pdfReadableStream;
};
