// app/src/features/excel/excel.format.js

export const getExcelColumns = () => [
  {
    header: "CàC",
    key: "case à cocher",
    width: 5,
  },
    {
    header: "Source",
    key: "Source",
    width: 10,
    text
  },
  {
    header: "Référence",
    key: "reference",
    width: 10,
    style: { font: { underline: true, color: { argb: "FF0000FF" } } },
  },
  {
    header: "Titre",
    key: "title",
    width: 60,
  },
  {
    header: "Marque",
    key: "brand",
    width: 20,
  },
  {
    header: "Prix HT",
    key: "price",
    width: 10,
    style: { numFmt: "#,##0.00" },
  },
  {
    header: "Conditionnement",
    key: "packaging",
    width: 15,
  },
];
