package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateCapacity(ctx *fiber.Ctx) error {
	prodi_id := ctx.FormValue("prodi_id")
	if prodi_id == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "prodi_id must be a valid integer",
		})
	}

	tahun := ctx.FormValue("tahun")
	tahunInt, err := strconv.Atoi(tahun)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "tahun is required",
		})
	}

	daya_tampung := ctx.FormValue("daya_tampung")
	daya_tampungInt, err := strconv.Atoi(daya_tampung)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "daya_tampung is required",
		})
	}

	peminat := ctx.FormValue("peminat")
	peminatInt, err := strconv.Atoi(peminat)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "peminat is required",
		})
	}

	capacity := models.T_Daya_Tampung_Prodi{
		ProdiID:      prodi_id,
		Tahun:        tahunInt,
		Daya_tampung: daya_tampungInt,
		Peminat:      peminatInt,
	}

	fmt.Println("Saving to DB:", capacity)

	database.DB.Create(&capacity)

	return ctx.JSON(capacity)
}

func IndexCapacity(ctx *fiber.Ctx) error {
	ProdiID := ctx.Params("id_prodi")

	var capacities []models.T_Daya_Tampung_Prodi

	result := database.DB.Where("prodi_id = ?", ProdiID).Find(&capacities)

	if result.Error != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Gagal mengambil data kapasitas",
		})
	}

	if len(capacities) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Tidak ada kapasitas ditemukan untuk prodi ini",
		})
	}

	return ctx.JSON(capacities)
}

func ShowCapacity(ctx *fiber.Ctx) error {
	CapacityIDStr := ctx.Params("id")

	packetID, err := strconv.Atoi(CapacityIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid packet ID",
		})
	}

	var packet models.T_Paket

	database.DB.Where("id = ?", packetID).First(&packet)

	if packetID != int(packet.ID) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Capacity not found",
		})
	}

	return ctx.JSON(packet)
}

func UpdateCapacity(ctx *fiber.Ctx) error {
	packetIDStr := ctx.Params("id")

	packetID, err := strconv.Atoi(packetIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid packet ID",
		})
	}

	var packet models.T_Paket

	database.DB.Where("id = ?", packetID).First(&packet)

	if packetID != int(packet.ID) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "capacity not found",
		})
	}

	name := ctx.FormValue("name")
	if name == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "name is required",
		})
	}

	total := ctx.FormValue("total")
	totalInt, err := strconv.Atoi(total)
	if total == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "total is required",
		})
	}

	active := ctx.FormValue("active")
	activeInt, err := strconv.Atoi(active)
	if active == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "active is required",
		})
	}

	price := ctx.FormValue("price")
	priceInt, err := strconv.Atoi(price)
	if price == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "price is required",
		})
	}

	result := database.DB.Model(&packet).Updates(models.T_Paket{
		Nama_Paket: name,
		Total:      totalInt,
		Active:     activeInt,
		Price:      priceInt,
	})
	if result.Error != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error Updating",
			"error":   result.Error.Error(),
		})
	}

	return ctx.JSON(packet)

}

func DeleteCapacity(ctx *fiber.Ctx) error {
	capacityIDStr := ctx.Params("id")

	capacityID, err := strconv.Atoi(capacityIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid capacity ID",
		})
	}

	var capacity models.T_Daya_Tampung_Prodi

	database.DB.Where("id = ?", capacityID).First(&capacity)

	if capacityID != int(capacity.Id) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "capacity not found",
		})
	}

	if err := database.DB.Delete(&capacity).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to Delete Table",
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "capacity deleted successfully",
	})
}
