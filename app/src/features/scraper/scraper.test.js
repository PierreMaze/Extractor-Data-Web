// app/src/features/scraper/scraper.test.js

import extractProductData from "./scraper.products.js";
import { jest } from "@jest/globals";

describe("extractProductData", () => {
  const mockPage = {
    $eval: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait retourner null si la page est "Page introuvable"', async () => {
    mockPage.$eval.mockImplementationOnce(() => "Page introuvable");

    const result = await extractProductData(mockPage, "123456");
    expect(result).toBeNull();
  });

  it("devrait retourner un objet produit complet si les éléments sont présents", async () => {
    mockPage.$eval
      .mockImplementationOnce(() => "Super Produit")
      .mockImplementationOnce(() => "MAKITA")
      .mockImplementationOnce(() => "123,45 € /m²")
      .mockImplementationOnce(() => "0,45 €");

    const result = await extractProductData(mockPage, "654321");

    expect(result).toEqual({
      reference: "654321",
      title: "Super Produit",
      brand: "MAKITA",
      price: 123.45,
      packaging: "m²",
      ecoParticipation: 0.45,
    });
  });

  it("devrait gérer les champs manquants (prix et eco)", async () => {
    mockPage.$eval
      .mockImplementationOnce(() => "Produit sans prix")
      .mockImplementationOnce(() => "SANS MARQUE")
      .mockImplementationOnce(() => {
        throw new Error("not found");
      }) // sub-price
      .mockImplementationOnce(() => {
        throw new Error("not found");
      }) // main-price
      .mockImplementationOnce(() => {
        throw new Error("not found");
      }); // eco

    const result = await extractProductData(mockPage, "789123");

    expect(result).toEqual({
      reference: "789123",
      title: "Produit sans prix",
      brand: "SANS MARQUE",
      price: null,
      packaging: null,
      ecoParticipation: null,
    });
  });
});
