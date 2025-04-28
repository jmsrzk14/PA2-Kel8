package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func IndexPacket(ctx *fiber.Ctx) error {
	var packet []models.T_Paket

	database.DB.Find(&packet)

	if len(packet) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Packet not found",
		})
	}

	return ctx.JSON(packet)
}

func ShowPacket(ctx *fiber.Ctx) error {
	PacketIDStr := ctx.Params("id")

	packetID, err := strconv.Atoi(PacketIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid packet ID",
		})
	}

	var packet models.T_Paket

	database.DB.Where("id = ?", packetID).First(&packet)

	if packetID != int(packet.ID) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Packet not found",
		})
	}

	return ctx.JSON(packet)
}

func MyPacket(ctx *fiber.Ctx) error {
    userID := ctx.Locals("userID")
    if userID == nil {
        return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "message": "Unauthorized",
        })
    }

    var payments []models.Payment
    if err := database.DB.Where("id_siswa = ?", userID).Find(&payments).Error; err != nil {
        return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "message": "Failed to retrieve payments",
        })
    }

    if len(payments) == 0 {
        return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "message": "No payments found for this user",
        })
    }

    return ctx.JSON(payments)
}
