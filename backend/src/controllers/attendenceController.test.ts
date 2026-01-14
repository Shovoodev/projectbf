import { Request, Response } from "express";
import { getAttendenceAnswers } from "./attendenceController";
import { FormResponseModel } from "../db/attendence";
import { AuthenticatedRequest } from "../lib/types";

// Mock the FormResponseModel
jest.mock("../db/attendence", () => ({
  FormResponseModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("getAttendenceAnswers", () => {
  let mockReq: Partial<AuthenticatedRequest>;
  let mockRes: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    
    mockRes = {
      status: mockStatus,
      json: mockJson,
    };

    mockReq = {
      identity: {
        _id: "user123",
        reference: "ref123",
        email: "test@example.com",
      },
      body: {},
    };

    jest.clearAllMocks();
  });

  describe("Test Case 1: Missing selections in request body", () => {
    it("should return 400 when selections are missing", async () => {
      mockReq.body = {}; // No selections provided

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: "No selections provided",
      });
    });

    it("should return 400 when selections is null", async () => {
      mockReq.body = { selections: null };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: "No selections provided",
      });
    });

    it("should return 400 when selections is undefined", async () => {
      mockReq.body = { selections: undefined };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: "No selections provided",
      });
    });
  });

  describe("Test Case 2: Correctly calculates totalPriceImpact and finalTotalPrice", () => {
    it("should calculate totalPriceImpact correctly with all selections", async () => {
      const mockSave = jest.fn().mockResolvedValue({
        totalPriceImpact: 2000,
        totalPrice: 6400,
      });

      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(null);
      (FormResponseModel.create as jest.Mock).mockResolvedValue({
        totalPriceImpact: 2000,
        totalPrice: 6400,
        save: mockSave,
      });

      mockReq.body = {
        selections: {
          stationery: { value: "100-memoriam-cards", price: 60 },
          bodyPreparation: {
            value: "Aesthetic Embalming | Dress | Makeup + $315",
            price: 315,
          },
          coffin: { value: "blaxland-deluxe-teak", price: 576.35 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      const createCall = (FormResponseModel.create as jest.Mock).mock.calls[0][0];
      
      // totalPriceImpact should be sum of all prices: 60 + 315 + 576.35 = 951.35
      expect(createCall.totalPriceImpact).toBe(951.35);
      
      // finalTotalPrice should be BASE_PRICE (4400) + totalPriceImpact (951.35) = 5351.35
      expect(createCall.totalPrice).toBe(5351.35);
    });

    it("should use provided totalPrice when greater than 0", async () => {
      const mockSave = jest.fn().mockResolvedValue({
        totalPriceImpact: 500,
        totalPrice: 6000,
      });

      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(null);
      (FormResponseModel.create as jest.Mock).mockResolvedValue({
        totalPriceImpact: 500,
        totalPrice: 6000,
        save: mockSave,
      });

      mockReq.body = {
        selections: {
          stationery: { value: "100-memoriam-cards", price: 60 },
          bodyPreparation: {
            value: "General Wash | Dress | Makeup",
            price: 0,
          },
          coffin: { value: "contract-raw", price: 0 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 6000, // Explicitly provided
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      const createCall = (FormResponseModel.create as jest.Mock).mock.calls[0][0];
      
      // Should use provided totalPrice
      expect(createCall.totalPrice).toBe(6000);
      expect(createCall.totalPriceImpact).toBe(60);
    });

    it("should calculate BASE_PRICE + totalPriceImpact when totalPrice is 0", async () => {
      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(null);
      (FormResponseModel.create as jest.Mock).mockResolvedValue({
        totalPriceImpact: 120,
        totalPrice: 4520,
      });

      mockReq.body = {
        selections: {
          stationery: { value: "150-memoriam-cards", price: 120 },
          bodyPreparation: {
            value: "General Wash | Dress | Makeup",
            price: 0,
          },
          coffin: { value: "contract-raw", price: 0 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      const createCall = (FormResponseModel.create as jest.Mock).mock.calls[0][0];
      
      expect(createCall.totalPriceImpact).toBe(120);
      expect(createCall.totalPrice).toBe(4520); // 4400 + 120
    });
  });

  describe("Test Case 3: Updates existing FormResponseModel correctly", () => {
    it("should update existing response with new selections and prices", async () => {
      const mockExistingResponse = {
        userid: "user123",
        reference: "ref123",
        email: "test@example.com",
        stationery: "old-value",
        bodyPreparation: "old-value",
        coffin: "old-value",
        flowers: "old-value",
        urn: "old-value",
        collectionOfUrn: "old-value",
        totalPriceImpact: 0,
        totalPrice: 4400,
        save: jest.fn().mockResolvedValue({
          stationery: "100-memoriam-cards",
          bodyPreparation: "Aesthetic Embalming | Dress | Makeup + $315",
          coffin: "blaxland-deluxe-teak",
          flowers: "100cm Mixed Seasonal Coffin Cover - White",
          urn: "Funera Preferred Adult Urn",
          collectionOfUrn: "Collect in Person",
          totalPriceImpact: 951.35,
          totalPrice: 5351.35,
        }),
      };

      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(
        mockExistingResponse
      );

      mockReq.body = {
        selections: {
          stationery: { value: "100-memoriam-cards", price: 60 },
          bodyPreparation: {
            value: "Aesthetic Embalming | Dress | Makeup + $315",
            price: 315,
          },
          coffin: { value: "blaxland-deluxe-teak", price: 576.35 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(FormResponseModel.findOne).toHaveBeenCalledWith({
        userid: "user123",
        reference: "ref123",
      });

      expect(mockExistingResponse.stationery).toBe("100-memoriam-cards");
      expect(mockExistingResponse.bodyPreparation).toBe(
        "Aesthetic Embalming | Dress | Makeup + $315"
      );
      expect(mockExistingResponse.coffin).toBe("blaxland-deluxe-teak");
      expect(mockExistingResponse.totalPriceImpact).toBe(951.35);
      expect(mockExistingResponse.totalPrice).toBe(5351.35);
      expect(mockExistingResponse.save).toHaveBeenCalled();

      expect(mockStatus).toHaveBeenCalledWith(200);
    });

    it("should handle missing price fields gracefully when updating", async () => {
      const mockExistingResponse = {
        userid: "user123",
        reference: "ref123",
        email: "test@example.com",
        stationery: "old-value",
        bodyPreparation: "old-value",
        coffin: "old-value",
        flowers: "old-value",
        urn: "old-value",
        collectionOfUrn: "old-value",
        totalPriceImpact: 0,
        totalPrice: 4400,
        save: jest.fn().mockResolvedValue({
          totalPriceImpact: 0,
          totalPrice: 4400,
        }),
      };

      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(
        mockExistingResponse
      );

      mockReq.body = {
        selections: {
          stationery: { value: "50-memoriam-cards" }, // No price field
          bodyPreparation: { value: "General Wash | Dress | Makeup" },
          coffin: { value: "contract-raw" },
          flowers: { value: "100cm Mixed Seasonal Coffin Cover - White" },
          urn: { value: "Funera Preferred Adult Urn" },
          collectionOfUrn: { value: "Collect in Person" },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(mockExistingResponse.totalPriceImpact).toBe(0);
      expect(mockExistingResponse.totalPrice).toBe(4400);
      expect(mockExistingResponse.save).toHaveBeenCalled();
    });
  });

  describe("Test Case 4: Creates new FormResponseModel correctly", () => {
    it("should create new response with all selections and prices", async () => {
      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(null);
      (FormResponseModel.create as jest.Mock).mockResolvedValue({
        userid: "user123",
        reference: "ref123",
        email: "test@example.com",
        stationery: "100-memoriam-cards",
        bodyPreparation: "Aesthetic Embalming | Dress | Makeup + $315",
        coffin: "blaxland-deluxe-teak",
        flowers: "100cm Mixed Seasonal Coffin Cover - White",
        urn: "Funera Preferred Adult Urn",
        collectionOfUrn: "Collect in Person",
        totalPriceImpact: 951.35,
        totalPrice: 5351.35,
        status: "draft",
      });

      mockReq.body = {
        selections: {
          stationery: { value: "100-memoriam-cards", price: 60 },
          bodyPreparation: {
            value: "Aesthetic Embalming | Dress | Makeup + $315",
            price: 315,
          },
          coffin: { value: "blaxland-deluxe-teak", price: 576.35 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(FormResponseModel.create).toHaveBeenCalledWith({
        userid: "user123",
        reference: "ref123",
        email: "test@example.com",
        stationery: "100-memoriam-cards",
        bodyPreparation: "Aesthetic Embalming | Dress | Makeup + $315",
        coffin: "blaxland-deluxe-teak",
        flowers: "100cm Mixed Seasonal Coffin Cover - White",
        urn: "Funera Preferred Adult Urn",
        collectionOfUrn: "Collect in Person",
        totalPriceImpact: 951.35,
        totalPrice: 5351.35,
        status: "draft",
      });

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Attendance response saved",
        })
      );
    });

    it("should create response with default values for missing selections", async () => {
      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(null);
      (FormResponseModel.create as jest.Mock).mockResolvedValue({
        userid: "user123",
        reference: "ref123",
        email: "test@example.com",
        stationery: "",
        bodyPreparation: "",
        coffin: "",
        flowers: "",
        urn: "",
        collectionOfUrn: "",
        totalPriceImpact: 0,
        totalPrice: 4400,
        status: "draft",
      });

      mockReq.body = {
        selections: {}, // Empty selections
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      const createCall = (FormResponseModel.create as jest.Mock).mock.calls[0][0];

      expect(createCall.stationery).toBe("");
      expect(createCall.bodyPreparation).toBe("");
      expect(createCall.coffin).toBe("");
      expect(createCall.flowers).toBe("");
      expect(createCall.urn).toBe("");
      expect(createCall.collectionOfUrn).toBe("");
      expect(createCall.totalPriceImpact).toBe(0);
      expect(createCall.totalPrice).toBe(4400);
      expect(createCall.status).toBe("draft");
    });

    it("should create response with correct user identity", async () => {
      (FormResponseModel.findOne as jest.Mock).mockResolvedValue(null);
      (FormResponseModel.create as jest.Mock).mockResolvedValue({
        userid: "differentUser456",
        reference: "differentRef456",
        email: "different@example.com",
      });

      mockReq.identity = {
        _id: "differentUser456",
        reference: "differentRef456",
        email: "different@example.com",
      };

      mockReq.body = {
        selections: {
          stationery: { value: "50-memoriam-cards", price: 0 },
          bodyPreparation: { value: "General Wash | Dress | Makeup", price: 0 },
          coffin: { value: "contract-raw", price: 0 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(FormResponseModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userid: "differentUser456",
          reference: "differentRef456",
          email: "different@example.com",
        })
      );
    });
  });

  describe("Authentication and Error Handling", () => {
    it("should return 401 when user is not authenticated", async () => {
      mockReq.identity = undefined;

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ message: "Unauthorized" });
    });

    it("should handle server errors gracefully", async () => {
      (FormResponseModel.findOne as jest.Mock).mockRejectedValue(
        new Error("Database connection failed")
      );

      mockReq.body = {
        selections: {
          stationery: { value: "50-memoriam-cards", price: 0 },
          bodyPreparation: { value: "General Wash | Dress | Makeup", price: 0 },
          coffin: { value: "contract-raw", price: 0 },
          flowers: {
            value: "100cm Mixed Seasonal Coffin Cover - White",
            price: 0,
          },
          urn: { value: "Funera Preferred Adult Urn", price: 0 },
          collectionOfUrn: { value: "Collect in Person", price: 0 },
        },
        totalPrice: 0,
      };

      await getAttendenceAnswers(
        mockReq as AuthenticatedRequest,
        mockRes as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Server error",
        error: "Database connection failed",
      });
    });
  });
});
