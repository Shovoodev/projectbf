import { renderHook, act } from "@testing-library/react";
import { SelectedServiceProvider, useServiceApi } from "./SelectedServiceProvider";

describe("SelectedServiceProvider - handleOptionChange", () => {
  const BASE_PRICE = 4400;

  describe("Test Case 5: handleOptionChange updates selections and recalculates totalPrice", () => {
    it("should update selections and recalculate totalPrice when changing stationery", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      expect(result.current.totalPrice).toBe(BASE_PRICE);
      expect(result.current.selections.stationery).toEqual({
        value: "",
        price: 0,
      });

      // Change stationery option
      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "100-memoriam-cards",
          60
        );
      });

      expect(result.current.selections.stationery).toEqual({
        value: "100-memoriam-cards",
        price: 60,
      });
      expect(result.current.totalPrice).toBe(4460); // BASE_PRICE + 60
      expect(result.current.amount).toBe(4460);
    });

    it("should update selections and recalculate totalPrice when changing body preparation", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Body Preparation",
          "Aesthetic Embalming | Dress | Makeup + $315",
          315
        );
      });

      expect(result.current.selections.bodyPreparation).toEqual({
        value: "Aesthetic Embalming | Dress | Makeup + $315",
        price: 315,
      });
      expect(result.current.totalPrice).toBe(4715); // BASE_PRICE + 315
    });

    it("should update selections and recalculate totalPrice when changing coffin", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Coffin",
          "blaxland-deluxe-teak",
          576.35
        );
      });

      expect(result.current.selections.coffin).toEqual({
        value: "blaxland-deluxe-teak",
        price: 576.35,
      });
      expect(result.current.totalPrice).toBe(4976.35); // BASE_PRICE + 576.35
    });

    it("should update selections and recalculate totalPrice when changing flowers", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Flowers:",
          "100cm Mixed Seasonal Coffin Cover - Pastel",
          0
        );
      });

      expect(result.current.selections.flowers).toEqual({
        value: "100cm Mixed Seasonal Coffin Cover - Pastel",
        price: 0,
      });
      expect(result.current.totalPrice).toBe(BASE_PRICE); // No price change
    });

    it("should update selections and recalculate totalPrice when changing urn", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Urn",
          "Funera Preferred Scattering Tube",
          0
        );
      });

      expect(result.current.selections.urn).toEqual({
        value: "Funera Preferred Scattering Tube",
        price: 0,
      });
      expect(result.current.totalPrice).toBe(BASE_PRICE);
    });

    it("should update selections and recalculate totalPrice when changing collection method", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Collection of Urn",
          "Australia Post Registered Mail",
          0
        );
      });

      expect(result.current.selections.collectionOfUrn).toEqual({
        value: "Australia Post Registered Mail",
        price: 0,
      });
      expect(result.current.totalPrice).toBe(BASE_PRICE);
    });

    it("should accumulate prices from multiple selections", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      // Add stationery
      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "100-memoriam-cards",
          60
        );
      });
      expect(result.current.totalPrice).toBe(4460);

      // Add body preparation
      act(() => {
        result.current.handleOptionChange(
          "Body Preparation",
          "Aesthetic Embalming | Dress | Makeup + $315",
          315
        );
      });
      expect(result.current.totalPrice).toBe(4775); // 4400 + 60 + 315

      // Add coffin
      act(() => {
        result.current.handleOptionChange(
          "Coffin",
          "blaxland-deluxe-teak",
          576.35
        );
      });
      expect(result.current.totalPrice).toBe(5351.35); // 4400 + 60 + 315 + 576.35
    });

    it("should replace previous selection price when changing same category", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      // First selection
      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "100-memoriam-cards",
          60
        );
      });
      expect(result.current.totalPrice).toBe(4460);

      // Change to different stationery option
      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "150-memoriam-cards",
          120
        );
      });

      expect(result.current.selections.stationery).toEqual({
        value: "150-memoriam-cards",
        price: 120,
      });
      expect(result.current.totalPrice).toBe(4520); // Should replace 60 with 120, not add
    });

    it("should handle decimal price adjustments correctly", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Coffin",
          "blaxland-deluxe-teak",
          576.35
        );
      });

      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "100-memoriam-cards",
          60
        );
      });

      expect(result.current.totalPrice).toBe(5036.35); // 4400 + 576.35 + 60
    });

    it("should update amount state alongside totalPrice", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Body Preparation",
          "Aesthetic Embalming | Dress | Makeup + $315",
          315
        );
      });

      expect(result.current.totalPrice).toBe(4715);
      expect(result.current.amount).toBe(4715);
    });

    it("should handle zero price adjustments correctly", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Flowers:",
          "100cm Mixed Seasonal Coffin Cover - White",
          0
        );
      });

      expect(result.current.selections.flowers).toEqual({
        value: "100cm Mixed Seasonal Coffin Cover - White",
        price: 0,
      });
      expect(result.current.totalPrice).toBe(BASE_PRICE);
    });

    it("should handle large price adjustments", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      act(() => {
        result.current.handleOptionChange(
          "Coffin",
          "denman-cedar-cedar",
          2475.96
        );
      });

      expect(result.current.selections.coffin).toEqual({
        value: "denman-cedar-cedar",
        price: 2475.96,
      });
      expect(result.current.totalPrice).toBe(6875.96); // 4400 + 2475.96
    });

    it("should correctly calculate total with all maximum price options", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      // Add multiple expensive options
      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "200-booklets",
          300
        );
      });

      act(() => {
        result.current.handleOptionChange(
          "Body Preparation",
          "Aesthetic Embalming | Dress | Makeup + $315",
          315
        );
      });

      act(() => {
        result.current.handleOptionChange(
          "Coffin",
          "denman-cedar-cedar",
          2475.96
        );
      });

      // Total should be BASE_PRICE + 300 + 315 + 2475.96 = 7490.96
      expect(result.current.totalPrice).toBe(7490.96);
    });

    it("should preserve other selections when updating one category", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      // Set multiple selections
      act(() => {
        result.current.handleOptionChange(
          "Stationery",
          "100-memoriam-cards",
          60
        );
      });

      act(() => {
        result.current.handleOptionChange(
          "Coffin",
          "blaxland-deluxe-teak",
          576.35
        );
      });

      // Update just one
      act(() => {
        result.current.handleOptionChange(
          "Body Preparation",
          "Aesthetic Embalming | Dress | Makeup + $315",
          315
        );
      });

      // All selections should still be present
      expect(result.current.selections.stationery.value).toBe(
        "100-memoriam-cards"
      );
      expect(result.current.selections.coffin.value).toBe(
        "blaxland-deluxe-teak"
      );
      expect(result.current.selections.bodyPreparation.value).toBe(
        "Aesthetic Embalming | Dress | Makeup + $315"
      );
      expect(result.current.totalPrice).toBe(5351.35);
    });
  });

  describe("handleSelectChange integration", () => {
    it("should call handleOptionChange with correct parameters via handleSelectChange", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      // Using handleSelectChange which should internally call handleOptionChange
      act(() => {
        result.current.handleSelectChange(1, "100-memoriam-cards");
      });

      expect(result.current.selections.stationery).toEqual({
        value: "100-memoriam-cards",
        price: 60,
      });
      expect(result.current.totalPrice).toBe(4460);
    });

    it("should handle invalid item id gracefully", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      const initialPrice = result.current.totalPrice;

      act(() => {
        result.current.handleSelectChange(999, "non-existent-option");
      });

      // Should not crash and price should remain unchanged
      expect(result.current.totalPrice).toBe(initialPrice);
    });

    it("should handle invalid option value gracefully", () => {
      const { result } = renderHook(() => useServiceApi(), {
        wrapper: SelectedServiceProvider,
      });

      const initialPrice = result.current.totalPrice;

      act(() => {
        result.current.handleSelectChange(1, "non-existent-option");
      });

      // Should not crash and price should remain unchanged
      expect(result.current.totalPrice).toBe(initialPrice);
    });
  });
});
